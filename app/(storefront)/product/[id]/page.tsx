import { addItem } from "@/app/actions";
import { ShoppingBagButton } from "@/components/SubmitButtons";
import { ImageSlider } from "@/components/storefront/ImageSlider";
import { JSONContent } from "@tiptap/react";
import { StarIcon, Download } from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import ProductCardDisplay from "@/components/product-cards";
import ProductDescription from "@/components/ProductDescription";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import AddToCartButton from "@/components/storefront/add-to-cart-button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

async function getData(productId: string, userId: string | null) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
      productFileLink: true,
    },
  });

  if (!data) {
    return notFound();
  }

  let hasOrdered = false;
  if (userId) {
    const order = await prisma.order.findFirst({
      where: {
        userId: userId,
        status: "paid",
        OrderItem: {
          some: {
            productId: productId,
          },
        },
      },
    });
    hasOrdered = order !== null;
  }

  return { ...data, hasOrdered };
}

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(params.id, user?.id || null);

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 items-start py-6">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900">${data.price}</p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div>

          <div className="mt-6 space-y-4">
            {/* <form action={addProductToShoppingCart}>
              <ShoppingBagButton />
            </form> */}
            <AddToCartButton id={data.id} />

            {data.hasOrdered && data.productFileLink && (
              <Link
                href={data.productFileLink}
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full"
                )}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Product
              </Link>
            )}

            {data.hasOrdered && (
              <p className="text-sm text-green-600">
                You already own this product. Feel free to purchase again or
                download if available.
              </p>
            )}

            <div className="w-full mt-6">
              <ProductDescription content={data?.description as JSONContent} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <ProductCardDisplay
          limit={4}
          title="Featured Products"
          link="/featured"
        />
      </div>
    </>
  );
}
