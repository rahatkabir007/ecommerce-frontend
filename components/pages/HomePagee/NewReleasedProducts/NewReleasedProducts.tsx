import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import ProductCard from "../../../shared/SharedProductCard/ProductCard";
import SectionHeader from "../SectionHeader";
import useWindowDimensions from "../../../shared/hooks/useWindowDimensions";
import styles from "../../../../styles/Scrollbar.module.css";

interface Props {}

const NewReleasedProducts: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const { height, width } = useWindowDimensions();

  return (
    <div>
      <div className="section-style-one new-products md:mb-[60px] mb-[30px]">
        <div className="section-wrapper w-full ">
          <div className="container-x mx-auto">
            <SectionHeader title="New Arrivals" link="/products?highlight=new_arrival" />
            <div className="section-content">
              <div className="products-section w-full">
                {/* <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5"> */}
                <div
                className={
                  width && width > 640
                    ? "grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5"
                    : `flex flex-nowrap gap-3 overflow-scroll snap-x snap-mandatory ${styles["scrollbar"]}`
                }
              >
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
