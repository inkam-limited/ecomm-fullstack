import React from "react";
import { Html, Button } from "@react-email/components";

export const InvoiceEmail = ({
  client,
  invoice,
}: {
  client: Record<string, any>;
  invoice: Record<string, any>;
}) => {
  return (
    <Html>
      <div className="max-w-xl mx-auto p-4 bg-gray-100 rounded-lg">
        <header className="text-center mb-4">
          <h1 className="text-2xl font-bold">Invoice</h1>
          <p className="text-sm text-gray-500">
            Payment Date: {invoice.paymentDate}
          </p>
          <p className="text-sm text-gray-500">
            Service Delivery Date: {invoice.deliveryDate}
          </p>
        </header>

        <section className="mb-6">
          <h2 className="text-lg font-semibold">Client Details</h2>
          <p>Name: {client.name}</p>
          <p>Email: {client.email}</p>
          <p>Phone: {client.phone}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold">Invoice Details</h2>
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Item Name</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Unit Price (BDT)</th>
                <th className="py-2">Total Price (BDT)</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map(
                ({
                  item,
                  index,
                }: {
                  item: {
                    name: string;
                    quantity: number;
                    unitPrice: number;
                    totalPrice: number;
                  };
                  index: number;
                }) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">{item.unitPrice}</td>
                    <td className="py-2">{item.totalPrice}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <div className="mt-4">
            <p className="font-semibold">Total Amount: {invoice.totalAmount}</p>
            <p className="italic">In Words: {invoice.amountInWords}</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold">Terms & Conditions</h2>
          <ul className="list-disc pl-5">
            {invoice.terms.map(
              ({ term, index }: { term: string; index: number }) => (
                <li key={index} className="text-sm">
                  {term}
                </li>
              )
            )}
          </ul>
        </section>

        <footer className="text-center mt-6 text-gray-500 text-sm">
          <p>If you have any questions, contact us at {client.email}</p>
        </footer>
      </div>
    </Html>
  );
};
