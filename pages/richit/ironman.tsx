import React from "react";
import { useSelector } from "react-redux";
import AdminPage from "../../components/pages/AdminPage/AdminPage";
import Dashboard from "../../components/pages/AdminPage/Dashboard/Dashboard";
import AllSellerPage from "../../components/pages/AllSellerPage/AllSellerPage";
import SellerHeader from "../../components/pages/AllSellerPage/SellerHeader";
import CheckoutPage from "../../components/pages/CheckoutPage/CheckoutPage";
import DeliveryComponents from "../../components/pages/HomePagee/DeliveryPolicyData/DeliveryComponents";
import FeaturedProducts from "../../components/pages/HomePagee/FeaturedProducts/FeaturedProducts";
import NewReleasedProducts from "../../components/pages/HomePagee/NewReleasedProducts/NewReleasedProducts";
import PopularCategory from "../../components/pages/HomePagee/PopularCategory/PopularCategory";
import RelatedProductSection from "../../components/pages/HomePagee/RelatedProductSection/RelatedProductSection";
import TrackOrder from "../../components/pages/TrackOrder/TrackOrder";
import WishList from "../../components/pages/WishlistPage/Wishlist";
import SharedEmptyCart from "../../components/shared/SharedEmptyCart/SharedEmptyCart";
import { controller } from "../../src/state/StateController";

interface Props {}

const ironman: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <>
      {/* <AdminPage></AdminPage> */}
      {/* <DeliveryComponents></DeliveryComponents> */}
      {/* <FeaturedProducts></FeaturedProducts> */}
      {/* <NewReleasedProducts></NewReleasedProducts>
      <PopularCategory></PopularCategory>
      <WishList />
      <RelatedProductSection></RelatedProductSection> */}

      <br />
      <br />
      {/* <SellerHeader />
      <AllSellerPage />
      <TrackOrder />
      <CheckoutPage /> */}
      <SharedEmptyCart />
    </>
  );
};

export default ironman;
