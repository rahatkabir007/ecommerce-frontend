import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { Jsondata } from "../../../../src/utils/Jsondata";
import TopRatedProduct from "./TopRatedProduct";
import SectionHeader from "../SectionHeader";
interface Props { }

const TopRatedSection: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  useEffect(() => {

  }, [])

  return (
    <div className="w-full">
      <div className="container-x mx-auto pb-[60px]">
        <SectionHeader title="Top Rated Products" link="/products?highlight=top_product" />
        <div className="section-content w-full grid sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5  ">
          {states.topProducts.slice(0, 4).map((product, index) => {
            return (
              <TopRatedProduct key={index} product={product}></TopRatedProduct>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopRatedSection;
