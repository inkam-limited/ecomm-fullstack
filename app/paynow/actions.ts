"use server";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";
import axios from "axios";
import prisma from "@/lib/db";
import { PaymentSchema, PaymentSubmissionSchema } from "@/lib/zodSchemas";

export async function createStorePayment(prevState: any, formData: FormData) {
  const transactionId = `${Date.now()}_${uuid()}`;
  let payment_url: string | null = null;

  const parsedData = PaymentSubmissionSchema.parse(
    Object.fromEntries(formData)
  );
  console.log(parsedData);

  const transaction = await prisma.transaction.create({
    data: {
      amount: parsedData.amount,
      customerName: parsedData.cus_name,
      customerEmail: parsedData.cus_email,
      customerPhone: parsedData.cus_phone,
      customerAddress: parsedData.cus_add1,
      tranId: transactionId,
      currency: parsedData.currency,
      description: "Manual Payment",
      status: "pending",
      type: "json",
    },
  });
  console.log(transaction);

  const paymentFormData = {
    cus_name: parsedData.cus_name,
    cus_email: parsedData.cus_email,
    cus_phone: parsedData.cus_phone,
    amount: parsedData.amount,
    tran_id: transactionId,
    // signature_key: process.env.SIGNATURE_KEY,
    // store_id: process.env.STORE_ID,
    store_id: "aamarpaytest",
    signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
    currency: parsedData.currency,
    desc: "Manual Payment",
    cus_add1: parsedData.cus_add1 || "",
    cus_add2: "",
    cus_city: "",
    cus_country: "",
    success_url: `${process.env.BASE_URL}/api/payment-callback?transactionId=${transaction.id}`,
    fail_url: `${process.env.BASE_URL}/payment/failed?transactionId=${transaction.id}`,
    cancel_url: `${process.env.BASE_URL}/payment/cancel?transactionId=${transaction.id}`,
    type: "json",
  };

  const { data } = await axios.post(
    "https://sandbox.aamarpay.com/jsonpost.php",
    { ...paymentFormData },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(data);
  if (data.result !== "true") {
    let errorMessage = Object.values(data).join(". ");
    return { error: errorMessage };
  }

  payment_url = data.payment_url;
  if (!payment_url) {
    return { error: "Payment URL not found" };
  }

  redirect(payment_url);
}
