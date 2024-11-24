import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import { BatteryWarning } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: { transactionId: string };
}) => {
  const { transactionId } = searchParams;

  try {
    // Check if the transaction exists and is pending
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!existingTransaction) {
      console.error("Transaction not found");
      return <ErrorCard message="Transaction not found. Please try again." />;
    }

    if (existingTransaction.status !== "pending") {
      console.error("Transaction is not pending");
      return (
        <ErrorCard message="Transaction is not pending. Please try again." />
      );
    }

    // Update the transaction status to 'cancelled'
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { status: "failed" },
    });

    console.log("Transaction cancelled", updatedTransaction);
    return (
      <SuccessCard message="Payment failed. Product was not purchased. Please try again." />
    );
  } catch (error) {
    console.error("Error updating transaction:", error);
    return (
      <ErrorCard message="An error occurred while processing your request. Please try again." />
    );
  }
};

// Component to display error messages
const ErrorCard = ({ message }: { message: string }) => (
  <section className="w-full min-h-[80vh] flex items-center justify-center">
    <Card className="w-[350px]">
      <div className="p-6">
        <div className="w-full flex justify-center">
          <BatteryWarning className="w-12 h-12 rounded-full bg-red-500/30 text-red-500 p-2" />
        </div>
        <div className="mt-3 text-center sm:mt-5 w-full">
          <h3 className="text-lg leading-6 font-medium">Error</h3>
          <p className="mt-2 text-sm text-muted-foreground">{message}</p>
          <Button asChild className="w-full mt-5 sm:mt-6">
            <Link href="/paynow">Try again</Link>
          </Button>
        </div>
      </div>
    </Card>
  </section>
);

// Component to display success messages
const SuccessCard = ({ message }: { message: string }) => (
  <section className="w-full min-h-[80vh] flex items-center justify-center">
    <Card className="w-[350px]">
      <div className="p-6">
        <div className="w-full flex justify-center">
          <BatteryWarning className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
        </div>
        <div className="mt-3 text-center sm:mt-5 w-full">
          <h3 className="text-lg leading-6 font-medium">Payment Status</h3>
          <p className="mt-2 text-sm text-muted-foreground">{message}</p>
          <Button asChild className="w-full mt-5 sm:mt-6">
            <Link href="/paynow">Try again</Link>
          </Button>
        </div>
      </div>
    </Card>
  </section>
);

export default Page;
