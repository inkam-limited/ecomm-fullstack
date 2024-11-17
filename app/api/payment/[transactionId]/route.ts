import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { transactionId: string } }
) {
  const storeId = process.env.NEXT_PUBLIC_AAMARPAY_STORE_ID;
  const signatureKey = process.env.NEXT_PUBLIC_AAMARPAY_SIGNATURE_KEY;

  const { transactionId } = params;

  if (!transactionId || !storeId || !signatureKey) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const apiUrl = `https://secure.aamarpay.com/api/v1/trxcheck/request.php?request_id=${transactionId}&store_id=${storeId}&signature_key=${signatureKey}&type=json`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch payment details" },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching payment details", details: error },
      { status: 500 }
    );
  }
}
