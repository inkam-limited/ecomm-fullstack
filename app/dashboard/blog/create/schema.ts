import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  bannerImage: z.string().min(1, "Banner image is required"),
});
export type PostFormValues = z.infer<typeof postSchema>;
