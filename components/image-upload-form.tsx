"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema validation using Zod
const schema = z.object({
  files: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "At least one image is required",
    })
    .refine(
      (files) =>
        Array.from(files as File[]).every((file) =>
          file.type.startsWith("image/")
        ),
      {
        message: "Only images are allowed",
      }
    ),
  caption: z.string().min(1, "Caption is required"),
  productId: z.string().min(1, "Product ID is required"),
});

type FormData = z.infer<typeof schema>;

export default function ImageUploadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Convert file to base64
  const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const files = data.files as FileList;
      const base64Files = await Promise.all(
        Array.from(files).map((file) => fileToBase64(file))
      );

      // Prepare JSON payload
      const payload = {
        files: base64Files, // Array of base64 strings
        caption: data.caption,
        productId: data.productId,
      };

      // Send the JSON payload
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log(result);

      if (result.success) {
        alert("Image uploaded successfully");
      } else {
        console.error("Upload failed:", result.error);
      }
    } catch (error) {
      console.error("Error in file processing:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" multiple {...register("files")} />
      {errors.files && <span>{errors.files.message?.toString()}</span>}

      <input type="text" placeholder="Caption" {...register("caption")} />
      {errors.caption && <span>{errors.caption.message}</span>}

      <input type="text" placeholder="Product ID" {...register("productId")} />
      {errors.productId && <span>{errors.productId.message}</span>}

      <button type="submit">Upload Image</button>
    </form>
  );
}
