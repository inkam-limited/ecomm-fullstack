import prisma from "@/app/lib/db";
import ProductDescription from "@/components/ProductDescription";
import React from "react";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";
import BlogArticle from "./blog-article";
import { notFound } from "next/navigation";
import { JsonValue } from "@prisma/client/runtime/library";

export type BlogPostWithCreator = {
  id: string;
  title: string;
  content: JsonValue;
  createdAt: Date;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
  coverImage: string;
};

const PostPage = async ({
  params,
}: {
  params: { name: string; id: string };
}) => {
  const post = await prisma.blogPost.findUnique({
    where: {
      id: params.id,
    },
    include: {
      createdBy: true,
    },
  });
  if (!post) {
    return notFound();
  }

  return (
    <div className="container mx-auto mt-10 px-2">
      <BlogArticle post={post} />
      {/* <div className="flex flex-col items-center justify-center gap-4 py-10">
        <h2 className="text-3xl font-semibold">{post?.title}</h2>
        <div className="flex gap-2">
          <span className="italic text-blue-600">
            Written by {post?.createdBy.firstName}
          </span>
          on
          <p className="text-center">{post?.createdAt.toDateString()}</p>
        </div>
      </div>
      <div className="relative w-full aspect-h-4 aspect-w-6 rounded-lg mb-4">
        <Image
          src={post?.coverImage!}
          alt="Post Cover Image"
          fill
          className="object-cover"
        />
      </div>
      <ProductDescription content={post?.content as JSONContent} /> */}
    </div>
  );
};

export default PostPage;
