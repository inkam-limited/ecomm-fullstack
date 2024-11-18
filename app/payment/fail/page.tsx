import prisma from "@/lib/db";
import React from "react";

const page = ({
  searchParams,
}: {
  searchParams: { transactionId: string };
}) => {
  const transactionId = searchParams.transactionId;

  const order = prisma.order.update({
    where: {
      transactionId,
      status: "pending",
    },
    data: {
      status: "cancelled",
      payStatus: "Failed",
    },
  });
  console.log("order failed", order);
  return (
    <div>
      <h1>Payment Failed</h1>
    </div>
  );
};

export default page;
