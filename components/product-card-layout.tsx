import React from "react";
import Image from "next/image";
import ProductCard from "./product-card";
import { Product } from "@prisma/client";
import { ProductWithIncludes } from "./product-cards";

const ProductCards = ({ products }: { products: ProductWithIncludes[] }) => {
  return (
    <div className="flex flex-wrap space-y-3 items-baseline justify-start gap-[.65rem]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductCards;
