import MainNavbar from "@/components/MainNavbar";
import Footer from "@/components/Footer";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default layout;
