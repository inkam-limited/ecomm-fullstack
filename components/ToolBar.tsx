import { Editor } from "@tiptap/react";
import { Heading, ListIcon, ListOrderedIcon } from "lucide-react";

function ToolBar({ editor }: { editor: Editor }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {/* Bold Button */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 pt-2 rounded ${
          editor.isActive("bold") ? "bg-gray-200" : ""
        }`}
        title="Bold (Ctrl+B)"
      >
        <b>B</b>
      </button>

      {/* Italic Button */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 pt-2 rounded ${
          editor.isActive("italic") ? "bg-gray-200" : ""
        }`}
        title="Italic (Ctrl+I)"
      >
        <i>I</i>
      </button>

      {/* Heading */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? "is-active pt-2" : "pt-2"
        }
      >
        <h2>
          <Heading />
        </h2>
      </button>
      {/* Heading */}

      {/* Bullet List Button */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 pt-2 rounded ${
          editor.isActive("bulletList") ? "bg-gray-200" : ""
        }`}
        title="Bullet List"
      >
        <ListOrderedIcon />
      </button>

      {/* Ordered List Button */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 pt-2 rounded ${
          editor.isActive("orderedList") ? "bg-gray-200" : ""
        }`}
        title="Ordered List"
      >
        <ListIcon />
      </button>
    </div>
  );
}

export default ToolBar;
