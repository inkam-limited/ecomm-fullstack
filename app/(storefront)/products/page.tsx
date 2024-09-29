import { Suspense } from "react";
import ProductList from "./product-list";
import ProductFilters from "./product-filters";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/app/lib/db";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page) || 1;
  const search = (searchParams?.search as string) || "";
  const sort = (searchParams?.sort as string) || "name";
  const minPrice = Number(searchParams?.minPrice) || 0;
  const maxPrice = Number(searchParams?.maxPrice) || 100000;
  const categoryIds = ((searchParams?.categories as string) || "")
    .split(",")
    .filter(Boolean);
  const minRating = Number(searchParams?.minRating) || 0;

  const products = await prisma.product.findMany({
    where: {
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
      category:
        categoryIds.length > 0
          ? {
              some: {
                id: {
                  in: categoryIds,
                },
              },
            }
          : undefined,
    },
    include: {
      category: true,
      createdBy: true,
    },
    take: 20,
    skip: (page - 1) * 20,
  });
  const totalPages = Math.ceil(products.length / 20);

  // Fetch categories for the filter sidebar
  const categories = await prisma.category.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        UI Design Products
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <ProductFilters
            categories={categories}
            selectedCategoryIds={categoryIds}
            minPrice={minPrice}
            maxPrice={maxPrice}
            minRating={minRating}
          />
        </aside>

        <main className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <Input
              placeholder="Search products..."
              defaultValue={search}
              className="max-w-xs"
            />
            <Select defaultValue={sort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList products={products} />
          </Suspense>
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                {page > 1 && (
                  <Link
                    href={`/products?page=${
                      page - 1
                    }?search=${search}?sort=${sort}?minPrice=${minPrice}?maxPrice=${maxPrice}?categories=${categoryIds.join(
                      ","
                    )}?minRating=${minRating}`}
                  >
                    <ArrowLeft />
                  </Link>
                )}
              </PaginationItem>
              <PaginationItem>{`Page ${page} of ${totalPages}`}</PaginationItem>
              <PaginationItem>
                {page < totalPages && (
                  <Link
                    href={`/products?page=${
                      page + 1
                    }&search=${search}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}&categories=${categoryIds.join(
                      ","
                    )}&minRating=${minRating}`}
                  >
                    <ArrowRight />
                  </Link>
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
}
