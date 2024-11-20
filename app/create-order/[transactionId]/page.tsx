import prisma from "@/lib/db";
import React from "react";
import PaymentSubmissionForm from "./PaymentSubmissionForm";

const page = async ({ params }: { params: { transactionId: string } }) => {
  return <PaymentSubmissionForm transactionId={params.transactionId} />;
};

export default page;
