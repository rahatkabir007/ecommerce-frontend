import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { Jsondata } from "../../../../src/utils/Jsondata";
import SectionHeader from "../SectionHeader";
import BestProductCard from "./BestProductCard";

interface Props {

}

const BestProducts: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <section className="md:mb-[60px] mb-[30px]">
      <div className="container-x mx-auto">
        <SectionHeader
          title="Best Products"
          link="products?highlight=best_product"
        />
        <div className="grid lg:grid-cols-3 grid-cols-1 xl:gap-x-[30px] lg:gap-x-5">
          {states.bestProducts.map((product, i) => (
            <BestProductCard key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestProducts;
