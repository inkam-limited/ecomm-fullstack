"use server";

import { z } from "zod";
import { paymentLinkSchema } from "./LinkForm";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { v4 as uuid } from "uuid";
import { paymentSubmissionSchema } from "./[transactionId]/PaymentSubmissionForm";
import { PaymentApiRequestBody } from "@/types";
import axios from "axios";
import { redirect } from "next/navigation";

export const generatePaymentLink = async (
  data: z.infer<typeof paymentLinkSchema>
) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("You need to login first");
  }

  try {
    const transactionId = `${Date.now()}_${uuid()}`;
    const generatedTransaction = await prisma.transaction.create({
      data: {
        tranId: transactionId,
        productId: data.productId,
        userId: user.id,
        description: "Payment Link",
        type: "json",
      },
    });

    console.log(generatedTransaction);
    // await prisma.transaction.delete({
    //   where: {
    //     tranId: transactionId,
    //   },
    // });

    if (!generatedTransaction) {
      throw new Error("Transaction not created");
    }
    return {
      success: true,
      link: `${process.env.BASE_URL}/create-order/${transactionId}`,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const submitPayment = async (
  formData: z.infer<typeof paymentSubmissionSchema>
) => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: formData.transactionId,
    },
  });

  const submissionData: PaymentApiRequestBody = {
    amount: Number(formData.amount),
    currency: formData.currency,
    tran_id: formData.transactionId,
    cus_add1: transaction?.customerAddress!,
    cus_email: formData.cus_email,
    cus_name: formData.cus_name,
    cus_phone: formData.cus_phone,
    desc: formData.cus_add1,
    type: "json",
    store_id: process.env.STORE_ID!,
    signature_key: process.env.SIGNATURE_KEY!,
    success_url: `${process.env.BASE_URL}/api/callback?transactionId=${transaction?.tranId}`,
    fail_url: `${process.env.BASE_URL}/payment/fail?transactionId=${transaction?.tranId}`,
    cancel_url: `${process.env.BASE_URL}/payment/cancel?transactionId=${transaction?.tranId}`,
  };

  console.log("submission ", submissionData);

  const { data } = await axios.post(
    process.env.AAMARPAY_BASE_URL!,
    { ...submissionData },
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

  const payment_url = data.payment_url;
  if (!payment_url) {
    return { success: false, error: "Payment URL not found" };
  }
  redirect(payment_url);
};
