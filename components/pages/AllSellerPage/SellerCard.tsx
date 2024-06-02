import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { ISeller } from "../../../interfaces/models";
import { controller } from "../../../src/state/StateController";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import Styles from "./SellerCard.module.css";
interface Props {
  seller: ISeller;
  //   shopName: string;
  //   email: string;
  //   phone: string;
  //   address: string;
}

const SellerCard: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const { seller } = props;

  return (
    <div>
      <div
        data-aos="fade-up"
        className="item w-full aos-init aos-animate mt-[15px]"
      >
        <div
          className={`w-full sm:h-[328px] sm:p-[30px] p-5 ${Styles["bg-image"]}`}
        >
          <div className="flex sm:flex-row flex-col-reverse sm:items-center justify-between w-full h-full">
            <div className="flex flex-col justify-between h-full">
              <div className="">
                <h1 className="text-[30px] font-semibold text-qblack capitalize">
                  {props.seller.shop?.shop_name}
                </h1>
                <div className="flex space-x-2 items-center mb-[30px]">
                  <div className="flex ">
                    <span>
                      <SvgIconRenderer
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        path={SvgPaths.ratingIcon}
                        pathFill="#FFA800"
                      />
                    </span>
                    <span>
                      <SvgIconRenderer
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        path={SvgPaths.ratingIcon}
                        pathFill="#FFA800"
                      />
                    </span>
                    <span>
                      <SvgIconRenderer
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        path={SvgPaths.ratingIcon}
                        pathFill="#FFA800"
                      />
                    </span>
                    <span>
                      <SvgIconRenderer
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        path={SvgPaths.ratingIcon}
                        pathFill="#FFA800"
                      />
                    </span>
                    <span>
                      <SvgIconRenderer
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        path={SvgPaths.ratingIcon}
                        pathFill="#FFA800"
                      />
                    </span>
                  </div>
                  <span className="text-[15px] font-bold text-qblack ">
                    (5)
                  </span>
                </div>
                <div className="saller-text-details">
                  <ul>
                    <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                      <span>
                        <SvgIconRenderer
                          width="16"
                          height="12"
                          viewBox="0 0 16 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          path={SvgPaths.emailIconBlack}
                          pathFill="black"
                        />
                      </span>
                      <span>{props.seller.email}</span>
                    </li>
                    <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                      <span>
                        <SvgIconRenderer
                          width="15"
                          height="14"
                          viewBox="0 0 15 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          path={SvgPaths.phoneIcon}
                          pathFill="black"
                        />
                      </span>
                      <span>{props.seller.phone}</span>
                    </li>
                    <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                      <span>
                        <SvgIconRenderer
                          width="14"
                          height="19"
                          viewBox="0 0 14 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          path={SvgPaths.locationIcon}
                          pathFill="black"
                        />
                      </span>
                      <span className="line-clamp-1">
                        {props.seller?.shop?.shop_address}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="w-[116px] h-[40px] cursor-pointer">
                  <Link
                    href={`/seller_products?seller=${props.seller?.shop?.shop_name}`}
                  >
                    <div className="yellow-btn flex justify-center">
                      <div className="flex space-x-2 items-center">
                        <span>Shop Now</span>
                        <span>
                          <svg
                            width="7"
                            height="11"
                            viewBox="0 0 7 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="1.0918"
                              y="0.636719"
                              width="6.94219"
                              height="1.54271"
                              transform="rotate(45 1.0918 0.636719)"
                              fill="#1D1D1D"
                            ></rect>
                            <rect
                              x="6.00195"
                              y="5.54492"
                              width="6.94219"
                              height="1.54271"
                              transform="rotate(135 6.00195 5.54492)"
                              fill="#1D1D1D"
                            ></rect>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="flex sm:justify-center justify-start">
                <div className="w-[170px] h-[170px] rounded-full bg-white mb-[20px] flex justify-center items-center relative overflow-hidden">
                  <span
                    style={{
                      boxSizing: "border-box",
                      display: "block",
                      overflow: "hidden",
                      width: "initial",
                      height: "initial",
                      background: "none",
                      opacity: 1,
                      border: 0,
                      margin: 0,
                      padding: 0,
                      position: "absolute",
                      inset: 0,
                    }}
                  >
                    <img
                      alt=""
                      src={props.seller?.shop?.shop_logo}
                      decoding="async"
                      data-nimg="fill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        boxSizing: "border-box",
                        padding: 0,
                        border: "none",
                        margin: "auto",
                        display: "block;",
                        width: 0,
                        height: 0,
                        minWidth: "100%",
                        maxWidth: "100%",
                        minHeight: "100%",
                        maxHeight: "100%",
                        objectFit: "scale-down",
                      }}
                      sizes="100vw"
                    />
                  </span>
                </div>
              </div>
              <h1 className="sm:block hidden text-[30px] font-semibold text-qblack text-center leading-none">
                {props.seller?.shop?.shop_name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerCard;
