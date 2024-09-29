import CategoryBar from "@/components/CategoryBar";
import CategoryChips from "../../components/CategoryChips";
import ProductCardDisplay from "../../components/product-cards";
import prisma from "../lib/db";
import BannerCard from "../components/BannerCard";
import ActionToSell from "@/components/ActionToSell";

const HomePage = async () => {
  const productBanner = await prisma.banner.findMany();

  return (
    <div className="container px-4 pb-24">
      <CategoryBar />
      <BannerCard banner={productBanner[1]!} />
      <h1 className="text-3xl lg:text-5xl text-center font-bold py-12 lg:py-24">
        Bring your creative ideas to life.
      </h1>
      <CategoryChips />
      <ProductCardDisplay title="New Products" link="/products" />
      <BannerCard banner={productBanner[0]!} />
      <ProductCardDisplay title="Popular Products" link="/products" />
      <ActionToSell />
      <ProductCardDisplay title="Staff Picks" link="/products" />
    </div>
  );
};

export default HomePage;
