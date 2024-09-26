import { delItem } from "@/app/actions";
import { DeleteItem } from "@/app/components/SubmitButtons";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button, buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BadgeCheck, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

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

  return (
    <div className="max-w-5xl mx-auto mt-10 min-h-[55vh]">
      {!cart || !cart.items ? (
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
        <div className="grid lg:grid-cols-2 gap-y-10">
          <div className="w-full h-full relative">
            <Image
              fill
              alt="checkout"
              src="/checkout.jpg"
              className="object-contain"
            />
          </div>
          <div>
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
                      <p>${item.price}</p>
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
                <p>${new Intl.NumberFormat("en-US").format(totalPrice)}</p>
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
