import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import ShopNowBtn from './../../helpers/Buttons/ShopNowBtn';

interface Props {}

const FilterAd: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div
      className="w-full hidden py-[35px] pl-[40px] group lg:block h-[295px] relative"
      style={{
        background:
          "url(https://api.websolutionus.com/shopo/uploads/website-images/Mega-menu-2022-10-27-01-44-49-1623.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col justify-between w-full h-full">
        <div>
          <div className="mb-[10px]">
            <span className="text-qblack uppercase text-xs font-semibold">
              HEADSET
            </span>
          </div>
          <div className="mb-[30px]">
            <h1 className="w-[162px] text-[24px] leading-[40px] text-qblack font-semibold">
              Beat wireless Headphone
            </h1>
          </div>
        </div>
        <ShopNowBtn color={{ textColor: "text-qblack" }} />
      </div>
    </div>
  );
};

export default FilterAd;
