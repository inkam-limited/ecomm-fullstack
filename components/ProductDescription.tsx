"use client";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const ProductDescription = ({ content }: { content: JSONContent }) => {
  const editor = useEditor({
    content,
    extensions: [StarterKit],
    editable: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
};

export default ProductDescription;
