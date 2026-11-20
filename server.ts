import "dotenv/config";
import express from "express";
import http from "http";
import path from "path";
import Razorpay from "razorpay";
import crypto from "crypto";
import { DatabaseSync } from "node:sqlite";
import dns from "node:dns/promises";
import nodemailer from "nodemailer";
import {
  parseCombinedMobile,
  validateEmailAddress,
  validateFullName,
  validateLocationText,
  validateMobileNumber,
  validatePanNumber,
} from "./src/utils/donationValidation";

// Initialize SQLite database
const db = new DatabaseSync("donations.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT UNIQUE,
    payment_id TEXT,
    receipt_number TEXT UNIQUE,
    amount REAL,
    currency TEXT,
    donor_name TEXT,
    donor_email TEXT,
    donor_mobile TEXT,
    donor_type TEXT,
    frequency TEXT,
    country TEXT,
    city TEXT,
    pan TEXT,
    require_80g INTEGER DEFAULT 0,
    prayer_request TEXT,
    payment_method TEXT,
    utr_number TEXT,
    cause TEXT,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Safely migrate older donations.db tables that may lack newer columns
const existingColumns = new Set(
  (db.prepare("PRAGMA table_info(donations)").all() as Array<{ name: string }>).map((c) => c.name)
);
const requiredColumns: Array<[string, string]> = [
  ["receipt_number", "TEXT"],
  ["donor_type", "TEXT"],
  ["frequency", "TEXT"],
  ["country", "TEXT"],
  ["city", "TEXT"],
  ["pan", "TEXT"],
  ["require_80g", "INTEGER DEFAULT 0"],
  ["prayer_request", "TEXT"],
  ["payment_method", "TEXT"],
  ["utr_number", "TEXT"],
  ["updated_at", "DATETIME"]
];
for (const [colName, colType] of requiredColumns) {
  if (!existingColumns.has(colName)) {
    db.exec(`ALTER TABLE donations ADD COLUMN ${colName} ${colType}`);
  }
}
db.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_donations_receipt_number ON donations(receipt_number)");

const FOUNDATION_PAYMENT_CONFIG = {
  upi: {
    id: "syedgggurdezi@okicici",
    payeeName: "Shah Sufi Syed Gous Gaznavi Gurdezi"
  },
  bank: {
    accountHolder: "SYED GHOUS GHAZNAVI GURDEZI",
    bankName: "ICICI BANK",
    accountType: "Savings Account",
    accountNumber: "768401500538",
    ifsc: "ICIC0007684"
  },
  whatsapp: "919680872049"
};

function generateReceiptNumber() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `MGF-${y}${m}${d}-${rand}`;
}

async function verifyEmailDomainHasMailServer(email: string): Promise<{ valid: boolean; reason?: string }> {
  const domain = String(email || "").trim().toLowerCase().split("@")[1];
  if (!domain) return { valid: false, reason: "invalid_email" };

  const timeoutPromise = new Promise<"TIMEOUT">((resolve) =>
    setTimeout(() => resolve("TIMEOUT"), 2500)
  );

  try {
    const result = await Promise.race([
      (async () => {
        try {
          const mx = await dns.resolveMx(domain);
          if (Array.isArray(mx) && mx.length > 0 && mx.some((r) => r.exchange)) {
            return "OK" as const;
          }
        } catch (err: any) {
          if (err?.code === "ENOTFOUND") return "NO_DOMAIN" as const;
        }
        // Fallback: some small domains accept mail via A record
        try {
          const a = await dns.resolve4(domain);
          if (Array.isArray(a) && a.length > 0) return "OK" as const;
        } catch (err: any) {
          if (err?.code === "ENOTFOUND" || err?.code === "ENODATA") return "NO_DOMAIN" as const;
        }
        return "NO_DOMAIN" as const;
      })(),
      timeoutPromise,
    ]);

    if (result === "NO_DOMAIN") {
      return { valid: false, reason: "domain_not_found" };
    }
    return { valid: true };
  } catch {
    return { valid: true };
  }
}

async function validateDonorServerSide(payload: {
  donorName: string;
  donorEmail: string;
  countryCode?: string;
  mobileNumber?: string;
  donorMobile?: string;
  donorType?: string;
  country: string;
  city: string;
  pan?: string;
  require80G?: boolean;
}) {
  const fieldErrors: Record<string, string> = {};

  const nameErr = validateFullName(payload.donorName);
  if (nameErr) {
    fieldErrors.fullName =
      nameErr === "required"
        ? "Full name is required."
        : "Please enter a valid full name (at least 2 letters).";
  }

  const emailCheck = validateEmailAddress(payload.donorEmail);
  if (emailCheck.errorCode) {
    if (emailCheck.errorCode === "required") {
      fieldErrors.email = "Email address is required.";
    } else if (emailCheck.errorCode === "typo_domain" && emailCheck.suggestion) {
      fieldErrors.email = `Invalid email domain. Did you mean ${emailCheck.suggestion}?`;
    } else if (emailCheck.errorCode === "disposable_email") {
      fieldErrors.email = "Disposable or temporary email addresses are not accepted. Please use a real email.";
    } else {
      fieldErrors.email = "Please enter a valid email address (e.g. name@gmail.com).";
    }
  } else {
    const mxCheck = await verifyEmailDomainHasMailServer(payload.donorEmail);
    if (!mxCheck.valid) {
      fieldErrors.email = "This email domain cannot receive emails. Please check for typos or use a valid email address.";
    }
  }

  const parsedPhone =
    payload.countryCode && payload.mobileNumber !== undefined
      ? { countryCode: payload.countryCode, digits: payload.mobileNumber }
      : parseCombinedMobile(payload.donorMobile || "");

  const mobileCheck = validateMobileNumber(parsedPhone.countryCode, parsedPhone.digits);
  if (mobileCheck.errorCode) {
    if (mobileCheck.errorCode === "required") {
      fieldErrors.mobile = "Mobile number is required.";
    } else if (mobileCheck.errorCode === "non_digits") {
      fieldErrors.mobile = "Mobile number must contain digits only.";
    } else if (mobileCheck.errorCode === "fake_mobile_pattern") {
      fieldErrors.mobile = "Please enter a real, active mobile number (repeated or sequential test numbers are not allowed).";
    } else if (mobileCheck.errorCode === "invalid_indian_mobile") {
      fieldErrors.mobile = "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.";
    } else {
      fieldErrors.mobile = `Please enter a valid mobile number for ${parsedPhone.countryCode}.`;
    }
  }

  const countryErr = validateLocationText(payload.country);
  if (countryErr) {
    fieldErrors.country = "Please enter a valid country name.";
  }

  const cityErr = validateLocationText(payload.city);
  if (cityErr) {
    fieldErrors.city = "Please enter a valid city name.";
  }

  const panErr = validatePanNumber(
    payload.pan || "",
    Boolean(payload.require80G && (payload.donorType || "indian") === "indian")
  );
  if (panErr === "pan_required_80g") {
    fieldErrors.pan = "PAN number is required for an 80G tax exemption certificate.";
  } else if (panErr === "invalid_pan") {
    fieldErrors.pan = "Invalid PAN format. Expected 10 characters like ABCDE1234F.";
  }

  const firstError = Object.values(fieldErrors)[0] || "";
  return {
    valid: Object.keys(fieldErrors).length === 0,
    fieldErrors,
    error: firstError,
    normalizedMobile: `${parsedPhone.countryCode}${mobileCheck.digits}`,
  };
}

const insertDonation = db.prepare(`
  INSERT INTO donations (
    order_id, payment_id, receipt_number, amount, currency,
    donor_name, donor_email, donor_mobile, donor_type, frequency,
    country, city, pan, require_80g, prayer_request,
    payment_method, utr_number, cause, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const updateDonationSuccess = db.prepare(
  "UPDATE donations SET status = ?, payment_id = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?"
);

const updateDonationFailed = db.prepare(
  "UPDATE donations SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?"
);

const getDonationByOrderId = db.prepare(
  "SELECT * FROM donations WHERE order_id = ?"
);

const findByUtr = db.prepare(
  "SELECT id, receipt_number, status FROM donations WHERE UPPER(TRIM(utr_number)) = UPPER(TRIM(?)) AND status != 'FAILED' LIMIT 1"
);

const findReceiptByRef = db.prepare(`
  SELECT
    receipt_number, order_id, payment_id, utr_number, amount, currency,
    donor_name, donor_type, frequency, country, city, pan, require_80g,
    payment_method, cause, status, created_at
  FROM donations
  WHERE UPPER(TRIM(receipt_number)) = UPPER(TRIM(?))
     OR UPPER(TRIM(order_id)) = UPPER(TRIM(?))
     OR UPPER(TRIM(payment_id)) = UPPER(TRIM(?))
  ORDER BY id DESC
  LIMIT 1
`);

function formatDonationResponse(row: any) {
  if (!row) return null;
  return {
    receiptNumber: row.receipt_number || row.order_id,
    orderId: row.order_id,
    paymentId: row.payment_id || row.utr_number || row.order_id,
    utrNumber: row.utr_number || "",
    amount: Number(row.amount),
    currency: row.currency || "INR",
    cause: row.cause || "Where Needed Most",
    donorType: row.donor_type || "indian",
    frequency: row.frequency || "once",
    donorName: row.donor_name || "",
    donorEmail: row.donor_email || "",
    donorMobile: row.donor_mobile || "",
    country: row.country || "",
    city: row.city || "",
    pan: row.pan || "",
    require80G: Boolean(row.require_80g),
    paymentMethod: row.payment_method || "upi",
    status: row.status || "PENDING_VERIFICATION",
    createdAt: row.created_at || new Date().toISOString()
  };
}

// Optional SMTP transporter when configured in environment variables
const smtpConfigured = Boolean(
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  !process.env.SMTP_USER.includes("fake_user")
);

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  : null;

function sendReceiptEmailIfConfigured(row: any) {
  if (!transporter || !row?.donor_email) return;
  const txnRef = row.payment_id || row.utr_number || row.order_id;
  const statusLabel = row.status === "SUCCESS" ? "Verified" : "Recorded (Pending Bank Reconciliation)";
  const mailOptions = {
    from: process.env.SMTP_FROM || '"Maulai Growh Foundation" <donations@maulaigrowh.org>',
    to: row.donor_email,
    subject: `Donation Receipt ${row.receipt_number || row.order_id} - Maulai Growh Foundation`,
    text: `Dear ${row.donor_name},\n\nThank you for your generous donation of ${row.currency || "INR"} ${row.amount} towards ${row.cause}.\nReceipt Number: ${row.receipt_number || row.order_id}\nTransaction / UTR ID: ${txnRef}\nStatus: ${statusLabel}\n\nMay you be blessed!\n\nWarm Regards,\nMaulai Growh Foundation`,
    html: `<h3>Dear ${row.donor_name},</h3><p>Thank you for your generous donation of <strong>${row.currency || "INR"} ${row.amount}</strong> towards <strong>${row.cause}</strong>.</p><p><strong>Receipt Number:</strong> ${row.receipt_number || row.order_id}<br/><strong>Transaction / UTR ID:</strong> ${txnRef}<br/><strong>Status:</strong> ${statusLabel}</p><p>May you be blessed!</p><br/><p>Warm Regards,<br/>Maulai Growh Foundation</p>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
    } else {
      console.log("Receipt sent: %s", info.messageId);
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/donations/config", (req, res) => {
    const keyId = (process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || "").trim();
    const razorpayEnabled = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
    res.json({
      razorpayEnabled,
      razorpayKeyId: keyId,
      ...FOUNDATION_PAYMENT_CONFIG
    });
  });

  app.post("/api/donations/validate-donor", async (req, res) => {
    try {
      const {
        donorName = "",
        donorEmail = "",
        countryCode = "+91",
        mobile = "",
        donorMobile = "",
        donorType = "indian",
        country = "",
        city = "",
        pan = "",
        require80G = false,
      } = req.body || {};

      const validation = await validateDonorServerSide({
        donorName,
        donorEmail,
        countryCode,
        mobileNumber: mobile,
        donorMobile,
        donorType,
        country,
        city,
        pan,
        require80G,
      });

      if (!validation.valid) {
        return res.status(400).json({
          valid: false,
          error: validation.error,
          fieldErrors: validation.fieldErrors,
        });
      }

      return res.json({ valid: true });
    } catch (error) {
      console.error("Donor validation error:", error);
      return res.status(500).json({ valid: false, error: "Could not validate details." });
    }
  });

  app.post("/api/donations/submit-direct", async (req, res) => {
    try {
      const {
        amount,
        currency = "INR",
        donorName,
        donorEmail,
        donorMobile,
        countryCode,
        mobile,
        donorType = "indian",
        frequency = "once",
        country,
        city,
        pan = "",
        require80G = false,
        prayerRequest = "",
        cause = "Where Needed Most",
        paymentMethod = "upi",
        utrNumber
      } = req.body || {};

      const numericAmount = Number(amount);
      if (!Number.isFinite(numericAmount) || numericAmount < 1) {
        return res.status(400).json({ error: "Please enter a valid donation amount of at least ₹1." });
      }

      const validation = await validateDonorServerSide({
        donorName: String(donorName || ""),
        donorEmail: String(donorEmail || ""),
        countryCode,
        mobileNumber: mobile,
        donorMobile: String(donorMobile || ""),
        donorType: String(donorType),
        country: String(country || ""),
        city: String(city || ""),
        pan: String(pan || ""),
        require80G: Boolean(require80G),
      });

      if (!validation.valid) {
        return res.status(400).json({ error: validation.error, fieldErrors: validation.fieldErrors });
      }

      const cleanPan = String(pan || "").trim().toUpperCase();
      const cleanUtr = String(utrNumber || "").trim().toUpperCase();
      if (!cleanUtr || cleanUtr.length < 6 || !/^[A-Z0-9/_-]+$/.test(cleanUtr)) {
        return res.status(400).json({ error: "Please enter a valid Transaction ID / UTR Reference (minimum 6 alphanumeric characters)." });
      }

      const existingUtr = findByUtr.get(cleanUtr) as any;
      if (existingUtr) {
        return res.status(409).json({
          error: `This Transaction / UTR reference is already recorded under receipt ${existingUtr.receipt_number}.`
        });
      }

      const allowedMethods = new Set(["upi", "bank_transfer"]);
      const cleanMethod = allowedMethods.has(paymentMethod) ? paymentMethod : "upi";
      const orderId = `MGF-ORD-${Date.now()}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
      const receiptNumber = generateReceiptNumber();

      insertDonation.run(
        orderId,
        cleanUtr,
        receiptNumber,
        numericAmount,
        String(currency || "INR").toUpperCase(),
        String(donorName).trim(),
        String(donorEmail).trim(),
        String(donorMobile).trim(),
        String(donorType),
        String(frequency),
        String(country).trim(),
        String(city).trim(),
        cleanPan,
        require80G ? 1 : 0,
        String(prayerRequest || "").trim(),
        cleanMethod,
        cleanUtr,
        String(cause),
        "PENDING_VERIFICATION"
      );

      const saved = getDonationByOrderId.get(orderId) as any;
      sendReceiptEmailIfConfigured(saved);

      return res.status(201).json({
        success: true,
        donation: formatDonationResponse(saved)
      });
    } catch (error) {
      console.error("Direct donation submission error:", error);
      return res.status(500).json({ error: "Failed to record donation. Please try again." });
    }
  });

  app.get("/api/donations/verify-receipt/:ref", (req, res) => {
    try {
      const ref = String(req.params.ref || "").trim();
      if (!ref || ref.length < 4) {
        return res.status(400).json({ error: "Please enter a valid Receipt Number or Transaction ID." });
      }
      const row = findReceiptByRef.get(ref, ref, ref) as any;
      if (!row) {
        return res.status(404).json({ error: "No donation record found for that Receipt or Transaction ID." });
      }
      const formatted = formatDonationResponse(row)!;
      // Do not expose personal email/mobile/PAN in public receipt verification lookup
      return res.json({
        found: true,
        receipt: {
          receiptNumber: formatted.receiptNumber,
          orderId: formatted.orderId,
          paymentId: formatted.paymentId,
          amount: formatted.amount,
          currency: formatted.currency,
          cause: formatted.cause,
          frequency: formatted.frequency,
          donorName: formatted.donorName,
          city: formatted.city,
          country: formatted.country,
          paymentMethod: formatted.paymentMethod,
          require80G: formatted.require80G,
          status: formatted.status,
          createdAt: formatted.createdAt
        }
      });
    } catch (error) {
      console.error("Receipt lookup error:", error);
      return res.status(500).json({ error: "Unable to verify receipt right now." });
    }
  });

  app.post("/api/razorpay/create-order", async (req, res) => {
    try {
      const {
        amount,
        currency = "INR",
        donorName,
        donorEmail,
        donorMobile,
        countryCode,
        mobile,
        donorType = "indian",
        frequency = "once",
        country = "",
        city = "",
        pan = "",
        require80G = false,
        prayerRequest = "",
        paymentMethod = "razorpay",
        cause = "Where Needed Most"
      } = req.body || {};

      const numericAmount = Number(amount);
      if (!Number.isFinite(numericAmount) || numericAmount < 1) {
        return res.status(400).json({ error: "Please enter a valid donation amount." });
      }

      const validation = await validateDonorServerSide({
        donorName: String(donorName || ""),
        donorEmail: String(donorEmail || ""),
        countryCode,
        mobileNumber: mobile,
        donorMobile: String(donorMobile || ""),
        donorType: String(donorType),
        country: String(country || ""),
        city: String(city || ""),
        pan: String(pan || ""),
        require80G: Boolean(require80G),
      });

      if (!validation.valid) {
        return res.status(400).json({ error: validation.error, fieldErrors: validation.fieldErrors });
      }

      const keyId = (process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || "").trim();
      const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
      if (!keyId || !keySecret) {
        return res.status(503).json({ error: "Online card/netbanking gateway is not configured. Please use UPI QR or Direct Bank Transfer." });
      }

      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const receiptNumber = generateReceiptNumber();
      const options = {
        amount: Math.round(numericAmount * 100),
        currency,
        receipt: receiptNumber,
      };

      const order = await razorpay.orders.create(options);

      try {
        insertDonation.run(
          order.id,
          null,
          receiptNumber,
          numericAmount,
          currency,
          String(donorName || "").trim(),
          String(donorEmail || "").trim(),
          String(donorMobile || "").trim(),
          String(donorType),
          String(frequency),
          String(country).trim(),
          String(city).trim(),
          String(pan || "").trim().toUpperCase(),
          require80G ? 1 : 0,
          String(prayerRequest || "").trim(),
          String(paymentMethod || "razorpay"),
          null,
          String(cause),
          "PENDING"
        );
      } catch (err) {
        console.error("Database error:", err);
      }

      res.json({ ...order, receiptNumber });
    } catch (error: any) {
      console.error("Razorpay order creation error:", error);
      const rzpMessage =
        error?.error?.description ||
        error?.error?.reason ||
        (typeof error?.message === "string" ? error.message : "") ||
        "Failed to create payment order.";
      res.status(500).json({ error: rzpMessage });
    }
  });

  app.post("/api/razorpay/verify", (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

      const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
      if (!keySecret) {
        return res.status(500).json({ error: "Razorpay secret not configured" });
      }
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ success: false, message: "Missing payment verification parameters" });
      }

      const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSign = crypto
        .createHmac("sha256", keySecret)
        .update(sign)
        .digest("hex");

      const sigBuf = Buffer.from(String(razorpay_signature));
      const expectedBuf = Buffer.from(expectedSign);
      const isMatch = sigBuf.length === expectedBuf.length && crypto.timingSafeEqual(sigBuf, expectedBuf);

      if (isMatch) {
        try {
          updateDonationSuccess.run("SUCCESS", razorpay_payment_id, razorpay_order_id);
        } catch (err) {
          console.error("Database update error:", err);
        }

        const row = getDonationByOrderId.get(razorpay_order_id) as any;
        sendReceiptEmailIfConfigured(row);

        res.json({
          success: true,
          message: "Payment verified successfully",
          donation: formatDonationResponse(row)
        });
      } else {
        try {
          updateDonationFailed.run("FAILED", razorpay_order_id);
        } catch (err) {}
        res.status(400).json({ success: false, message: "Invalid signature" });
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({ success: false, message: "Verification failed" });
    }
  });

  app.get("/api/razorpay/key", (req, res) => {
    res.json({ key: (process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || "").trim() });
  });

  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV !== "production") {
    const viteReady = (async () => {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: {
          middlewareMode: true,
          hmr: process.env.DISABLE_HMR === "true" ? false : { server: httpServer },
        },
        appType: "spa",
      });
      return vite.middlewares;
    })();

    viteReady.catch((err) => {
      console.error("Failed to initialize Vite dev middleware:", err);
    });

    app.use(async (req, res, next) => {
      try {
        const middlewares = await viteReady;
        middlewares(req, res, next);
      } catch (err) {
        next(err);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
