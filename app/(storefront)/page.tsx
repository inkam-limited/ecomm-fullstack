import CategoryBar from "@/components/CategoryBar";
import CategoryChips from "../../components/CategoryChips";
import ProductCardDisplay from "../../components/product-cards";

const NewHomePage = () => {
  return (
    <div className="container px-4">
      <CategoryBar />
      <h1 className="text-3xl lg:text-5xl text-center font-bold py-12 lg:py-24">
        Bring your creative ideas to life.
      </h1>
      <CategoryChips />
      <ProductCardDisplay title="Featured Products" link="/featured" />
    </div>
  );
};

export default NewHomePage;
