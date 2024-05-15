import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../src/state/StateController";
import PaymentSuccess from "../components/pages/CheckoutPage/PaymentSuccess";

interface Props {}

const payment_success: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <PaymentSuccess />;
};

export default payment_success;
