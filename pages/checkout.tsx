import React from "react";
import { useSelector } from "react-redux";
import CheckoutPage from "../components/pages/CheckoutPage/CheckoutPage";
import { controller } from "../src/state/StateController";

interface Props {}

const checkout: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div>
      <CheckoutPage />
    </div>
  );
};

export default checkout;
