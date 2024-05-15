import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../src/state/StateController";

import HeroSection from "../../components/pages/HomePagee/HeroSectionArea/HeroSection";
import ProductCategory from "../../components/pages/HomePagee/ProductCategory/ProductCategory";
import SingleProduct from "../../components/pages/SingleProductPage/SingleProduct";
import Contact from "../../components/pages/ContactPage/Contact";
import Blogs from "../../components/pages/BlogsPage/Blogs";
import AdminDetailsSummary from "../../components/pages/AdminPage/Dashboard/AdminDetailsSummary/AdminDetailsSummary";
import CategoryPage from "../../components/pages/CategoryProductPage/CategoryPage";
import ProfileDashboard from "../../components/pages/ProfilePage/ProfileDashboard/ProfileDashboard";
import ProfileOrder from "../../components/pages/ProfilePage/ProfileOrder/ProfileOrder";
import ProfileAddress from "../../components/pages/ProfilePage/ProfileAddress/ProfileAddress";
import ProfilePage from "../../components/pages/ProfilePage/ProfilePage";
import SharedLoginSignupImage from "../../components/shared/SharedLoginSignupImage/SharedLoginSignupImage";
import SignupPage from "../../components/pages/SignupPage/SignupPage";
import SubCategories from "../../components/pages/AdminPage/Dashboard/ManageCategories/SubCategories/SubCategories";
import ForgetPassword from "../../components/pages/ForgetPassword/ForgetPassword";

interface Props {}

const denji: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <>
      {/* <HeroSection />
      <ProductCategory />
      <SingleProduct />
      <Contact />
      <Blogs />
      <CategoryPage />
      <AdminDetailsSummary /> */}
      <ProfilePage></ProfilePage>
      <SignupPage />
      <SubCategories></SubCategories>
      <ForgetPassword></ForgetPassword>
    </>
  );
};

export default denji;
