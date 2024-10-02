import { z } from "zod";
import EditPostForm from "./editPostForm";
import prisma from "@/app/lib/db";

// Define Zod schema
const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  bannerImage: z.string().optional(),
});

export type PostFormValues = z.infer<typeof postSchema>;

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
