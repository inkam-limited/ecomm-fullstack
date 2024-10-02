"use server";

import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PostFormValues } from "./schema";

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
  console.log(newPost);
  return { success: true, message: "Post created successfully" };
};
