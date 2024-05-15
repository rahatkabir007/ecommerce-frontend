import React from "react";
import { useSelector } from "react-redux";
import { IBrands } from "../../../interfaces/models";
import { controller } from "../../../src/state/StateController";

interface Props {
  brand: IBrands;
}

const FilterCheckBrand: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const {
    brand: { slug, name }
  } = props;

  return (
    <li className="mb-5 flex gap-x-[14px] items-center">
      <input
        id={"brand_" + slug}
        value={slug}
        type="checkbox"
        name={`${name}`}
        onChange={(e) => controller.setSearchBrand(e.target.value)}
        // checked={states.searchBrand.includes(slug)}
      />
      <label
        htmlFor={"brand_" + slug}
        className="text-xs font-normal capitalize"
      >
        {name}
      </label>
    </li>
  );
};

export default FilterCheckBrand;
