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
      cus_phone: "01865048207",
      desc: "Merchant payment",
      amount: Number(total_amount),
      currency: "BDT",
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

    try {
      await createPayment(null, formData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
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
            <p className="col-span-4 text-red-500">{errors.cus_name.message}</p>
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
            type="number"
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
              <span className="text-muted-foreground text-sm ">&#2547;</span>
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
            <p className="col-span-4 text-red-500">{errors.currency.message}</p>
          )}
        </div>
        <div className="flex justify-end mt-4">
          {isSubmitting || isSubmitSuccessful ? (
            <Button
              variant="default"
              className="flex w-full  items-center justify-center"
            >
              <RotatingLines
                visible={true}
                strokeColor="#fff"
                width="20"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </Button>
          ) : (
            <Button className="w-full" variant="default" type="submit">
              Submit Payment
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};
