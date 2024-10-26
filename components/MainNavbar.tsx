import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserDropdown } from "@/components/storefront/UserDropdown";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import MainSearchBar from "./MainSearchBar";
import { Cart } from "@/lib/interfaces";
import { redis } from "@/lib/redis";
import prisma from "@/lib/db";
import MobileMenu from "./mobile/mobile-menu";
import DigigoLogo from "./logo";
import GlowButton from "./GlowButton";

const MainNavbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const categories = await prisma.category.findMany();

  return (
    <nav className="flex flex-col container mx-auto px-4 mb-3">
      <div className="flex w-full items-center justify-between mx-auto">
        <div className="flex-1">
          <MobileMenu
            categories={categories}
            cart={cart}
            total={total}
            user={user}
          />
        </div>

        <Link href="/">
          <DigigoLogo width={120} height={60} showAnimation={true} />
        </Link>

        <div className="flex justify-end flex-1 items-center gap-4">
          <div className="hidden md:flex">{user && <GlowButton />}</div>
          <div className="flex items-center">
            {user && (
              <>
                <Link href="/bag" className="group p-2 flex items-center mr-2">
                  <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {total}
                  </span>
                </Link>

                <UserDropdown
                  email={user.email as string}
                  name={user.given_name as string}
                  userImage={
                    user.picture ??
                    `https://avatar.vercel.sh/${user.given_name}`
                  }
                />
              </>
            )}
            {!user && (
              <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
                <Button variant="ghost" asChild>
                  <LoginLink
                  // postLoginRedirectURL={`${process.env.BASE_URL}/api/auth/creation`}
                  >
                    Sign in
                  </LoginLink>
                </Button>
                <span className="h-6 w-px bg-gray-200"></span>
                <Button variant="ghost" asChild>
                  <RegisterLink>Create Account</RegisterLink>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <MainSearchBar categories={categories} />
    </nav>
  );
};

export default MainNavbar;
