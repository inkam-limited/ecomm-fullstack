import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface pageProps {
  data: string[];
}

const ProductImageSlider = ({ data }: pageProps) => {
  return (
    <Carousel className="mt-5 w-full mx-auto">
      <CarouselContent>
        {data.map((item, index: number) => (
          <CarouselItem key={index}>
            <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
              <Image
                src={item as string}
                alt="yoo"
                fill
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
};

export default ProductImageSlider;
