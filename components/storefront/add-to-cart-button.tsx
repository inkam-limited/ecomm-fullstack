"use client";
import React from "react";
import { Button } from "../ui/button";
import { addItem } from "@/app/actions";
import { toast } from "sonner";
import { Loader2, ShoppingBag } from "lucide-react";

const AddToCartButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleOnClick = async () => {
    setIsLoading(true);
    await addItem(id);
    toast.success("Added to cart");
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <Button variant="default" className="w-full mt-5" onClick={handleOnClick}>
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing
      </Button>
    );
  }

  return (
    <Button variant="default" className="w-full mt-5" onClick={handleOnClick}>
      <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
    </Button>
  );
};

export default AddToCartButton;
