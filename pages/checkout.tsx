import React from "react";
import { useSelector } from "react-redux";
import CheckoutPage from "../components/pages/CheckoutPage/CheckoutPage";
import { controller } from "../src/state/StateController";
import withBuyerPrivate from "../components/hocs/withBuyerPrivate";

interface Props {}

const checkout: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div>
      <CheckoutPage />
    </div>
  );
};

export default withBuyerPrivate(checkout);
