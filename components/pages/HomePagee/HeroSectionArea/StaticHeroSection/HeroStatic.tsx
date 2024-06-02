import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../../src/state/StateController";
import ShopNowBtn from "../../../../helpers/Buttons/ShopNowBtn";

interface Props {}

const HeroStatic: React.FC<Props> = (props) => {
  const singleAdData = useSelector(() => controller.states.sliderOne);
  const singleSecondAdData = useSelector(() => controller.states.sliderTwo);

  return (
    <div className="flex-1 hidden md:flex xl:flex-col flex-row xl:space-y-[30px] xl:h-full md:h-[350px] h-[150px] aos-init aos-animate ">
      <div
        className="w-full xl:h-1/2 xl:mr-o mr-2 relative flex items-center group md:pl-[40px] pl-[30px]"
        style={{
          backgroundImage: `url(${singleAdData?.adImage}
            
          )`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col justify-between">
          <div>
            <div className=" w-fit px-3 py-1 h-fit shadow  flex items-center justify-center bg-white rounded-full md:mb-[22px] mb-[15px]">
              <span className="text-qblack uppercase md:text-xs text-[10px] font-semibold">
                {singleAdData?.badge}
              </span>
            </div>
            <div className="md:mb-[30px] mb-2.5">
              <p className="md:text-[30px] leading-none text-qblack font-semibold md:mb-3">
                {singleAdData?.title_one}
              </p>
              <h1 className="md:text-[30px] md:leading-[40px] text-qblack font-semibold">
                {singleAdData?.title_two}
              </h1>
            </div>
          </div>
          <Link href={`products?category=%2B${singleAdData?.category_link}`}>
            <ShopNowBtn color={{ textColor: "text-qblack" }} />
          </Link>
        </div>
      </div>
      <div
        className="w-full xl:h-1/2 relative flex items-center pl-[40px] group"
        style={{
          backgroundImage: `url(
            
            ${singleSecondAdData?.adImage}
          )`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col justify-between">
          <div>
            <div className=" w-fit px-3 py-1 h-fit shadow  flex items-center justify-center bg-white rounded-full md:mb-[22px] mb-[15px]">
              <span className="text-qblack uppercase md:text-xs text-[10px] font-semibold">
                {singleSecondAdData?.badge}
              </span>
            </div>
            <div className="md:mb-[30px] mb-2.5">
              <p className="md:text-[30px] leading-none text-qblack font-semibold md:mb-3">
                {singleSecondAdData?.title_one}
              </p>
              <h1 className="md:text-[30px] md:leading-[40px] text-qblack font-semibold">
                {singleSecondAdData?.title_two}
              </h1>
            </div>
          </div>
          <Link href={`products?category=%2B${singleSecondAdData?.category_link}`}>
            <ShopNowBtn color={{ textColor: "text-qblack" }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroStatic;
