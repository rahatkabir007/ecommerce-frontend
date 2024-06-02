import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import SectionHeader from "../SectionHeader";
import ProductCardVertical from "../../../shared/SharedProductCard/ProductCardVertical";
interface Props { }

const TopRatedSection: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="w-full">
      <div className="container-x mx-auto pb-[60px]">
        <SectionHeader title="Top Rated Products" link="/products?highlight=top_product" />
        <div className="section-content w-full grid sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-2 md:gap-5">
          {states.topProducts.slice(0, 4).map((product, index) => {
            return (
              <ProductCardVertical key={index} product={product}></ProductCardVertical>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopRatedSection;
