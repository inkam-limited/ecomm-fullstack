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
  return <div>{JSON.stringify(order)}</div>;
};

export default page;
