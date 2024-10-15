import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { Cart } from "@/lib/interfaces";
import { redis } from "@/lib/redis";
import ShoppingBagCard from "./ShoppingBagCard";
export default async function BagRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("api/auth/login");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  let totalPrice = 0;

  cart?.items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return (
    <div className="relative overflow-hidden md:py-12 bg-gradient-to-b from-indigo-400 to-violet-600 text-gray-900">
      <div className="absolute -inset-16 bg-yellow-400/70 z-0 size-96 blur-3xl rounded-full" />
      <div className="absolute -right-20 -bottom-20 bg-yellow-400/70 z-0 size-96 blur-3xl rounded-full" />
      <div className="max-w-3xl relative mx-auto md:mt-10 bg-slate-50/70 backdrop-blur-3xl rounded-lg py-24 p-2 md:p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Your Bag
          </h1>
          <p className="my-4 text-lg text-gray-500">
            Your shopping bag contains{" "}
            <span className="font-semibold text-gray-900">
              {cart?.items.length} items
            </span>
          </p>
        </div>
        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-4 border-dashed p-8 text-center mt-20">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <ShoppingBag className="w-10 h-10 text-primary" />
            </div>

            <h2 className="mt-6 text-xl font-semibold">
              You dont have any products in your Bag
            </h2>
            <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
              You currently dont have any products in your shopping bag. Please
              add some so that you can see them right here.
            </p>

            <Button asChild>
              <Link href="/products">Shop Now!</Link>
            </Button>
          </div>
        ) : (
          <ShoppingBagCard cart={cart} totalPrice={totalPrice} />
        )}
      </div>
    </div>
  );
}
