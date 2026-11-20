const FOUNDATION_PAYMENT_CONFIG = {
  upi: {
    id: "syedgggurdezi@okicici",
    payeeName: "Shah Sufi Syed Gous Gaznavi Gurdezi",
  },
  bank: {
    accountHolder: "SYED GHOUS GHAZNAVI GURDEZI",
    bankName: "ICICI BANK",
    accountType: "Savings Account",
    accountNumber: "768401500538",
    ifsc: "ICIC0007684",
  },
  whatsapp: "919680872049",
};

export const handler = async () => {
  const keyId = (process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || "").trim();
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
  const razorpayEnabled = Boolean(keyId && keySecret);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify({
      razorpayEnabled,
      razorpayKeyId: keyId,
      ...FOUNDATION_PAYMENT_CONFIG,
    }),
  };
};
