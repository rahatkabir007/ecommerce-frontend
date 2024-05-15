import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { Jsondata } from "../../../../src/utils/Jsondata";
import ProductCard from "../../../shared/SharedProductCard/ProductCard";
import SectionHeader from "../SectionHeader";

interface Props {}

const NewReleasedProducts: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div>
      <div className="section-style-one new-products md:mb-[60px] mb-[30px]">
        <div className="section-wrapper w-full ">
          <div className="container-x mx-auto">
            <SectionHeader title="New Arrivals" link="/products?highlight=new_arrival" />
            <div className="section-content">
              <div className="products-section w-full">
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
                  {states.newProducts.map((product, index) => (
                    <ProductCard key={index} product={product}></ProductCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReleasedProducts;
