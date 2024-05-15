import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../src/state/StateController";
import AdminPage from "../../components/pages/AdminPage/AdminPage";
import Blogs from "../../components/pages/BlogsPage/Blogs";
import FAQ from "../../components/pages/FAQPage/FAQ";
import SingleProduct from "../../components/pages/SingleProductPage/SingleProduct";
import BestProducts from "../../components/pages/HomePagee/BestProducts/BestProducts";
import Footer from "../../components/shared/SharedFooter/Footer";
import CategoryPage from "../../components/pages/CategoryProductPage/CategoryPage";
import ProfilePage from "../../components/pages/ProfilePage/ProfilePage";

interface Props {}

const Ronin: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="bg-gray-100">
      <ProfilePage />
      <AdminPage />
      <CategoryPage />
      <Blogs />
      <FAQ />
      <SingleProduct />
      <BestProducts />
      <Footer />
    </div>
  );
};

export default Ronin;
