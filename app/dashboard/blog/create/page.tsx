"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "./actions";
import Tiptap from "@/components/Tiptap";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/app/lib/uplaodthing";
import Image from "next/image";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bannerImage, setBannerImage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost({ title, content, bannerImage });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="w-full border rounded px-2 py-1 mb-4"
        />
        <Tiptap description={content} onChange={setContent} />
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
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  );
}
