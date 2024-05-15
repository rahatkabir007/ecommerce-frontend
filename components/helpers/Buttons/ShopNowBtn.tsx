import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import Link from "next/link";
import SvgIconRenderer from "../SvgIconRenderer";
import { SvgPaths } from "../../../src/utils/SvgPaths";

interface Props {
  color: {
    textColor: string;
  };
}

const ShopNowBtn: React.FC<Props> = ({ color }) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="w-[100px] group">
      {/* <Link href="products?category=electronics" rel="noopener noreferrer"> */}
      <div className="cursor-pointer w-full relative">
        <div className="inline-flex items-center relative z-20">
          <span
            className={`text-sm ${color.textColor} font-medium leading-[30px]`}>
            Shop Now
          </span>
          <span className={`leading-[30px] ${color.textColor}`}>
            <SvgIconRenderer
              xmlns={"http://www.w3.org/2000/svg"}
              width={"24px"}
              height={"24px"}
              preserveAspectRatio={"xMidYMid meet"}
              viewBox={"0 0 24 24"}
              path={SvgPaths.shopNowIcon}
              pathFill={"currentColor"}
            />
          </span>
        </div>
        <div className="w-[82px] transition-all duration-300 ease-in-out group-hover:h-4 h-[2px] bg-qyellow absolute left-0 bottom-0 z-10"></div>
      </div>
    </div>
  );
};

export default ShopNowBtn;
