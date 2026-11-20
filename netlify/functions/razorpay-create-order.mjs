import crypto from "crypto";

function generateReceiptNumber() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `MGF-${y}${m}${d}-${rand}`;
}

const JSON_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: JSON_HEADERS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: JSON_HEADERS,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const keyId = (process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || "").trim();
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET || "").trim();

    if (!keyId || !keySecret) {
      return {
        statusCode: 503,
        headers: JSON_HEADERS,
        body: JSON.stringify({
          code: "MISSING_SECRET",
          keyConfigured: Boolean(keyId),
          error:
            "Online card/netbanking gateway is currently being activated. Please use UPI QR or Direct Bank Transfer.",
        }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const numericAmount = Number(body.amount);
    const currency = String(body.currency || "INR").trim().toUpperCase();

    if (!Number.isFinite(numericAmount) || numericAmount < 1) {
      return {
        statusCode: 400,
        headers: JSON_HEADERS,
        body: JSON.stringify({ error: "Please enter a valid donation amount." }),
      };
    }

    const receiptNumber = generateReceiptNumber();
    const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(numericAmount * 100),
        currency,
        receipt: receiptNumber,
        notes: {
          cause: String(body.cause || "Where Needed Most").slice(0, 200),
          donor_name: String(body.donorName || "").trim().slice(0, 120),
          donor_email: String(body.donorEmail || "").trim().slice(0, 120),
          donor_mobile: String(body.donorMobile || "").trim().slice(0, 30),
          frequency: String(body.frequency || "once").slice(0, 30),
          receipt_number: receiptNumber,
        },
      }),
    });

    const data = await rzpRes.json();

    if (!rzpRes.ok || data.error) {
      return {
        statusCode: rzpRes.status >= 400 ? rzpRes.status : 502,
        headers: JSON_HEADERS,
        body: JSON.stringify({
          error:
            data?.error?.description ||
            data?.error?.reason ||
            "Could not create Razorpay order. Please verify your Razorpay API keys.",
        }),
      };
    }

    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ...data, receiptNumber }),
    };
  } catch (error) {
    console.error("Netlify Razorpay create-order error:", error);
    return {
      statusCode: 500,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        error: "Unable to initiate online payment right now. Please try UPI QR or Direct Bank Transfer.",
      }),
    };
  }
};
