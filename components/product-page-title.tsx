import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const ProductPageTitle = ({ product }: { product: any }) => {
  return (
    <div>
      <h1 className="text-lg font-semibold">{product.name}</h1>
      <div className="flex items-center text-muted-foreground">
        <span>by</span>
        <span className="ml-2 flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage
              src="https://avatar.vercel.sh/rauchg.svg?text=GR"
              alt={product.creator}
            />
            <AvatarFallback />
          </Avatar>
          <p className="font-semibold pt-2">{product.creator}</p>
        </span>
      </div>
    </div>
  );
};

export default ProductPageTitle;
