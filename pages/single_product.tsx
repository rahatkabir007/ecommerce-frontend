import React from "react";
import { useSelector } from "react-redux";
import RelatedProductSection from "../components/pages/HomePagee/RelatedProductSection/RelatedProductSection";
import SingleProduct from "../components/pages/SingleProductPage/SingleProduct";

import { controller } from "../src/state/StateController";

interface Props {}

const SingleProductPage: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <>
      <SingleProduct />
  
      <RelatedProductSection />
    </>
  );
};

export default SingleProductPage;
