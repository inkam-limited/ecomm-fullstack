import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cart } from "@/lib/interfaces";
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUserProperties } from "@kinde-oss/kinde-auth-nextjs/types";
import { Category } from "@prisma/client";
import { MenuIcon, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { UserDropdown } from "../storefront/UserDropdown";
import { Button } from "../ui/button";
import GlowButton from "../GlowButton";
import { ScrollArea } from "../ui/scroll-area";

const MobileMenu = ({
  categories,
  user,
  cart,
  total,
}: {
  categories: Category[];
  user: KindeUserProperties | null;
  cart: Cart | null;
  total: number;
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Account</SheetTitle>
        </SheetHeader>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="p-2 flex items-center gap-2">
                  <UserDropdown
                    email={user.email as string}
                    name={user.given_name as string}
                    userImage={
                      user.picture ??
                      `https://avatar.vercel.sh/${user.given_name}`
                    }
                  />
                  <span>{user.given_name}</span>
                </div>
                <Link href="/bag" className="group p-2 flex items-center gap-2">
                  <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {total}
                  </span>
                  <span className="">Cart</span>
                </Link>
              </div>
            ) : (
              <div className="flex md:flex-1 md:items-center md:justify-end md:space-x-2 py-4">
                <Button variant="outline" asChild>
                  <LoginLink>Sign in</LoginLink>
                </Button>
                <span className="h-6 w-px bg-gray-200"></span>
                <Button variant="ghost" asChild>
                  <RegisterLink>Create Account</RegisterLink>
                </Button>
              </div>
            )}
          </div>
        </div>
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[50vh] overflow-y-auto border border-blue-500/570 py-4 my-4 rounded-xl ">
          <div>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </ScrollArea>
        <SheetFooter>
          <div className="flex justify-center w-full mt-4 gap-4 items-center">
            <span className="text-sm text-gray-500">Get Plus</span>
            <GlowButton />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
