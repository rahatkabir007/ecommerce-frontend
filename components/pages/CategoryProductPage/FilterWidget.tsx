//@ts-nocheck
import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputRange from "react-input-range";
import { controller } from "../../../src/state/StateController";
import "react-input-range/lib/css/index.css";
import { Jsondata } from "../../../src/utils/Jsondata";
import FilterCheckCategory from "./FilterCheckCategory";
import FilterHeader from "./FilterHeader";
import FilterCheckBrand from "./FilterCheckBrand";
import FilterRange from "./FilterRange";

interface Props {
  showFilterWidget: boolean;
  setShowFilterWidget: React.Dispatch<React.SetStateAction<boolean>>;
  value: { min: number; max: number };
  setValue: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
}

const FilterWidget: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const { showFilterWidget, setShowFilterWidget, value, setValue } = props;


  return (
    <div
      className={`lg:w-[270px] py-2 md:py-0 my-0 md:my-10 w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] mb-[30px]  ${
        showFilterWidget ? "block z-50" : "hidden lg:block"
      }`}
    >
      <div className="pb-10 border-b border-gray-200">
        <FilterHeader title="Product categories" />
        <ul>
          {states.categories.length !== 0 && states.categories.map((category, i) => (
            <FilterCheckCategory key={category.cat_slug} category={category} />
          ))}
        </ul>
      </div>

      <FilterRange value={value} setValue={setValue} />

      <div className="pb-10 border-b border-gray-200 mt-10">
        <FilterHeader title="Brands" />

        <ul>
          {states.brands.length !== 0 && states.brands.map((brand, i) => (
            <FilterCheckBrand key={brand.slug} brand={brand} />
          ))}
        </ul>
      </div>

      <div className="pb-10 mt-10">
        <FilterHeader title="Red" />
      </div>

      <button
        type="button"
        onClick={() => setShowFilterWidget(false)}
        className="w-10 h-10 fixed top-5 right-5 z-50 rounded lg:hidden flex justify-center items-center border border-qred text-qred"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default FilterWidget;
