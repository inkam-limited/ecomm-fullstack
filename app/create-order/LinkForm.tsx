"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductSelect from "./ProductSelect";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { generatePaymentLink } from "./actions";
import { toast } from "sonner";
import { LinkDialog } from "./LinkDialog";
import { Loader2 } from "lucide-react";

// Payment Link Generation Form Schema
export const paymentLinkSchema = z.object({
  productId: z.string().min(1, "Product is required"),
});

export default function LinkForm({ products }: { products: Product[] }) {
  const [selectedProd, setSelectedProd] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [link, setLink] = useState("");

  toast.warning("First select a product", { duration: 1000, richColors: true });

  const paymentLinkForm = useForm<z.infer<typeof paymentLinkSchema>>({
    resolver: zodResolver(paymentLinkSchema),
    defaultValues: {
      productId: selectedProd,
    },
  });

  useEffect(() => {
    if (selectedProd) {
      paymentLinkForm.setValue("productId", selectedProd);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProd]);
  async function onPaymentLinkSubmit(
    values: z.infer<typeof paymentLinkSchema>
  ) {
    if (!selectedProd) {
      toast.warning("Please select a product");
    }
    try {
      const data = await generatePaymentLink(values);
      if (data.success) {
        setSubmitting(true);
        if (data.link) {
          setLink(data.link);
          setOpenLink(true);
          setSubmitting(false);
        }
      } else {
        setSubmitting(false);
        toast.error(data.error);
      }
    } catch (error: any) {
      setSubmitting(false);
      toast.error(error.message);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Link Generation Form</CardTitle>
          <CardDescription>
            Generate a payment link for your customer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...paymentLinkForm}>
            <form
              onSubmit={paymentLinkForm.handleSubmit(onPaymentLinkSubmit)}
              className="space-y-4"
            >
              <ProductSelect products={products} prodSelect={setSelectedProd} />
              <Button className="w-full" type="submit">
                {!submitting && "Generate Link"}
                {submitting && (
                  <span>
                    Loading
                    <Loader2 className="ml-2" />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <LinkDialog link={link} setOpenLink={setOpenLink} openLink={openLink} />
    </div>
  );
}
