import prisma from "@/lib/db";
import { Cart } from "@/lib/interfaces";
import { redis } from "@/lib/redis";

import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const pay_status = formData.get("pay_status")?.toString();
  const cus_name = formData.get("cus_name")?.toString();
  const cus_phone = formData.get("cus_phone")?.toString();
  const cus_email = formData.get("cus_email")?.toString();
  const currency = formData.get("currency")?.toString();
  const pay_time = formData.get("pay_time")?.toString();
  const amount = formData.get("amount")?.toString();
  const transactionId = request.nextUrl.searchParams.get("transactionId") || "";
  if (!transactionId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!pay_status || !cus_name || !cus_phone || !cus_email || !currency) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: {
      transactionId,
    },
    data: {
      payStatus: pay_status,
      status: pay_status === "Successful" ? "paid" : "pending",
    },
  });
  console.log("Order updated:", order);
  let cart: Cart | null = await redis.get(`cart-${order.userId}`);

  const updateOrderItems = cart?.items.map((item) => {
    return {
      quantity: item.quantity,
      price: item.price,
      productId: item.id,
    };
  });
  if (updateOrderItems) {
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        OrderItem: {
          // Changed from 'OrderItem' to 'orderItems'
          create: updateOrderItems,
        },
      },
    });
  }

  await redis.del(`cart-${order.userId}`);
  redirect(`/payment/success?orderId=${order.id}`);
}
