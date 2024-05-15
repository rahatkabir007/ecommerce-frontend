import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAd } from "../../../../interfaces/models";
import { EcommerceApi } from "../../../../src/API/EcommerceApi";
import { controller } from "../../../../src/state/StateController";
import ShopNowBtn from "../../../helpers/Buttons/ShopNowBtn";
import styles from "./Ads.module.css";

interface Props {}

const AD1: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="two-column-ads-section md:mb-[60px] lg:h-[295px] h-[200px] mb-[30px] w-full">
      <div className="container-x mx-auto h-full">
        <div className="sm:flex xl:space-x-[30px] md:space-x-5 items-center w-full h-full  overflow-hidden">
          <div className="h-full sm:w-1/2 w-full">
            <div
              style={{
                // ${singleAdData?.adImage}
                //
                backgroundImage: `url("https://api.websolutionus.com/shopo/uploads/website-images/Mega-menu-2022-10-27-01-43-02-7910.png")`,
                backgroundSize: `cover`,
                backgroundRepeat: `no-repeat`,
              }}
              className={`w-full h-full relative pl-[50px] py-[35px] flex flex-col justify-between`}
            >
              <div>
                <div className="lg:mb-[22px] mb-2.5">
                  <span className="text-qblack uppercase text-xs font-semibold">
                    Headset
                  </span>
                </div>
                <div className="lg:mb-[30px] mb-2.5">
                  <p className="lg:text-[30px] text-[20px] leading-none text-qblack font-semibold lg:mb-3">
                    Best Wireless
                  </p>
                  <p className="lg:text-[30px] text-[20px] lg:leading-[40px] text-qblack font-semibold">
                    {" "}
                    Headphone
                  </p>
                </div>
              </div>
              <div>
                <ShopNowBtn color={{ textColor: "text-qblack" }} />
              </div>
            </div>
          </div>
          <div className="h-full sm:w-1/2 w-full">
            <div
              className={`${styles["ad1-bg2"]} w-full h-full relative pl-[50px] py-[35px] flex flex-col justify-between`}
            >
              <div>
                <div className="lg:mb-[22px] mb-2.5">
                  <span className="text-qblack uppercase text-xs font-semibold">
                    Smart Watch
                  </span>
                </div>
                <div className="lg:mb-[30px] mb-2.5">
                  <p className="lg:text-[30px] text-[20px] leading-none text-qblack font-semibold lg:mb-3">
                    Samsung
                  </p>
                  <p className="lg:text-[30px] text-[20px] lg:leading-[40px] text-qblack font-semibold">
                    Smart Watch ll
                  </p>
                </div>
              </div>
              <div>
                <ShopNowBtn color={{ textColor: "text-qblack" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AD1;
