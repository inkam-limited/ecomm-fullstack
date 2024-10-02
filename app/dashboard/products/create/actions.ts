"use server";

import prisma from "@/lib/db";

export const fetchCategories = async () => {
  const categories = await prisma.category.findMany();
  const mappedCategories = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
  return mappedCategories;
};
