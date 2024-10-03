"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";

import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { z } from "zod";
import {
  bannerSchema,
  categorySchema,
  PaymentSchema,
  productSchema,
} from "@/lib/zodSchemas";
import prisma from "@/lib/db";
import { Cart } from "@/lib/interfaces";
import { redis } from "@/lib/redis";
export async function createCategory(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: categorySchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.category.create({
    data: {
      name: submission.value.name.trim().toUpperCase(),
      description: submission.value.description,
      imageString:
        submission.value.imageString ??
        "https://placehold.jp/3d4070/ffffff/150x150.png",
    },
  });

  redirect("/dashboard");
}

export async function createProduct(data: any) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");

  try {
    const validatedData = productSchema.safeParse(data);
    if (!validatedData.success) {
      throw new Error(JSON.stringify(validatedData.error.errors));
    }

    const product = await prisma.product.create({
      data: {
        name: validatedData.data.name,
        description: validatedData.data.description,
        status: validatedData.data.status,
        price: validatedData.data.price,
        images: validatedData.data.images,
        isFeatured: validatedData.data.isFeatured ?? false, // Handle optional
        productFileLink: validatedData.data.productFile,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
        category: {
          connect: validatedData.data.category.map((categoryId: string) => ({
            id: categoryId,
          })),
        },
      },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(
      JSON.stringify({ message: "Failed to create product" }),
      { status: 500 }
    );
  } finally {
    return redirect("/dashboard/products");
  }
}

export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const productId = formData.get("productId") as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price,
      isFeatured: submission.value.isFeatured === true ? true : false,
      status: submission.value.status,
      images: flattenUrls,
    },
  });

  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });

  redirect("/dashboard/products");
}

export async function createBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect("/dashboard/banner");
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  await prisma.banner.delete({
    where: {
      id: formData.get("bannerId") as string,
    },
  });

  redirect("/dashboard/banner");
}

export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
    where: {
      id: productId,
    },
  });

  if (!selectedProduct) {
    throw new Error("No product with this id");
  }
  let myCart = {} as Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          price: selectedProduct.price,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          quantity: 1,
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }

      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1,
      });
    }
  }

  await redis.set(`cart-${user.id}`, myCart);

  revalidatePath("/", "layout");
}

export async function delItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const productId = formData.get("productId");

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updateCart);
  }

  revalidatePath("/bag");
}

export async function createPayment(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const userId = user.id;

  const transactionId = `${Date.now()}_${uuid()}`;
  let payment_url: string | null = null;

  const parsedData = PaymentSchema.parse(Object.fromEntries(formData));

  const order = await prisma.order.create({
    data: {
      amount: Number(parsedData.amount),
      payStatus: "pending",
      transactionId: transactionId,
      userId: userId, // Make sure userId is correct
    },
  });

  const paymentFormData = {
    cus_name: parsedData.cus_name,
    cus_email: parsedData.cus_email,
    cus_phone: parsedData.cus_phone,
    amount: parsedData.amount,
    tran_id: transactionId,
    signature_key: process.env.SIGNATURE_KEY,
    store_id: process.env.STORE_ID,
    currency: parsedData.currency,
    desc: parsedData.desc,
    cus_add1: "53, Gausul Azam Road, Sector-14, Dhaka, Bangladesh",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    success_url: `${process.env.BASE_URL}/api/callback?transactionId=${transactionId}`,
    fail_url: `${process.env.BASE_URL}/api/callback?transactionId=${transactionId}`,
    cancel_url: `${process.env.BASE_URL}/api/callback?transactionId=${transactionId}`,
    type: "json",
  };

  const { data } = await axios.post(
    "https://sandbox.aamarpay.com/jsonpost.php",
    { ...paymentFormData, desc: order.id },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (data.result !== "true") {
    let errorMessage = Object.values(data).join(". ");
    return { error: errorMessage };
  }

  payment_url = data.payment_url;
  if (!payment_url) {
    return { error: "Payment URL not found" };
  }

  redirect(payment_url);
}

export const getSearchSuggestions = async (searchTerm: string) => {
  const searchResults = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          category: {
            some: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      images: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return searchResults;
};

export const getConversionRate = async (fromCurrency: string) => {
  const conversionRate: Record<string, any> = await axios.get(
    `https://v6.exchangerate-api.com/v6/4092a624c9514b7db55a4c0b/latest/${
      fromCurrency === "USD" ? "BDT" : "USD"
    }`
  );

  return conversionRate["data"]["conversion_rates"]["USD"];
};
