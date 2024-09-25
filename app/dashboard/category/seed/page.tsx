"use client";
import React from "react";
import { seedCategory } from "./action";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SeedCategoryPage = () => {
  return (
    <div>
      Seed Category Page
      <form action={seedCategory}>
        <SubmitButton />
      </form>
    </div>
  );
};

const SubmitButton = () => {
  const status = useFormStatus();
  return (
    <Button type="submit">
      {status.pending ? "Seed Category" : "seeding"}
    </Button>
  );
};

export default SeedCategoryPage;
