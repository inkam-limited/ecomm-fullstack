import { Card } from "@/components/ui/card";
import React from "react";
import { PayForm } from "./PayForm";
import Image from "next/image";

const page = () => {
  return (
    <main className="bg-gradient-to-b h-screen flex md:items-center justify-center from-indigo-700 to-violet-800">
      <Card className="container px-0 mx-auto bg-gray-800/90 backdrop-blur-lg rounded-xl overflow-hidden">
        <div className="flex flex-col-reverse md:grid md:grid-cols-[2fr_1fr] gap-4">
          <div className="px-8 py-12 text-gray-50">
            <h2 className="text-xl font-bold py-8">
              Checkout Information Page
            </h2>
            <PayForm />
          </div>
          <div className="relative w-full min-h-[300px]">
            <Image
              src="https://images.pexels.com/photos/920382/pexels-photo-920382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Image"
              fill
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-950 to-[84%]" />
          </div>
        </div>
      </Card>
    </main>
  );
};

export default page;
