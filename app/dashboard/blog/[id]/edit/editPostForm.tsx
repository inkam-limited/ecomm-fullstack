"use client";
import { UploadDropzone } from "@/app/lib/uplaodthing";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import { createPost } from "../../create/actions";
import { PostFormValues, postSchema } from "../../create/page";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/Tiptap";
import { BlogPost } from "@prisma/client";

const EditPostForm = ({ post }: { post: BlogPost }) => {
  const [bannerImage, setBannerImage] = useState<string>("");
  const router = useRouter();

  // Setup React Hook Form with Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      content: `${post.content}`,
      bannerImage: post.coverImage,
    },
  });

  const onSubmit = async (data: PostFormValues) => {
    const postData = { ...data, bannerImage };
    const res = await createPost(postData);
    if (res.success) {
      router.push("/dashboard/blog");
      toast.success("Post created successfully!");
    } else {
      toast.error("Error creating post");
    }
  };

  console.log();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title Input */}
      <Input
        type="text"
        placeholder="Post Title"
        {...register("title")}
        className="w-full border rounded px-2 py-1 mb-4"
      />
      {errors.title && <p className="text-red-600">{errors.title.message}</p>}

      {/* Tiptap for content */}
      <Tiptap
        description=""
        onChange={(content) => setValue("content", content)}
      />
      {errors.content && (
        <p className="text-red-600">{errors.content.message}</p>
      )}

      {/* Upload Image Section */}
      {bannerImage ? (
        <Image
          className="py-4"
          src={bannerImage}
          alt="banner"
          width={100}
          height={100}
        />
      ) : (
        <UploadDropzone
          endpoint="blogImageUploader"
          config={{ mode: "auto", appendOnPaste: true }}
          onClientUploadComplete={(res) => {
            const newImage = res.map((r) => r.url);
            setBannerImage(newImage[0]);
          }}
          onUploadError={() => {
            alert("Something went wrong");
          }}
        />
      )}

      {/* Submit Button */}
      <Button type="submit">Create Post</Button>
    </form>
  );
};

export default EditPostForm;
