"use client";
import { createProduct } from "@/app/actions";
import { UploadDropzone } from "@/app/lib/uplaodthing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { useEffect, useState } from "react";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { MultiSelect } from "@/components/ui/multi-select";
import { fetchCategories } from "./actions";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";
type CreateProductFormValues = z.infer<typeof productSchema>;

export default function ProductCreateRoute() {
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [images, setImages] = useState<string[]>([]);
  const [productFile, setProductFile] = useState<string>("");
  console.log(productFile);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "Harmony Hub",
      description:
        "Harmony Hub is a comprehensive UX design pack that seamlessly blends aesthetics with functionality. This all-in-one toolkit empowers designers to create harmonious, user-centric digital experiences across various platforms and devices.",
      price: 50000,
      isFeatured: true,
      status: "published",
      category: [],
      images: [],
      productFile: "",
    },
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    setValue("productFile", productFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productFile]);

  const onSubmit = async (data: CreateProductFormValues) => {
    try {
      console.log(data);
      await createProduct(data);
      reset();
      setImages([]);
    } catch (error: any) {
      console.error("Error creating product:", error);
      toast.error(error?.message || "Failed to create product");
    }
  };

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            In this form you can create your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Product Name" />
                )}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Write your description right here..."
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="55"
                    value={field.value} // Ensure controlled component
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                )}
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              {errors.isFeatured && (
                <p className="text-red-500">{errors.isFeatured.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-red-500">{errors.status.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={categories}
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                    placeholder="Select categories"
                  />
                )}
              />
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <>
                    <input type="hidden" {...field} value={images} />
                    {images.length > 0 ? (
                      <div className="flex gap-5">
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className="relative w-[100px] h-[100px]"
                          >
                            <button
                              onClick={() => handleDelete(index)}
                              type="button"
                              className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                            >
                              <XIcon className="w-3 h-3" />
                            </button>
                            <Image
                              src={image}
                              alt={image}
                              width={100}
                              height={100}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <UploadDropzone
                        endpoint="imageUploader"
                        config={{ mode: "auto", appendOnPaste: true }}
                        onClientUploadComplete={(res) => {
                          const newImages = res.map((r) => r.url);
                          setImages(newImages);
                          field.onChange(newImages);
                        }}
                        onUploadError={() => {
                          alert("Something went wrong");
                        }}
                      />
                    )}
                  </>
                )}
              />
              {errors.images && (
                <p className="text-red-500">{errors.images.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label>Product File</Label>
              <Controller
                name="productFile"
                control={control}
                render={({ field }) => (
                  <>
                    <input type="hidden" {...field} value={productFile} />
                    {productFile.length > 0 ? (
                      <div className="flex gap-5">{<p>File added</p>}</div>
                    ) : (
                      <UploadDropzone
                        endpoint="productFileUploader"
                        onUploadProgress={(progress) => {
                          console.log(progress);
                        }}
                        config={{ mode: "auto" }}
                        onClientUploadComplete={(res) => {
                          setProductFile(res[0].url);
                          toast.success("File uploaded successfully");
                        }}
                        onUploadError={(err: Error) => {
                          toast.error("File upload failed");
                          throw new Error(`${err}`);
                        }}
                      />
                    )}
                  </>
                )}
              />
              {errors.productFile && (
                <p className="text-red-500">{errors.productFile.message}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Product" />
        </CardFooter>
      </Card>
    </form>
  );
}
