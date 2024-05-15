import React from "react";
import { useSelector } from "react-redux";
import { ICategories } from "../../../interfaces/models";
import { controller } from "../../../src/state/StateController";

interface Props {
  category: ICategories;
  // handleCategorySelect: Function;
}

const FilterCheckCategory: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const { category: { cat_slug, cat_name} } = props;

  return (
    <li className="mb-5 flex gap-x-[14px] items-center">
      <input
        id={"cat_" + cat_slug}
        value={cat_slug}
        type="checkbox"
        name={`${cat_name}`}
        onChange={(e) => controller.setSearchCategory(e.target.value, false)}
        checked={states.searchCategory.includes(cat_slug)}
      />
      <label
        htmlFor={"cat_" + cat_slug}
        className="text-xs font-normal capitalize"
      >
        {cat_name}
      </label>
    </li>
  );
};

export default FilterCheckCategory;
