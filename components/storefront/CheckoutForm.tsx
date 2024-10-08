"use client";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createPayment, getConversionRate } from "@/app/actions";
import { RotatingLines } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentSchema } from "@/lib/zodSchemas";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";

export type PaymentFormData = z.infer<typeof PaymentSchema>;
export const PaymentForm = ({
  total_amount,
  name,
  email,
}: {
  total_amount: number;
  name: string;
  email: string;
  userId: string;
}) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,

    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      cus_name: name,
      cus_email: email,
      cus_phone: "",
      cus_add1: "",
      cus_add2: "",
      cus_city: "",
      cus_country: "",
      desc: "Merchant payment",
      amount: Number(total_amount),
      currency: "BDT",
      paid_amount: Number(total_amount),
    },
  });

  const handleConversion = async (currency: string, amount: number) => {
    const conversionRate: Record<string, any> = await getConversionRate(
      getValues("currency")
    );
    console.log("amount", total_amount);
    const price =
      currency === "USD"
        ? Number(amount) * Number(conversionRate)
        : total_amount;
    setValue("amount", price.toFixed(1));
  };

  const selectedCurrency = watch("currency");
  useEffect(() => {
    handleConversion(selectedCurrency, Number(getValues("amount")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrency]);

  const onSubmit = async (data: z.infer<typeof PaymentSchema>) => {
    const formData = new FormData();

    formData.append("cus_name", data.cus_name);
    formData.append("cus_email", data.cus_email);
    formData.append("cus_phone", data.cus_phone);
    formData.append("amount", data.amount.toString());
    formData.append("desc", data.desc);
    formData.append("currency", data.currency);
    formData.append("paid_amount", data.paid_amount.toString());
    formData.append("cus_add1", data.cus_add1);
    formData.append("cus_add2", data.cus_add2);
    formData.append("cus_city", data.cus_city);
    formData.append("cus_country", data.cus_country);

    try {
      await createPayment(null, formData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-h-[70vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cus_name">Name</Label>
          <Input
            id="cus_name"
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
            id="cus_phone"
            placeholder="+xxxxxxxxxxxxx"
            {...register("cus_phone")}
          />
          {errors.cus_phone && (
            <p className="text-sm text-red-500">{errors.cus_phone.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cus_add1">Address Line 1</Label>
          <Input
            placeholder="Al Meel St."
            id="cus_add1"
            {...register("cus_add1")}
          />
          {errors.cus_add1 && (
            <p className="text-sm text-red-500">{errors.cus_add1.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cus_add2">Address Line 2 (Optional)</Label>
          <Input
            id="cus_add2"
            placeholder="Apt. #123"
            {...register("cus_add2")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cus_city">City</Label>
          <Input
            id="cus_city"
            placeholder="Abu Dhabi"
            {...register("cus_city")}
          />
          {errors.cus_city && (
            <p className="text-sm text-red-500">{errors.cus_city.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cus_country">Country</Label>
          <Input
            id="cus_country"
            placeholder="United Arab Emirates"
            {...register("cus_country")}
          />
          {errors.cus_country && (
            <p className="text-sm text-red-500">{errors.cus_country.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Badge className="ml-2"> {selectedCurrency} </Badge>
          <Input
            disabled
            id="amount"
            type="text"
            {...register("amount", { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Input id="desc" disabled {...register("desc")} />
          {errors.desc && (
            <p className="text-sm text-red-500">{errors.desc.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
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
