import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductCards from "./product-card-layout";
import prisma from "@/app/lib/db";
import { $Enums } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
export type ProductWithIncludes = {
  id: string;
  name: string;
  description: JsonValue;
  status: $Enums.ProductStatus;
  price: number;
  images: string[];
  isFeatured: boolean;
  productFileLink: string | null;
  createdById: string | null;
  createdAt: Date;
  createdBy: {
    firstName: string;
    lastName: string;
    id: string;
  } | null;
  category:
    | {
        id: string;
        name: string;
      }[];
};

const ProductCardDisplay = async ({
  title = "Products from Featured Shops",
  link,
}: {
  title?: string;
  link: string;
}) => {
  const products = await prisma.product.findMany({
    include: {
      createdBy: {
        select: {
          firstName: true,
          lastName: true,
          id: true,
        },
      },
      category: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return (
    <div className="py-8">
      <div className="flex py-4 justify-between items-center">
        <h3 className="font-semibold ">{title}</h3>
        <Link
          href="/featured"
          className="inline-flex items-center gap-2 text-sm"
        >
          Explore more <ArrowRight className="w-4 h-4" />{" "}
        </Link>
      </div>
      <ProductCards products={products} />
    </div>
  );
};

export default ProductCardDisplay;
