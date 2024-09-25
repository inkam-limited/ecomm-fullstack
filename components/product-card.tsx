import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { ProductWithIncludes } from "./product-cards";

const ProductCard = ({ product }: { product: ProductWithIncludes }) => {
  console.log(product);
  return (
    <Link
      href={`product/${product.id}`}
      className="w-[calc(50%-.5rem)] md:w-[calc(25%-.5rem)] text-slate-900"
    >
      <div className="w-full relative aspect-w-7 aspect-h-5 rounded-lg">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover object-center w-full h-full rounded-lg"
        />
      </div>
      <div className="flex flex-col w-full py-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold line-clamp-1">{product.name}</div>
          <div className="text-sm font-bold bg-slate-100 h-full flex items-center justify-center px-2 py-1">
            <p>${product.price}</p>
          </div>
        </div>
        <p className="font-normal text-xs text-slate-800/80">
          {product.createdBy?.firstName} in{" "}
          <span>{product.category[0].name}</span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
