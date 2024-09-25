"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionFormLayout } from "./TransactionFormLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Define schema for Zod validation
const paymentSchema = z.object({
  cus_name: z.string().min(1, { message: "Name is required" }),
  cus_email: z.string().email({ message: "Invalid email address" }),
  cus_phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  amount: z.number().positive({ message: "Amount must be greater than zero" }),
  desc: z.string().min(1, { message: "Description is required" }),
  currency: z.enum(["BDT", "USD"], { required_error: "Currency is required" }),
});

// Define the type-safe form data using Zod's inference
export type PaymentFormData = z.infer<typeof paymentSchema>;

const PaymentForm = ({
  amount,
  userId,
}: {
  amount: number;
  userId: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cus_name: "John Doe",
      cus_email: "john.doe@example.com",
      cus_phone: "1234567890",
      desc: "Test payment",
      amount,
      currency: "BDT",
    },
  });

  const onSubmit = async (data: PaymentFormData) => {
    try {
      const response = await fetch("/api/payment?userId=" + userId, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const paymentUrl = await response.json();
        window.location.href = paymentUrl.payment_url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TransactionFormLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 text-center">
            <Label htmlFor="cus_name" className="text-right uppercase">
              Name
            </Label>
            <Input
              id="cus_name"
              {...register("cus_name")}
              className="col-span-3"
            />
            {errors.cus_name && (
              <p className="col-span-4 text-red-500">
                {errors.cus_name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4 text-center">
            <Label htmlFor="cus_email" className="text-right uppercase">
              Email
            </Label>
            <Input
              id="cus_email"
              {...register("cus_email")}
              className="col-span-3"
            />
            {errors.cus_email && (
              <p className="col-span-4 text-red-500">
                {errors.cus_email.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4 text-center">
            <Label htmlFor="cus_phone" className="text-right uppercase">
              Phone
            </Label>
            <Input
              id="cus_phone"
              {...register("cus_phone")}
              className="col-span-3"
            />
            {errors.cus_phone && (
              <p className="col-span-4 text-red-500">
                {errors.cus_phone.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4 text-center">
            <Label htmlFor="amount" className="text-right uppercase">
              Amount
            </Label>
            <div className="flex items-center gap-x-2">
              <span>
                <span className="text-muted-foreground text-sm ">$</span>
              </span>
              <Input
                disabled
                type="number"
                {...register("amount")}
                className="col-span-3 font-bold border-none"
              />
            </div>
            {errors.amount && (
              <p className="col-span-4 text-red-500">{errors.amount.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4 text-center">
            <Label htmlFor="desc" className="text-right uppercase">
              Description
            </Label>
            <Input id="desc" {...register("desc")} className="col-span-3" />
            {errors.desc && (
              <p className="col-span-4 text-red-500">{errors.desc.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4 text-center">
            <Label htmlFor="currency" className="text-right uppercase">
              Currency
            </Label>
            <Input
              id="currency"
              defaultValue="BDT"
              {...register("currency")}
              className="col-span-3"
            />
            {errors.currency && (
              <p className="col-span-4 text-red-500">
                {errors.currency.message}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button type="submit" className="btn btn-primary">
              Submit Payment
            </button>
          </div>
        </div>
      </form>
    </TransactionFormLayout>
  );
};

export default PaymentForm;
