import { z } from "zod";
import EditPostForm from "./editPostForm";
import prisma from "@/lib/db";

export default async function EditPost({ params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findFirst({
    where: {
      id: params.id,
    },
  });
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Create New Post</h1>
      <EditPostForm post={post} />
    </div>
  );
}
