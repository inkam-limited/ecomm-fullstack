"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Share2,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProductImageSlider from "./product-image-slider";
import ProductPageTitle from "./product-page-title";

export default function ProductPageDisplay() {
  const [currentImage, setCurrentImage] = useState(0);
  const product = {
    name: "Taskie | Project Management UI Kit",
    creator: "Pixelbuddha",
    category: "UI Design",
    description:
      "Streamline your project workflow with this intuitive UI Kit. Taskie is designed for productivity.",
    price: 16000,
    originalPrice: 20000,
    discountPercentage: 20,
    finalPrice: 16000,
    image: "https://images.ui8.net/uploads/1_1726738471593.jpg",
    gallery: [
      "https://images.ui8.net/uploads/1_1726738471593.jpg",
      "https://images.ui8.net/uploads/1_1726738471593.jpg",
      "https://images.ui8.net/uploads/1_1726738471593.jpg",
    ],
    isFeatured: true,
    stock: 10,
    isAvailable: true,
    tags: [
      "UI Kit",
      "Productivity",
      "Project Management",
      "Design",
      "Workflow",
    ],
    variants: [
      {
        type: "License",
        options: ["Standard", "Extended"],
      },
    ],
    shippingInfo: {
      estimatedDelivery: "Instant Download",
      shippingCost: 0,
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="">
        <ProductPageTitle product={product} />

        {/* Product Images */}
        <ProductImageSlider data={product.gallery} />

        {/* Product Information */}
        <div className="space-y-6 mt-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold">
              ${(product.finalPrice / 100).toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  ${(product.originalPrice / 100).toFixed(2)}
                </span>
                <Badge variant="secondary">
                  {product.discountPercentage}% OFF
                </Badge>
              </>
            )}
          </div>

          <p className="text-sm">{product.description}</p>

          <div className="space-y-4">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select License" />
              </SelectTrigger>
              <SelectContent>
                {product.variants[0].options.map((option) => (
                  <SelectItem key={option} value={option.toLowerCase()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex space-x-2">
              <Button className="flex-1">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-4 space-y-2 text-sm">
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Stock:</strong> {product.stock} available
              </p>
              <p>
                <strong>Delivery:</strong>{" "}
                {product.shippingInfo.estimatedDelivery}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Button variant="outline" size="icon">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Instagram className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
