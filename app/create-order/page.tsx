import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";
import LinkForm from "./LinkForm";

const page = async () => {
  unstable_noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const products = await prisma.product.findMany({});

  if (!user) {
    redirect("/auth/login?redirectTo=/create-order");
  }

  return (
    <main className="bg-gradient-to-b flex justify-center items-center h-screen from-indigo-400 to-violet-600 text-white relative overflow-hidden">
      <div className="absolute -inset-16 bg-yellow-400/70 z-0 size-96 blur-3xl rounded-full" />
      <div className="absolute -right-20 -bottom-20 bg-yellow-400/70 z-0 size-96 blur-3xl rounded-full" />
      <div className="relative">
        <Card className="p-4 min-w-32 container mx-auto shadow-xl bg-slate-50/70">
          <LinkForm products={products} />
        </Card>
      </div>
    </main>
  );
};

export default page;
