import MainNavbar from "@/components/MainNavbar";
import Footer from "@/components/Footer";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <MainNavbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
