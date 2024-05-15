import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { Jsondata } from "../../../../src/utils/Jsondata";
import ProductCard from "../../../shared/SharedProductCard/ProductCard";

interface Props {}

const RelatedProductSection: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div>
      <div className="related-product w-full bg-white">
        <div className="container-x mx-auto">
          <div className="w-full py-[60px]">
            <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
              Related Product
            </h1>

            <div className="section-style-one new-products md:mb-[60px] mb-[30px] bg-white">
              <div className="section-wrapper w-full ">
                <div className="container-x mx-auto">
                  <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
                    {Jsondata.newReleasedProducts
                      .slice(0, 2)
                      .map((product, index) => (
                        <ProductCard
                          key={index}
                          product={product}></ProductCard>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProductSection;
