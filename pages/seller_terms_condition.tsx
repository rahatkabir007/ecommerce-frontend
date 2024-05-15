import React from "react";
import { useSelector } from "react-redux";
import SellerTermsAndCondition from "../components/pages/SellerTermsAndConditionPage/SellerTermsAndCondition";
import { controller } from "../src/state/StateController";

interface Props {}

const seller_terms_condition: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <SellerTermsAndCondition />;
};

export default seller_terms_condition;
