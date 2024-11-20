import { z } from "zod";

export const ImageFormSchema = z.object({
  images: z.any(),
  caption: z
    .string()
    .min(1, "Caption is required")
    .max(255, "Caption must be 255 characters or less"),
});

export type ImageFormData = z.infer<typeof ImageFormSchema>;

export type PaymentApiRequestBody = {
  store_id: string; // Your Merchant ID, provided by aamarPay
  signature_key: string; // Signature Key issued by aamarPay
  tran_id: string; // Unique identification number or order ID, max length 32 characters
  amount: number; // Total payment amount, numerical value only
  currency: string; // Currency in uppercase letters (e.g., "USD" or "BDT")
  desc: string; // Description or notes related to the payment
  cus_name: string; // Customer's full name
  cus_email: string; // Customer's email address
  cus_phone: string; // Customer's phone number
  success_url: string; // URL for redirection after successful payment
  fail_url: string; // URL for redirection after failed payment
  cancel_url: string; // URL to return customers to the product or home page
  type: string; // Always "json"
  cus_add1?: string; // Optional customer address (e.g., street)
};
