import React from "react";
import { useSelector } from "react-redux";
import FlashSale from "../components/pages/FlashSalePage/FlashSale";
import { controller } from "../src/state/StateController";

interface Props {}

const flash_sale: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <FlashSale />;
};

export default flash_sale;
