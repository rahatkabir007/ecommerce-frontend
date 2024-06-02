import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import FilterHeader from "./FilterHeader";
import InputRange from "react-input-range";
import { useRouter } from "next/router";

interface Props {
  value: { min: number; max: number };
  setValue: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
}

const FilterRange: React.FC<Props> = ({ value, setValue }) => {
  const states = useSelector(() => controller.states);
  const router = useRouter();

  const [changingValue, setChangingValue] = useState({
    min: 0,
    max: 15000,
  });

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        min: value.min,
        max: value.max,
      },
    });
  }, [value])

  return (
    <div className="pb-10 border-b border-gray-200 mt-10">
      <FilterHeader title="Price Range" />
      <div className="mb-5">
        <InputRange
          maxValue={15000}
          minValue={0}
          value={changingValue}
          draggableTrack={true}
          onChange={(aValue) => {
            //@ts-ignore
            setChangingValue(aValue);
          }}
          onChangeComplete={(value) => setValue(changingValue)}
        />
      </div>
      <p className="text-xs text-qblack font-normal">
        Price: ${changingValue.min} - ${changingValue.max}
      </p>
    </div>
  );
};

export default FilterRange;
