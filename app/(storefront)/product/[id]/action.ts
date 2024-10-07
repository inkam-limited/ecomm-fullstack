"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

const reviewSchema = z.object({
  productId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
});

export type ReviewFormValue = z.infer<typeof reviewSchema>;

export async function addReview(data: ReviewFormValue) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id)
    return { success: false, message: "You need to login to post a review" };

  const product = await prisma.product.findUnique({
    where: {
      id: data.productId,
    },
  });

  if (!product) return { success: false, message: "Failed to create review" };

  const review = await prisma.review.create({
    data: {
      rating: data.rating,
      comment: data.comment,
      productId: data.productId,
      createdById: user.id,
    },
  });

  if (!review) return { success: false, message: "Failed to create review" };

  console.log(review);
  revalidatePath(`/product/${review.productId}`);
  return { success: true, message: "Review added successfully" };
}
