import { z } from "zod";

export const ImageFormSchema = z.object({
  images: z.any(),
  caption: z
    .string()
    .min(1, "Caption is required")
    .max(255, "Caption must be 255 characters or less"),
});

export type ImageFormData = z.infer<typeof ImageFormSchema>;
