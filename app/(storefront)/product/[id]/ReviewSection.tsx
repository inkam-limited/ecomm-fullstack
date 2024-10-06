"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductReview() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const exampleReviews = [
    {
      id: 1,
      createdBy: { name: "John Doe" },
      rating: 4,
      comment: "Great product!",
      createdAt: "2023-10-06",
    },
    // More reviews...
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Product Reviews</CardTitle>
        <CardDescription>
          Share your thoughts about this product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn("w-6 h-6 cursor-pointer", {
                    "fill-primary text-primary": star <= rating,
                    "text-gray-300": star > rating,
                  })}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here..."
            />
          </div>
          <Button type="submit">Submit Review</Button>
        </form>
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Recent Reviews</h3>
          {exampleReviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">
                      {review.createdBy.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn("w-4 h-4", {
                          "fill-primary text-primary": i < review.rating,
                          "text-gray-300": i >= review.rating,
                        })}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{review.comment}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Reviewed on {review.createdAt}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
