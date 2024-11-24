"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { PaymentSubmissionSchema } from "@/lib/zodSchemas";
import { createStorePayment } from "./actions";

export type PaymentFormData = z.infer<typeof PaymentSubmissionSchema>;

export const PayForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentSubmissionSchema),
    defaultValues: {
      cus_name: "",
      cus_email: "",
      cus_phone: "",
      cus_add1: "",
      amount: "",
      currency: "BDT",
    },
  });

  const onSubmit = async (data: PaymentFormData) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("cus_name", data.cus_name);
    formData.append("cus_email", data.cus_email);
    formData.append("cus_phone", data.cus_phone);
    formData.append("cus_add1", data.cus_add1);
    formData.append("amount", data.amount.toString());
    formData.append("currency", data.currency);

    try {
      await createStorePayment(null, formData);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Payment submission error:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-h-[500px]">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="cus_name">Name</Label>
          <Input
            id="cus_name"
            className="text-gray-800"
            placeholder="John Doe"
            {...register("cus_name")}
          />
          {errors.cus_name && (
            <p className="text-sm text-red-500">{errors.cus_name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cus_email">Email</Label>
          <Input
            id="cus_email"
            className="text-gray-800"
            placeholder="yourname@example.com"
            type="email"
            {...register("cus_email")}
          />
          {errors.cus_email && (
            <p className="text-sm text-red-500">{errors.cus_email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cus_phone">Phone</Label>
          <Input
            className="text-gray-800"
            id="cus_phone"
            type="text"
            placeholder="+1234567890"
            {...register("cus_phone")}
          />
          {errors.cus_phone && (
            <p className="text-sm text-red-500">{errors.cus_phone.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cus_add1">Area zip</Label>
          <Input
            type="text"
            className="text-gray-800"
            placeholder="16223"
            {...register("cus_add1")}
          />
          {errors.cus_phone && (
            <p className="text-sm text-red-500">{errors.cus_add1?.message}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="space-y-2 basis-3/4">
            <Label htmlFor="amount">Amount</Label>
            <Input
              className="text-gray-800"
              id="amount"
              type="text"
              {...register("amount")}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>
          <div className="space-y-2 basis-1/4">
            <Label htmlFor="currency">Currency</Label>
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="text-gray-800">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent className="text-gray-800">
                    <SelectItem value="BDT">BDT</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.currency && (
              <p className="text-sm text-red-500">{errors.currency.message}</p>
            )}
          </div>
        </div>
      </div>
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing
          </>
        ) : (
          "Submit Payment"
        )}
      </Button>
    </form>
  );
};
