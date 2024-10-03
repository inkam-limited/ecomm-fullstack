import { PaymentForm } from "@/components/storefront/CheckoutForm";

import { Card } from "@/components/ui/card";
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
    redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  let totalPrice = 0;

  cart?.items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card className="px-8 py-4 container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Checkout Information Page</h2>
        <PaymentForm
          total_amount={totalPrice}
          name={`${user.family_name} ${user.given_name}`}
          email={user.email!}
          userId={user.id}
        />
      </Card>
    </div>
  );
};

export default page;
