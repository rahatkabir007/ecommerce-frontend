import React from "react";
import { useSelector } from "react-redux";
import TermsAndConditions from "../components/pages/TermsAndConditionsPage/TermsAndConditions";
import { controller } from "../src/state/StateController";

interface Props {}

const terms_condition: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <TermsAndConditions />;
};

export default terms_condition;
