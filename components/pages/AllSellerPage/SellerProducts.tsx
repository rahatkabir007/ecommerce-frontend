import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IProduct, ISeller } from "../../../interfaces/models";
import { controller } from "../../../src/state/StateController";
import CategoryItemsRight from "../CategorizedItem/CategoryItemsRight";
import FilterAd from "../CategoryProductPage/FilterAd";
import FilterWidget from "../CategoryProductPage/FilterWidget";
import SellerHeader from "./SellerHeader";

interface Props {
  sellerData: ISeller;
  filteredProducts: IProduct[];
  count: number;
}

const SellerProducts: React.FC<Props> = ({
  sellerData,
  filteredProducts,
  count,
}) => {
  const states = useSelector(() => controller.states);

  const [showFilterWidget, setShowFilterWidget] = useState(false);
  const [value, setValue] = useState({
    min: 0,
    max: 15000,
  });
  
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(9);

  return (
    <div className="w-full min-h-screen pt-[22px] pb-[60px] mx-auto">
      <div className="products-page-wrapper w-full">
        <div className="">
          <div className="container-x mx-auto">
            {sellerData && <SellerHeader sellerData={sellerData} />}
          </div>

          <div className="container-x mx-auto">
            <div className="lg:flex lg:gap-x-[30px]">
              <div className="lg:w-[270px] my-10">
                <FilterWidget
                  showFilterWidget={showFilterWidget}
                  setShowFilterWidget={setShowFilterWidget}
                  value={value}
                  setValue={setValue}
                />
                <FilterAd />
              </div>
              <div className="flex-1 min-h-screen my-2 md:my-10">
                <CategoryItemsRight
                  filteredProducts={filteredProducts}
                  setShowFilterWidget={setShowFilterWidget}
                  count={count}
                  skip={skip}
                  limit={limit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
