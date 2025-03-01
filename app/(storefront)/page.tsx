import CategoryBar from "@/components/CategoryBar";
import CategoryChips from "../../components/CategoryChips";
import ProductCardDisplay from "../../components/product-cards";
import BannerCard from "../../components/BannerCard";
import ActionToSell from "@/components/ActionToSell";
import BlogSection from "@/components/blog-section";
import prisma from "@/lib/db";
import Tagline from "@/components/storefront/Tagline";

const HomePage = async () => {
  const productBanner = await prisma.banner.findMany();

  return (
    <>
      <div className="container px-4 pb-8">
        <CategoryBar />
        <BannerCard banner={productBanner[1]!} />
        <Tagline />

        <CategoryChips />
        <ProductCardDisplay title="New Products" link="/products" />
        <BannerCard banner={productBanner[0]!} />
        <ProductCardDisplay title="Popular Products" link="/products" />
        <ActionToSell />
        <ProductCardDisplay title="Staff Picks" link="/products" />
      </div>
      <BlogSection />
    </>
  );
};

export default HomePage;
