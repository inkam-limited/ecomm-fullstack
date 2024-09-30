"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "./actions";
import Tiptap from "@/components/Tiptap";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost({ title, content });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="w-full border rounded px-2 py-1 mb-4"
        />
        <Tiptap description={content} onChange={setContent} />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
