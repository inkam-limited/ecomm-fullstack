"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitPayment } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

// Payment Submission Form Schema
export const paymentSubmissionSchema = z.object({
  cus_name: z.string().min(1, "Name is required"),
  cus_email: z.string().email("Invalid email address"),
  cus_phone: z.string().min(1, "Phone number is required"),
  cus_add1: z.string().min(1, "Zip code is required"),
  amount: z.string().min(1, "Amount is required"),
  currency: z.string().length(3, "Currency must be 3 characters"),
  transactionId: z.string().min(1, "Transaction ID is required"),
});

const PaymentSubmissionForm = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function onPaymentSubmissionSubmit(
    values: z.infer<typeof paymentSubmissionSchema>
  ) {
    try {
      setIsSubmitting(true);
      await submitPayment(values);
      toast.message("Redirecting to payment page");
      setIsSubmitting(false);
    } catch (error: any) {
      setIsSubmitting(false);
      toast.error(error);
    }
  }

  const paymentSubmissionForm = useForm<
    z.infer<typeof paymentSubmissionSchema>
  >({
    resolver: zodResolver(paymentSubmissionSchema),
    defaultValues: {
      cus_name: "Some Name",
      cus_email: "johndoe@example.com",
      cus_phone: "1234567890",
      cus_add1: "NRB",
      amount: "1000",
      currency: "BDT",
      transactionId: transactionId,
    },
  });

  return (
    <div className="max-w-3xl mx-auto pt-12">
      <Card>
        <CardHeader>
          <CardTitle>Payment Submission Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...paymentSubmissionForm}>
            <form
              onSubmit={paymentSubmissionForm.handleSubmit(
                onPaymentSubmissionSubmit
              )}
              className="space-y-4"
            >
              <FormField
                control={paymentSubmissionForm.control}
                name="cus_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={paymentSubmissionForm.control}
                name="cus_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={paymentSubmissionForm.control}
                name="cus_add1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="16222" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={paymentSubmissionForm.control}
                name="cus_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={paymentSubmissionForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="50.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={paymentSubmissionForm.control}
                name="currency"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
              {isSubmitting ? (
                <Button className="w-full" type="submit" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </Button>
              ) : (
                <Button className="w-full" type="submit">
                  Submit Payment
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSubmissionForm;
