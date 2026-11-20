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
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  try {
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET || "").trim();
    if (!keySecret) {
      return {
        statusCode: 500,
        headers: JSON_HEADERS,
        body: JSON.stringify({ success: false, message: "Payment verification is not configured." }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donationDetails = {},
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return {
        statusCode: 400,
        headers: JSON_HEADERS,
        body: JSON.stringify({ success: false, message: "Missing payment verification parameters." }),
      };
    }

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto.createHmac("sha256", keySecret).update(sign).digest("hex");

    const sigBuf = Buffer.from(String(razorpay_signature));
    const expectedBuf = Buffer.from(expectedSign);
    const isMatch =
      sigBuf.length === expectedBuf.length && crypto.timingSafeEqual(sigBuf, expectedBuf);

    if (!isMatch) {
      return {
        statusCode: 400,
        headers: JSON_HEADERS,
        body: JSON.stringify({ success: false, message: "Invalid payment signature." }),
      };
    }

    const donation = {
      receiptNumber: donationDetails.receiptNumber || generateReceiptNumber(),
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: Number(donationDetails.amount) || 0,
      currency: String(donationDetails.currency || "INR"),
      cause: String(donationDetails.cause || "Where Needed Most"),
      donorType: String(donationDetails.donorType || "indian"),
      frequency: String(donationDetails.frequency || "once"),
      donorName: String(donationDetails.donorName || ""),
      donorEmail: String(donationDetails.donorEmail || ""),
      donorMobile: String(donationDetails.donorMobile || ""),
      country: String(donationDetails.country || ""),
      city: String(donationDetails.city || ""),
      pan: String(donationDetails.pan || ""),
      require80G: Boolean(donationDetails.require80G),
      paymentMethod: String(donationDetails.paymentMethod || "razorpay"),
      status: "SUCCESS",
      createdAt: new Date().toISOString(),
    };

    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        success: true,
        message: "Payment verified successfully",
        donation,
      }),
    };
  } catch (error) {
    console.error("Netlify Razorpay verify error:", error);
    return {
      statusCode: 500,
      headers: JSON_HEADERS,
      body: JSON.stringify({ success: false, message: "Payment verification failed." }),
    };
  }
};
