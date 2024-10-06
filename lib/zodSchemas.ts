import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string().min(10, { message: "Description is required" }),
  status: z.enum(["draft", "published", "archived"]),
  price: z.number().min(1),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.array(z.string()).min(1, "At least one category is required"),
  isFeatured: z.boolean().optional(),
  productFile: z.string().min(1, "You need to add the product file"),
});
export const PaymentSchema = z.object({
  cus_name: z.string().min(1, "Name is required"),
  cus_email: z.string().email("Invalid email address"),
  cus_phone: z.string().min(10, "Phone number must be at least 10 digits"),
  cus_add1: z.string().min(1, "Address line 1 is required"),
  cus_add2: z.string(),
  cus_city: z.string().min(1, "City is required"),
  cus_country: z.string().min(1, "Country is required"),
  amount: z.union([
    z.number({ message: "Amount must be a number" }),
    z.string({ message: "Amount must be a string" }),
  ]),
  paid_amount: z.union([
    z.number({ message: "Amount must be a number" }),
    z.string({ message: "Amount must be a string" }),
  ]),
  desc: z.string().min(1, "Description is required"),
  currency: z.enum(["BDT", "USD"]),
});

export const categorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  imageString: z.string().optional(),
});

export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
});
