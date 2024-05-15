import React from "react";
import { useSelector } from "react-redux";
import AllSellerPage from "../components/pages/AllSellerPage/AllSellerPage";
import { controller } from "../src/state/StateController";

interface Props {}

const sellers: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <AllSellerPage />;
};

export default sellers;
