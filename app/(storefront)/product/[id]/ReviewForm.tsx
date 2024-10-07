"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React, { useState } from "react";
import { addReview } from "./action";
import { toast } from "sonner";

const ReviewForm = ({ productId }: { productId: string }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addReview({ productId, rating, comment });
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState("Beautiful product");
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="rating">Rating</Label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn("w-6 h-6 cursor-pointer", {
                "fill-yellow-500 text-yellow-500": star <= rating,
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
  );
};

export default ReviewForm;
