import { ImageSlider } from "@/components/storefront/ImageSlider";
import { JSONContent } from "@tiptap/react";
import { StarIcon, Download, Star, User } from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import ProductCardDisplay from "@/components/product-cards";
import ProductDescription from "@/components/ProductDescription";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AddToCartButton from "@/components/storefront/add-to-cart-button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // shadcn tabs

import { useState } from "react"; // For handling form state
import ProductReview from "./ReviewSection";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

async function getData(productId: string, userId: string | null) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
      productFileLink: true,
    },
  });

  if (!data) {
    return notFound();
  }

  let hasOrdered = false;
  if (userId) {
    const order = await prisma.order.findFirst({
      where: {
        userId: userId,
        status: "paid",
        OrderItem: {
          some: {
            productId: productId,
          },
        },
      },
    });
    hasOrdered = order !== null;
  }

  return { ...data, hasOrdered };
}

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(params.id, user?.id || null);

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 items-start py-6">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900">&#2547;{data.price}</p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            {/* More stars */}
          </div>

          <div className="mt-6 space-y-4">
            <AddToCartButton id={data.id} />
            {/* Product file download if available */}
          </div>
          {data.hasOrdered && (
            <div className="mt-4 space-y-4">
              <Link
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full"
                )}
                href={data.productFileLink!}
              >
                <Download className="mr-2" />
                Download File
              </Link>
              <p className=" text-green-500">
                You have already purchased this product
              </p>
            </div>
          )}

          <Tabs defaultValue="description" className="mt-6">
            <TabsList className="w-full grid grid-cols-2 my-4 gap-4 bg-white">
              <TabsTrigger
                className="data-[state=active]:border-b-2 data-[state=active]:border-b-blue-600"
                value="description"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:border-b-2 data-[state=active]:border-b-blue-600"
                value="reviews"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <ProductDescription content={data?.description as JSONContent} />
            </TabsContent>
            <TabsContent value="reviews">
              <ProductReview productId={data.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="container mx-auto">
        <ProductCardDisplay
          limit={4}
          title="Featured Products"
          link="/featured"
        />
      </div>
    </>
  );
}
