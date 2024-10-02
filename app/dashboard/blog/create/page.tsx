"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/app/lib/uplaodthing";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm, UseFormReturn } from "react-hook-form";
import Tiptap from "@/components/Tiptap";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  bannerImage: z.string().min(1, "Banner image is required"),
});

export type PostFormValues = z.infer<typeof postSchema>;

export default function NewPost() {
  const router = useRouter();

  // Setup React Hook Form with Zod
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "<p>Start writing your post here!</p>",
      bannerImage: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: PostFormValues) => {
    const res = await createPost(data);
    if (res.success) {
      router.push("/dashboard/blog");
      toast.success("Post created successfully!");
    } else {
      toast.error("Error creating post");
    }
  };

  // Optimize image rendering logic
  const renderBannerImage = (form: UseFormReturn<PostFormValues>) => {
    return form.getValues("bannerImage") ? (
      <Image
        className="py-4"
        src={form.getValues("bannerImage")}
        alt="banner"
        width={150}
        height={150}
      />
    ) : (
      <UploadDropzone
        endpoint="blogImageUploader"
        config={{ mode: "auto", appendOnPaste: true }}
        onClientUploadComplete={(res) => {
          const newImage = res.map((r) => r.url);
          form.setValue("bannerImage", newImage[0]);
        }}
        onUploadError={() => {
          form.setError("bannerImage", {
            type: "onChange",
            message: "Image upload failed",
          });
        }}
      />
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Create New Post</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog title" {...field} />
                </FormControl>
                <FormDescription>
                  This will be the title of your blog post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Tiptap description={field.value} onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  This will be the content of your blog post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {renderBannerImage(form)}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
