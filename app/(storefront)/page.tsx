import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import { Hero } from "../components/storefront/Hero";
import { Navbar } from "../components/storefront/Navbar";
import CategoryChips from "../../components/CategoryChips";
import ProductCardDisplay from "../../components/product-cards";

const NewHomePage = () => {
  return (
    <div className="container px-4 ">
      <h1 className="text-3xl text-center font-bold py-12">
        Bring your creative ideas to life.
      </h1>
      <CategoryChips />
      <ProductCardDisplay title="Featured Products" link="/featured" />
    </div>
  );
};

export default NewHomePage;
