import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Category } from "@prisma/client";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const MobileMenu = ({ categories }: { categories: Category[] }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
