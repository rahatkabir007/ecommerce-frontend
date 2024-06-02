import React from "react";
import { useSelector } from "react-redux";
import MyCart from "../components/pages/MyCartPage/MyCart";
import { controller } from "../src/state/StateController";
import withBuyerPrivate from "../components/hocs/withBuyerPrivate";

interface Props {}

const cart: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <MyCart />;
};

export default withBuyerPrivate(cart);
