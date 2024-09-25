import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LucideShoppingCart,
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/app/components/storefront/UserDropdown";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import MobileMenu from "./mobile/mobile-menu";
import prisma from "@/app/lib/db";

const CreativeMainNavbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const categories = await prisma.category.findMany();

  return (
    <div className="flex flex-col container mx-auto">
      <div className="flex w-full items-center justify-between mx-auto max-w-7xl">
        <MobileMenu categories={categories} />

        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="1.414"
            clipRule="evenodd"
            viewBox="0 0 114 45"
            role="presentation"
            focusable="false"
            className="w-20 h-16"
          >
            <path
              fill="currentColor"
              d="M35.648 35.918H34.4a.258.258 0 00-.204.103l-2.233 3.768c-.103.137-.184.136-.286-.003l-2.163-3.763a.26.26 0 00-.206-.105h-1.224a.259.259 0 00-.257.26v7.562c0 .144.115.26.257.26h1.221a.258.258 0 00.257-.26v-3.888c0-.25.237-.356.384-.154l1.676 2.764c.102.139.308.14.412.002l1.73-2.771c.148-.199.384-.092.384.157v3.89c0 .144.115.26.257.26h1.243a.26.26 0 00.258-.26v-7.562a.26.26 0 00-.258-.26m8.702 4.918h-1.63c-.173 0-.291-.183-.228-.353l.812-2.17a.24.24 0 01.454-.001l.819 2.171c.064.169-.055.353-.227.353zm.042-4.763a.245.245 0 00-.223-.155h-1.267a.245.245 0 00-.223.155l-3.162 7.564c-.071.171.047.363.224.363h1.272a.244.244 0 00.228-.164l.469-1.265a.245.245 0 01.227-.164h3.209c.1 0 .19.064.227.162l.479 1.268a.243.243 0 00.227.163h1.251c.177 0 .295-.192.224-.363l-3.162-7.564zm21.759 3.677a.25.25 0 01.008-.3l2.305-2.872c.129-.16.016-.401-.187-.401h-1.274a.24.24 0 00-.189.093l-2.592 3.322c-.142.183-.431.081-.431-.152v-3.017a.244.244 0 00-.241-.246h-1.142a.244.244 0 00-.241.246v7.331c0 .136.108.246.241.246h1.142c.133 0 .241-.11.241-.246v-1.276c0-.057.02-.111.054-.155l.973-1.211a.238.238 0 01.385.016l1.886 2.767a.242.242 0 00.198.105h1.42c.197 0 .311-.228.195-.39l-2.751-3.86zm13.359 2.741h-3.761a.284.284 0 01-.287-.281v-1.148c0-.155.129-.28.287-.28h2.518a.284.284 0 00.286-.282v-.857a.284.284 0 00-.286-.281h-2.518a.284.284 0 01-.287-.281v-1.115c0-.155.129-.281.287-.281h3.498a.284.284 0 00.287-.281v-.946a.283.283 0 00-.287-.281h-5.209a.284.284 0 00-.287.281v7.261c0 .155.129.281.287.281h5.472a.284.284 0 00.286-.281v-.947a.284.284 0 00-.286-.281m9.125-6.573h-5.821c-.128 0-.231.115-.231.257v1.045c0 .142.103.257.231.257h1.895c.128 0 .231.115.231.256v6.011c0 .141.104.256.231.256h1.096c.127 0 .231-.115.231-.256v-6.011c0-.141.103-.256.231-.256h1.906c.127 0 .231-.115.231-.257v-1.045c0-.142-.104-.257-.231-.257m-33.7 4.427c-.313.018-.619.022-.941.017a.256.256 0 01-.248-.257v-2.401c0-.141.112-.257.25-.256.282.001.56.005.872.023 1.022.045 1.796.528 1.796 1.426 0 .792-.539 1.367-1.729 1.448m3.411-1.403c0-1.759-1.301-3.012-3.567-3.024-.809 0-1.608.02-2.467.032a.256.256 0 00-.249.256v7.538c0 .141.112.256.25.256h1.183c.138 0 .25-.115.25-.256v-1.6c0-.2.039-.256.251-.256.255 0 .641.009.927.009.055 0 .112-.006.167-.008l-.006.004c.278 0 .352-.025.43.132l.9 1.834a.247.247 0 00.223.141h1.358c.186 0 .307-.201.223-.372l-1.041-2.105a.262.262 0 01.083-.327c.643-.478 1.085-1.211 1.085-2.254m47.682-25.363c2.05 0 .88 8.326-2.71 8.879a7.828 7.828 0 01-.261-1.879c0-2.72 1.023-7 2.971-7M55.083 26.344c-3.716 0-1.118-12.781 1.881-12.781 1.993 0 1.674 12.781-1.881 12.781M42.141 13.52c2.131 0 .866 8.072-2.635 9.398-.265-.858-.395-1.696-.395-2.339 0-2.72 1.081-7.059 3.03-7.059m70.477 7.355c-.105.104-1.07 5.912-5.232 5.912-1.618 0-2.759-1.215-3.463-2.667 5.093-1.121 6.798-5.118 6.798-7.854 0-3.188-2.277-4.339-4.216-4.339-3.17 0-7.294 2.925-7.294 8.652 0 .516.03 1.013.086 1.49-1.097-.331-2.046-.911-2.694-1.9.951-4.227.783-8.272-1.187-8.272-1.107 0-2.049 1.444-2.049 4.592 0 1.238.326 2.626.989 3.891-.405 1.917-1.794 6.6-3.561 6.6-2.436 0-1.684-11.498-1.684-13.197 0-1.386-3.372-2.839-4.113-2.103-.322.319-.379 2.194-.379 4.619 0 1.986.156 4.341.59 6.516-.234 1.182-1.237 4.219-3.112 4.219-2.906 0-1.434-10.889-1.434-12.642 0-1.252-3.245-2.429-4.037-1.642-.313.311-.53 2.513-.53 5.943 0 1.426.082 2.94.294 4.376-.307 1.52-1.511 3.965-3.465 3.965-3.107 0-1.733-11.934-.906-19.292a23.115 23.115 0 011.554-.228c1.36-.15 3.028-.414 3.028.409 0 1.936 1.295 2.533 2.255 2.533 1.047 0 1.993-.823 1.993-2.398 0-1.566-1.352-3.013-3.775-3.013-1.613 0-3.215.185-4.807.444.129-1.231.214-2.205.214-2.788 0-1.641-3.391-3.209-4.06-2.545-.129.129-.583 2.698-.974 6.255-2.356.468-4.687.877-6.991.877-.797 0-.695 2.397 2.033 2.397 1.569 0 3.105-.345 4.71-.767-.218 2.49-.377 5.248-.377 7.904 0 2.376.143 4.458.442 6.22-.305 1.323-1.272 3.992-3.023 3.992-3.413 0-1.795-11.718-1.795-13.471 0-.833-3.105-2.629-3.747-1.993-.09.09-.143.585-.143.585s-.414-.302-1.56-.302c-4.356 0-7.853 5.342-7.853 10.217 0 .234.012.458.025.682-.675 1.568-2.381 4.282-5.472 4.282-1.539 0-2.666-1.026-3.419-2.325 4.774-1.341 6.667-5.513 6.667-8.178 0-3.119-2.666-4.664-4.605-4.664-3.365 0-7.074 3.349-7.074 9.001 0 1.646.316 3.071.853 4.268-.596.949-1.533 1.898-2.792 1.898-3.489 0-1.15-11.643-1.15-12.885 0-.308.004-.887-.55-1.275-.731-.51-4.935-1.064-6.359-1.344.011-.309.015-.593.015-.846 0-2.25-1.423-2.768-2.337-2.768-1.547 0-1.871 1.726-1.871 2.143 0 .417.115 1.877 1.662 2.769 0 4.204-2.696 14.126-9.935 14.126-5.46 0-7.459-5.587-7.459-9.752 0-7.005 4.138-12.429 6.818-12.429 3.362 0 .396 6.434 3.758 6.434 2.368 0 2.698-2.277 2.698-3.324 0-1.96-2.062-5.63-6.443-5.63C5.182 2.253 0 10.709 0 17.957c0 6.964 4.816 12.574 11.573 12.574 10.434 0 13.04-11.005 13.583-17.165.67.197 2.322.472 2.483.634.273.271-.527 4.007-.527 7.602 0 4.508 1.488 8.117 5.063 8.117 2.239 0 4.04-1.614 4.984-2.854 1.451 1.842 3.546 2.799 5.592 2.799 3.522 0 5.837-2.181 7.004-3.936.982 2.636 2.991 3.936 4.809 3.936 2.537 0 4.065-3.384 4.153-3.931.768 2.361 2.558 3.986 4.578 3.986 2.559 0 4.094-2.304 4.721-3.744.907 2.433 2.357 3.744 4.436 3.744 2.381 0 3.956-2.15 4.663-3.594.753 2.106 2.001 3.594 3.996 3.594 2.67 0 4.327-2.704 4.881-4.083.877 2.325 2.253 4 4.359 4 2.353 0 4.393-3.342 5.613-7.123a6.987 6.987 0 003.849 1.828c1.186 3.395 3.961 5.294 6.884 5.294 5.109 0 7.069-5.211 7.278-6.432.209-1.222-.965-2.717-1.357-2.328"
            ></path>
          </svg>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {user ? (
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
            ) : (
              <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
                <Button variant="ghost" asChild>
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
      </div>

      <div className="flex items-center w-full px-4 bg-gray-50 py-2 rounded-full">
        <div className="flex items-center gap-4 flex-grow ">
          <SearchIcon className="w-6 h-6" />
          <Input
            placeholder="Search millions of photos, fonts, graphics, and more..."
            className="border-none bg-transparent focus:border-none focus:ring-transparent focus-visible:ring-transparent focus-visible:outline-transparent focus-within:outline-transparent focus-visible:outline-none"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px] bg-transparent border-none b focus:ring-0">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CreativeMainNavbar;
