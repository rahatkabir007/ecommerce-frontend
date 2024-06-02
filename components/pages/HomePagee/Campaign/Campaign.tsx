import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import ShopNowBtn from "../../../helpers/Buttons/ShopNowBtn";
import styles from "./Campaign.module.css";
import img1 from "./googlePlay.png";
import img2 from "./app.png";
import Link from "next/link";
import CountDown from "../../FlashSalePage/CountDown";

interface Props {
  // saleData: any;
}

const Campaign: React.FC<Props> = (props) => {
  const saleData = useSelector(() => controller.states.flashSale);
  const [loading, setLoading] = useState(true);
  const [outputTime, setOutputTime] = useState("");

  useEffect(() => {
    if (saleData) {
      const date = new Date(saleData.time);
      const outputDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      setOutputTime(outputDate);
      setLoading(false);
    }
  }, [saleData]);

  return (
    <div className="w-full lg:h-[460px] md:mb-[60px] mb-[30px]">
      <div className="container-x mx-auto h-full">
        <div className="lg:flex xl:space-x-[30px] lg:space-x-5 items-center h-full">
          {saleData?.status == "active" ? (
            <>
              <div
                style={{
                  backgroundImage: `url(${saleData?.imageHome})`,
                }}
                className={`${styles["campaign-countdown"]} lg:w-1/2 h-[300px] sm:h-[400px] lg:h-full w-full mb-5 lg:mb-0`}
              >
                <div className="w-full xl:p-12 p-5">
                  <div className="w-full flex lg:justify-between justify-evenly lg:mb-10 mb-2">
                    {!loading && outputTime && (
                      <CountDown outputTime={outputTime} />
                    )}
                  </div>
                  <div className="mb-4">
                    <h1 className="text-[44px] text-qblack font-semibold">
                      {saleData?.title}
                    </h1>
                  </div>
                  <Link href={"/flash_sale"}>
                    <ShopNowBtn color={{ textColor: "text-qblack" }} />
                  </Link>
                </div>
              </div>
              <div
                className={`${styles["download-app"]} flex-1 lg:h-full h-[430px] xl:p-12 p-5 aos-init aos-animate`}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-[13px] font-semibold text-qblack mb-3">
                      MOBILE APP VERSION
                    </p>
                    <h1 className="lg:text-[30px] text-2xl font-semibold text-qblack leading-10 mb-8">
                      Get Our
                      <span className="text-qred border-b-2 border-qred mx-2">
                        Mobile App
                      </span>
                      <br />
                      It's Make easy for you life!
                    </h1>
                    <div className="flex space-x-5 items-center">
                      <div className="bg-white w-[170px] h-[60px] flex justify-center items-center cursor-pointer">
                        <Link
                          href={`https://play.google.com/store/apps`}
                          rel="noopener noreferrer"
                        >
                          <picture>
                            <img src={img1.src} alt="" />
                          </picture>
                        </Link>
                      </div>
                      <div className="bg-white w-[170px] h-[60px] flex justify-center items-center cursor-pointer">
                        <Link
                          href={`https://www.apple.com/app-store/`}
                          rel="noopener noreferrer"
                        >
                          <picture>
                            <img src={img2.src} alt="" />
                          </picture>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div
              className={`${styles["download-app"]} flex-1 lg:h-full h-[430px] xl:p-12 p-5 aos-init aos-animate`}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <p className="text-[13px] font-semibold text-qblack mb-3">
                    MOBILE APP VERSION
                  </p>
                  <h1 className="lg:text-[30px] text-2xl font-semibold text-qblack leading-10 mb-8">
                    Get Our
                    <span className="text-qred border-b-2 border-qred mx-2">
                      Mobile App
                    </span>
                    <br />
                    It's Make easy for you life!
                  </h1>
                  <div className="flex space-x-5 items-center">
                    <div className="bg-white w-[170px] h-[60px] flex justify-center items-center cursor-pointer">
                      <Link
                        href={`https://play.google.com/store/apps`}
                        rel="noopener noreferrer"
                      >
                        <picture>
                          <img src={img1.src} alt="" />
                        </picture>
                      </Link>
                    </div>
                    <div className="bg-white w-[170px] h-[60px] flex justify-center items-center cursor-pointer">
                      <Link
                        href={`https://www.apple.com/app-store/`}
                        rel="noopener noreferrer"
                      >
                        <picture>
                          <img src={img2.src} alt="" />
                        </picture>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Campaign;
