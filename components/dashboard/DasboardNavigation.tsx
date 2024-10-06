"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Back to Storefront",
    href: "/",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
  },
  {
    name: "Products",
    href: "/dashboard/products",
  },
  {
    name: "Banner",
    href: "/dashboard/banner",
  },
  {
    name: "Blog ",
    href: "/dashboard/blog",
  },
];

export function DashboardNavigation() {
  const pathname = usePathname();
  return (
    <div className="gap-4 flex flex-col md:flex-row">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            link.href === pathname
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
