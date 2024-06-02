import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import CategoryItemsRight from "../CategorizedItem/CategoryItemsRight";
import FilterWidget from "./FilterWidget";
import FilterAd from "./FilterAd";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { IProduct } from "../../../interfaces/models";

interface Props {
  filteredProducts: IProduct[];
  count: number;
}

const CategoryPage: React.FC<Props> = ({ filteredProducts, count }) => {
  // const states = useSelector(() => controller.states);

  const [showFilterWidget, setShowFilterWidget] = useState(false);
  const [value, setValue] = useState({
    min: 0,
    max: 15000,
  });

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(9);

  return (
    <div className="container-x mx-auto ">
      <div className="lg:flex lg:gap-x-[30px]">
        <div className="">
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
            count={count}
            setShowFilterWidget={setShowFilterWidget}
            skip={skip}
            limit={limit}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
