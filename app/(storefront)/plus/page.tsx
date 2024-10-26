import React from "react";
import PricingTable from "./pricing-table";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return <div>Please login to access this page</div>;
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      isProAccount: true,
    },
  });
  return (
    <div>
      <PricingTable id={user.id} isPro={dbUser?.isProAccount} />
    </div>
  );
};

export default page;
