import { delItem } from "@/app/actions";
import { DeleteItem } from "@/components/SubmitButtons";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cart } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import React from "react";

interface PageProps {
  cart: Cart;
  totalPrice: number;
}

const ShoppingBagCard: FC<PageProps> = ({ cart, totalPrice }) => {
  return (
    <Card className="">
      <div className="flex flex-col gap-y-10 p-4 lg:p-8 bg-white rounded-2xl">
        {cart?.items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="basis-2/6 md:basis-1/4  aspect-video h-24 lg:h-36  relative">
              <Image
                className="rounded-md object-cover"
                fill
                src={item.imageString}
                alt="Product image"
              />
            </div>
            <div className="flex gap-4 flex-col flex-grow justify-between w-full font-medium">
              <p className="text-sm md:text-base">
                <span className="font-semibold">Product:</span> {item.name}
              </p>
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-center gap-x-2">
                  <p className="text-sm md:text-base">
                    <span className="font-semibold">Quantity:</span>
                    <span> {item.quantity}</span>
                  </p>{" "}
                  <p className="text-sm md:text-base">
                    &#2547; {item.price.toLocaleString("bn-BD")}
                  </p>
                </div>
              </div>
              <form action={delItem} className="text-end">
                <input type="hidden" name="productId" value={item.id} />
                <DeleteItem />
              </form>
            </div>
          </div>
        ))}
        <div className="mt-10 border-t border-gray-500 pt-4">
          <div className="flex items-center justify-between font-medium">
            <p>Subtotal:</p>
            <p>&#2547;{new Intl.NumberFormat("bn-BD").format(totalPrice)}</p>
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
    </Card>
  );
};

export default ShoppingBagCard;
