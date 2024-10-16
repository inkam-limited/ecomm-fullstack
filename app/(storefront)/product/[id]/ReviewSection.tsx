import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import ReviewForm from "./ReviewForm";
import prisma from "@/lib/db";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default async function ProductReview({
  productId,
}: {
  productId: string;
}) {
  const productReviews = await prisma.review.findMany({
    where: {
      productId: productId,
    },
    include: {
      createdBy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">Product Reviews</CardTitle>
        <CardDescription>
          Share your thoughts about this product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReviewForm productId={productId} />
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Recent Reviews</h3>
          {productReviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : null}
          {productReviews.length > 0 &&
            productReviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold inline-flex items-center">
                        <Avatar>
                          <AvatarFallback>
                            {review.createdBy?.firstName.split("")[0]}
                          </AvatarFallback>
                        </Avatar>{" "}
                        <p className="ml-2 text-sm">
                          {review.createdBy?.firstName}
                        </p>
                      </span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn("w-4 h-4", {
                            "fill-yellow-500 text-yellow-500":
                              i < review.rating,
                            "text-gray-300": i >= review.rating,
                          })}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{review.comment}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Reviewed on {review.createdAt.toLocaleDateString("bn-BD")}
                  </p>
                </CardFooter>
              </Card>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
