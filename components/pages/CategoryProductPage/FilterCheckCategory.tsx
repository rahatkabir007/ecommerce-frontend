import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ICategories } from "../../../interfaces/models";
import { controller } from "../../../src/state/StateController";
import { useRouter } from "next/router";

interface Props {
  category: ICategories;
}

const FilterCheckCategory: React.FC<Props> = (props) => {
  const {
    category: { cat_slug, cat_name },
  } = props;
  const states = useSelector(() => controller.states);
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (router.query.category) {
      setChecked(router.query.category?.includes(cat_slug));
    } else {
      setChecked(false);
    }
  }, [router.query]);

  const catRouting = (cat: string) => {
    let catString = (router.query.category as string) || "";

    if (catString.includes("+" + cat)) {
      catString = catString.replace("+" + cat, "");
    } else if (catString.includes(" " + cat)) {
      catString = catString.replace(" " + cat, "");
    } else {
      catString = catString + "+" + cat;
    }

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        category: catString,
      },
    });
  };

  return (
    <li className="mb-5 flex gap-x-[14px] items-center">
      <input
        id={"cat_" + cat_slug}
        value={cat_slug}
        type="checkbox"
        name={`${cat_name}`}
        onChange={(e) => catRouting(e.target.value)}
        checked={checked}
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
