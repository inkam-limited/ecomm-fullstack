import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@prisma/client";
import Image from "next/image";

export default function ProductSelect({
  products,
  prodSelect,
}: {
  products: Product[];
  prodSelect: (id: string) => void;
}) {
  function handleProdChange(value: string) {
    prodSelect(value);
  }

  return (
    <div className="space-y-2">
      <Label>Product</Label>
      <Select onValueChange={handleProdChange}>
        <SelectTrigger className="h-auto ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0">
          <SelectValue placeholder="Choose a product" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          {products.map((product) => (
            <SelectItem value={product.id} key={product.id}>
              <span className="flex items-center gap-2">
                <Image
                  className="size-10 rounded-full"
                  src={product.images[0]}
                  alt="Jenny Hamilton"
                  width={40}
                  height={40}
                />
                <span>
                  <span className="block font-medium">{product.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {product.price}
                  </span>
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
