import { ImageSlider } from "@/components/storefront/ImageSlider";
import { JSONContent } from "@tiptap/react";
import { Download, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import ProductCardDisplay from "@/components/product-cards";
import ProductDescription from "@/components/ProductDescription";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AddToCartButton from "@/components/storefront/add-to-cart-button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductReview from "./ReviewSection";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Review } from "@prisma/client";

// New Star Rating Component
// StarRating Component
interface StarRatingProps {
  rating: number;
  reviews: { rating: number }[];
  showCount?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviews,
  showCount = true,
}) => {
  const roundedRating = Math.round(rating * 10) / 10;

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const starPosition = index + 1;

          // Fill amount for each star
          const fillAmount = Math.min(Math.max(roundedRating - index, 0), 1);
          const fillPercentage = Math.round(fillAmount * 100);

          return (
            <div key={starPosition} className="relative w-5 h-5">
              {/* Empty Star */}
              <Star
                className="absolute w-5 h-5 text-gray-300"
                strokeWidth={1.5}
              />

              {/* Filled Star based on fillAmount */}
              {fillPercentage > 0 && (
                <div
                  style={{
                    clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
                  }}
                  className="absolute w-5 h-5 overflow-hidden"
                >
                  <Star
                    className="text-yellow-400 fill-yellow-400"
                    strokeWidth={1.5}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showCount && reviews.length > 0 && (
        <span className="text-sm text-gray-600">
          {roundedRating.toFixed(1)} ({reviews.length}{" "}
          {reviews.length === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
};
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
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  const averageRating = data.reviews.length
    ? data.reviews.reduce((acc, review) => acc + review.rating, 0) /
      data.reviews.length
    : 0;

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

  return { ...data, hasOrdered, averageRating };
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
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-xl mt-2 text-gray-900">&#2547;{data.price}</p>
          <div className="mt-3">
            {data.reviews.length === 0 && (
              <p>This product has no reviews yet</p>
            )}
            <StarRating rating={data.averageRating} reviews={data.reviews} />
          </div>

          <div className="mt-6 space-y-4">
            <AddToCartButton user={user} id={data.id} />
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
              <p className="text-green-500">
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
