import React from "react";
import { useSelector } from "react-redux";
import WishList from "../components/pages/WishlistPage/Wishlist";
import { controller } from "../src/state/StateController";

interface Props {}

const wishlistPage: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <WishList />;
};

export default wishlistPage;
