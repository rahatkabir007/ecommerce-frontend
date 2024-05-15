import React from "react";
import { useSelector } from "react-redux";
import About from "../../components/pages/AboutPage/About";
import FeaturedCaategoryAdmin from "../../components/pages/AdminPage/Dashboard/ManageCategories/FeaturedCategoryAdmin/FeaturedCategoryAdmin";
import Categories from "../../components/pages/AdminPage/Dashboard/ManageCategories/Categories/Categories";
import MegaMenuCategory from "../../components/pages/AdminPage/Dashboard/ManageCategories/MegaMenuCategory/MegaMenuCategory";
import PopularCategoryAdmin from "../../components/pages/AdminPage/Dashboard/ManageCategories/PopularCategoryAdmin/PopularCategoryAdmin";
import ProductChildCategory from "../../components/pages/AdminPage/Dashboard/ManageCategories/ProductChildCategory/ProductChildCategory";
import Contact from "../../components/pages/ContactPage/Contact";
import FAQ from "../../components/pages/FAQPage/FAQ";
import Itemdetails from "../../components/pages/HomePagee/ItemDetails/ItemDetails";
import ShopByBrand from "../../components/pages/HomePagee/ShopByBrandSection/ShopByBrand";
import TopRated from "../../components/pages/HomePagee/TopRatedProductsSection/TopRatedSection";
import MyCart from "../../components/pages/MyCartPage/MyCart";
import PrivacyPolicy from "../../components/pages/PrivacyPolicyPage/PrivacyPolicy";
import SellerTermsAndCondition from "../../components/pages/SellerTermsAndConditionPage/SellerTermsAndCondition";
import TermsAndConditions from "../../components/pages/TermsAndConditionsPage/TermsAndConditions";
import WishList from "../../components/pages/WishlistPage/Wishlist";
import { controller } from "../../src/state/StateController";
import AdminProfile from "../../components/pages/AdminProfile/AdminProfile";

interface Props {}

const sadab: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <>
      <ShopByBrand />
      <TopRated />
      <Itemdetails />
      <Contact />
      <FAQ />
      <WishList />
      <AdminProfile />
      <TermsAndConditions />
      <PrivacyPolicy />
      <SellerTermsAndCondition />
      <About />
      <MyCart />
      <Categories></Categories>
      <PopularCategoryAdmin />
      <FeaturedCaategoryAdmin />
      <ProductChildCategory />
      <MegaMenuCategory />
    </>
  );
};

export default sadab;
