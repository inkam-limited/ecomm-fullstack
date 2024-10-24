"use server";

export const getPaymentDetails = async (transactionId: string) => {
  const storeId = process.env.NEXT_PUBLIC_AAMARPAY_STORE_ID;
  const signatureKey = process.env.NEXT_PUBLIC_AAMARPAY_SIGNATURE_KEY;

  if (!transactionId || !storeId || !signatureKey) {
    return { status: 400, error: "Missing required parameters" };
  }

  const apiUrl = `http://sandbox.aamarpay.com/api/v1/trxcheck/request.php?request_id=${transactionId}&store_id=${storeId}&signature_key=${signatureKey}&type=json`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return {
        status: response.status,
        error: "Failed to fetch payment details",
      };
    }
    const data = await response.json();
    console.log(data);
    return { status: 200, data };
  } catch (error) {
    return {
      status: 500,
      error: "Error fetching payment details",
      details: error,
    };
  }
};
