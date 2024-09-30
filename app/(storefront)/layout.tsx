import CreativeMainNavbar from "@/components/CreativeMainNavbar";
import Footer from "@/components/Footer";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CreativeMainNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default layout;
