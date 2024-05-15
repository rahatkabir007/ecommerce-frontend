import React, { useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import { Jsondata } from "../../../src/utils/Jsondata";
import ShopNowBtn from "../../helpers/Buttons/ShopNowBtn";
import ProductCard from "../../shared/SharedProductCard/ProductCard";
import BestDealBanner from "../HomePagee/BestDealBanner/BestDealBanner";
import ProductCardVertical from "./../../shared/SharedProductCard/ProductCardVertical";

interface Props {
  bannerImg?: string;
  setShowFilterWidget: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryItemsRight: React.FC<Props> = ({ setShowFilterWidget }) => {
  const states = useSelector(() => controller.states);

  const [cardType, setCardType] = useState("normal");

  const bannerImg =
    "https://api.websolutionus.com/shopo/uploads/website-images/Mega-menu-2022-10-27-01-44-41-4959.png";

  return (
    <div className="w-full">
      <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
        <div>
          <p className="font-400 text-[13px]">
            <span className="text-qgray"> Showing</span> 1-7 of 7 results
          </p>
        </div>
        <div className="flex space-x-3 items-center">
          <span className="font-bold text-qblack text-[13px]">View by :</span>
          <button
            type="button"
            className={`hover:text-qgreen w-6 h-6 ${
              cardType === "normal" ? "text-qgreen" : "text-qgray"
            }`}
            onClick={() => setCardType("normal")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M11 5H5v14h6V5zm2 0v14h6V5h-6zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"></path>
            </svg>
          </button>
          <button
            type="button"
            className={`hover:text-qgreen w-6 h-6 ${
              cardType === "vertical" ? "text-qgreen" : "text-qgray"
            }`}
            onClick={() => setCardType("vertical")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M19 11V5H5v6h14zm0 2H5v6h14v-6zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"></path>
            </svg>
          </button>
        </div>
        <button
          type="button"
          onClick={() => setShowFilterWidget(true)}
          className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`grid ${
          cardType === "normal"
            ? "xl:grid-cols-3 sm:grid-cols-2"
            : "lg:grid-cols-2"
        }  grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]`}
      >
        {states.filteredProducts.slice(0, 6).map((product) => {
          if (cardType === "normal") {
            return <ProductCard product={product} />;
          } else {
            return <ProductCardVertical product={product} />;
          }
        })}
      </div>
      {/******************************** banner ads **********************************/}
      <div className="w-full relative text-qblack mb-[40px]">
        <div className="one-column-ads-one sm:h-[166px] h-[100px] w-full">
          <div
            data-aos="fade-right"
            className="w-full h-full flex justify-center items-center md:pl-[80px] pl-3 md:py-[40px] py-4 group aos-init aos-animate"
            style={{
              backgroundImage: `url(${bannerImg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="w-full h-full flex flex-col justify-evenly">
              <div>
                <div className="">
                  <h1 className="md:text-[30px] text-[20px] md:leading-[40px] font-semibold">
                    Get the best deal for Headphones
                  </h1>
                </div>
              </div>
              <ShopNowBtn color={{ textColor: "text-qred" }} />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`grid ${
          cardType === "normal"
            ? "xl:grid-cols-3 sm:grid-cols-2"
            : "lg:grid-cols-2"
        }  grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]`}
      >
        {states.filteredProducts.slice(6).map((product) => {
          if (cardType === "normal") {
            return <ProductCard product={product} />;
          } else {
            return <ProductCardVertical product={product} />;
          }
        })}
      </div>

      {/* ekhane abar keno product add kora holo ???*/}
      {/* <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
        {Jsondata.newReleasedProducts.slice(7).map((product) => (
          <ProductCard product={product}></ProductCard>
        ))}
      </div> */}
    </div>
  );
};

export default CategoryItemsRight;
