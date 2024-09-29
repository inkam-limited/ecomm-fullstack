import prisma from "@/app/lib/db";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

const CategoryBar = async () => {
  const categories = await prisma.category.findMany({});

  return (
    <div className="flex gap-4 py-4 mb-8 border-y border-gray-900 justify-center items-center mt-4">
      <Marquee autoFill={true} speed={30} direction="left" pauseOnHover>
        {categories.map((category) => (
          <div key={category.id}>
            <Link href={`/products`} className="text-sm font-semibold ml-4">
              {category.name}
            </Link>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CategoryBar;
