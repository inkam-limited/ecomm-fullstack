import prisma from "@/lib/db";
import React from "react";
import PaymentSubmissionForm from "./PaymentSubmissionForm";

const page = async ({ params }: { params: { transactionId: string } }) => {
  return (
    <div>
      <h1>Payment Submission Form</h1>
      <PaymentSubmissionForm transactionId={params.transactionId} />
    </div>
  );
};

export default page;
