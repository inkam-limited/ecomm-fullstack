import { PaymentForm } from "@/components/storefront/CheckoutForm";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import { Cart } from "@/lib/interfaces";
import { redis } from "@/lib/redis";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  unstable_noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/auth/login?redirectTo=/checkout");
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      isProAccount: true,
    },
  });

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  let totalPrice = 0;

  return (
    <main className="bg-gradient-to-b from-indigo-400 to-violet-600 text-white relative overflow-hidden">
      <div className="absolute -inset-16 bg-yellow-400/70 z-0 size-96 blur-3xl rounded-full" />
      <div className="absolute -right-20 -bottom-20 bg-yellow-400/70 z-0 size-96 blur-3xl rounded-full" />
      <div className="max-w-3xl mx-auto md:py-12  relative">
        <Card className="px-2 md:px-8 py-4 container mx-auto shadow-xl pb-24 bg-slate-50/70">
          <h2 className="text-xl font-bold py-8">Checkout Information Page</h2>
          <PaymentForm
            total_amount={totalPrice}
            name={`${user.family_name} ${user.given_name}`}
            email={user.email!}
            userId={user.id}
            isProAccount={dbUser?.isProAccount}
          />
        </Card>
      </div>
    </main>
  );
};

export default page;
