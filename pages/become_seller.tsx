import React from "react";
import { useSelector } from "react-redux";
import BecomeSeller from "../components/pages/BecomeSeller/BecomeSeller";
import { controller } from "../src/state/StateController";

interface Props {}

const become_seller: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <BecomeSeller />;
};

export default become_seller;
