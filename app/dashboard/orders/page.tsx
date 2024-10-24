import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import Link from "next/link";
import { getPaymentDetails } from "./[transactionId]/action";
import { Suspense } from "react";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      transactionId: true,
      paidAmount: true,
      createdAt: true,
      status: true,
      id: true,
      User: {
        select: {
          firstName: true,
          email: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

const RenderStatus = async ({ transactionId }: { transactionId: string }) => {
  const data = await getPaymentDetails(transactionId);
  console.log(data);
  return <p>demo</p>;
};

export default async function OrdersPage() {
  const data = await getData();
  console.log(data);

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store!</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Provider Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="font-medium">{item.User?.firstName}</p>
                  <p className="hidden md:flex text-sm text-muted-foreground">
                    {item.User?.email}
                  </p>
                </TableCell>
                <TableCell>Order</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Suspense fallback={<p>Loading...</p>}>
                    <RenderStatus transactionId={item.transactionId} />
                  </Suspense>
                </TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("bn-BD").format(item.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  BDT {new Intl.NumberFormat("bn-BD").format(item.paidAmount)}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/dashboard/orders/${item.transactionId}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
