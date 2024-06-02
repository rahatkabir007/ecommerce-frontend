import React from "react";
import { useSelector } from "react-redux";
import CategoryPage from "../components/pages/CategoryProductPage/CategoryPage";
import { controller } from "../src/state/StateController";

interface Props {}

const shopbybrand: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <div>{/* <CategoryPage /> */}</div>;
};

export default shopbybrand;
