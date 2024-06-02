import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IBrands } from "../../../interfaces/models";
import { controller } from "../../../src/state/StateController";
import { useRouter } from "next/router";

interface Props {
  brand: IBrands;
}

const FilterCheckBrand: React.FC<Props> = (props) => {
  const {
    brand: { slug, name },
  } = props;
  const states = useSelector(() => controller.states);
  const [checked, setChecked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.query.brand) {
      setChecked(router.query.brand?.includes(slug as string));
    } else {
      setChecked(false);
    }
  }, [router.query]);

  const brandRouting = (brand: string) => {
    let brandString = (router.query.brand as string) || "";

    if (brandString.includes(brand)) {
      brandString = brandString.replace("+" + brand, "");
    } else {
      brandString = brandString + "+" + brand;
    }

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        brand: brandString,
      },
    });
  };

  return (
    <li className="mb-5 flex gap-x-[14px] items-center">
      <input
        id={"brand_" + slug}
        value={slug}
        type="checkbox"
        name={`${name}`}
        onChange={(e) => brandRouting(e.target.value)}
        checked={checked}
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
