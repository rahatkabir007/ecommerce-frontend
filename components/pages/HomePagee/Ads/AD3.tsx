import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAd } from "../../../../interfaces/models";
import { EcommerceApi } from "../../../../src/API/EcommerceApi";
import { controller } from "../../../../src/state/StateController";
import ShopNowBtn from "../../../helpers/Buttons/ShopNowBtn";
import styles from "./Ads.module.css";
interface Props {}

const AD3: React.FC<Props> = (props) => {
  const singleAdData = useSelector(() => controller.states.adTwo);

  return (
    <div className="w-full text-white md:mb-[60px] mb-[30px]">
      <div className="container-x mx-auto">
        <div className="one-column-ads-one sm:h-[166px] h-[100px] w-full">
          <div
            //   ${styles["ad3-bg"]}
            style={{
              backgroundImage: `url(${singleAdData?.adImage})`,
              backgroundSize: `cover`,
              backgroundRepeat: `no-repeat`,
            }}
            className={` w-full h-full flex justify-center items-center md:pl-[80px] pl-3 md:py-[40px] py-4`}
          >
            <div className="w-full h-full flex flex-col justify-evenly">
              <div>
                <div>
                  <h1 className="md:text-[30px] text-[20px] md:leading-[40px] font-semibold">
                    Get the best deal for Headphones
                  </h1>
                </div>
              </div>
              <Link href={`products?category=%2B${singleAdData?.category_link}`}>
                <ShopNowBtn color={{ textColor: "text-qred" }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AD3;
