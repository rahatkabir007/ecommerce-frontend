import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { controller } from "../../../src/state/StateController";
import AD1 from "./Ads/AD1";
import AD2 from "./Ads/AD2";
import AD3 from "./Ads/AD3";
import BestProducts from "./BestProducts/BestProducts";
import BestSeller from "./BestSeller/BestSeller";
import Campaign from "./Campaign/Campaign";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import HeroSection from "./HeroSectionArea/HeroSection";
import NewReleasedProducts from "./NewReleasedProducts/NewReleasedProducts";
import PopularCategory from "./PopularCategory/PopularCategory";
import ProductCategory from "./ProductCategory/ProductCategory";
import ShopByBrand from "./ShopByBrandSection/ShopByBrand";
import TopRatedSection from "./TopRatedProductsSection/TopRatedSection";

interface Props {}

const Homepage: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const fetchAllProducts = async () => {
    const { res, err } = await EcommerceApi.getAllProducts();
    if (err) {
      // enqueueSnackbar('Server Error', { variant: 'error', autoHideDuration: 2000 });
    } else {
      controller.setAllProducts(res.allProductData);
      controller.setFeaturedProducts(res.featuredProducts);
      controller.setPopularProducts(res.popularProducts);
      controller.setTopProducts(res.topProducts);
      controller.setBestProducts(res.bestProducts);
      controller.setNewProducts(res.newProducts);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="md:p-0 p-2">
      <HeroSection />
      <ProductCategory />
      <PopularCategory />
      {/* <ShopByBrand /> */}
      <Campaign />
      <TopRatedSection />
      {/* <BestSeller /> */}
      {/* <AD1 /> */}
      <FeaturedProducts />
      <AD2 />
      <NewReleasedProducts />
      <AD3 />
      <BestProducts />
    </div>
  );
};

export default Homepage;
