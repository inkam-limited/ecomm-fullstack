import { type ReactNode } from "react";
import { Footer } from "../components/storefront/Footer";
import CreativeMainNavbar from "@/components/CreativeMainNavbar";

export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <CreativeMainNavbar />
      <div>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
