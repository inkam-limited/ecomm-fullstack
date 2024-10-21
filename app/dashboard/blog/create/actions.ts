"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PostFormValues } from "./schema";
import prisma from "@/lib/db";

export const createPost = async ({
  title,
  content,
  bannerImage,
}: PostFormValues) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("Unauthorized");

  const newPost = await prisma.blogPost.create({
    data: {
      title,
      content,
      coverImage: bannerImage,
      createdBy: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  return { success: true, message: "Post created successfully" };
};
