import { delItem } from "@/app/actions";
import { DeleteItem } from "@/components/SubmitButtons";

import { Button, buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BadgeCheck, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { Cart } from "@/lib/interfaces";
import { redis } from "@/lib/redis";

export default async function BagRoute() {
  noStore();
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
  console.log(cart?.items);

  return (
    <div className="max-w-7xl mx-auto mt-10 min-h-[70vh]">
      {!cart || !cart.items || cart.items.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
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
            <Link href="/">Shop Now!</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 gap-y-10 min-h-[70vh]">
          <div className="lg:col-span-1 w-full h-full relative hidden lg:block">
            <Image
              fill
              alt="checkout"
              src="/checkout.jpg"
              className="object-contain"
            />
          </div>
          <div className="lg:col-span-3 flex flex-col gap-y-10 p-10 lg:p-20 bg-white rounded-lg">
            {cart?.items.map((item) => (
              <div key={item.id} className="flex">
                <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                  <Image
                    className="rounded-md object-cover"
                    fill
                    src={item.imageString}
                    alt="Product image"
                  />
                </div>
                <div className="ml-5 flex justify-between w-full font-medium">
                  <p>{item.name}</p>
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center gap-x-2">
                      <p>{item.quantity} x</p>
                      <p>BDT {item.price}</p>
                    </div>

                    <form action={delItem} className="text-end">
                      <input type="hidden" name="productId" value={item.id} />
                      <DeleteItem />
                    </form>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-10">
              <div className="flex items-center justify-between font-medium">
                <p>Subtotal:</p>
                <p>
                  &#2547;{new Intl.NumberFormat("bn-BD").format(totalPrice)}
                </p>
              </div>
              {/* <PaymentForm amount={totalPrice} userId={user.id} /> */}

              <Link
                href="/checkout"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full mt-8"
                )}
              >
                Proceed to Checkout <BadgeCheck className="size-6 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
