import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { ISeller, IUser } from "../../../../interfaces/models";
import ProductCard from "../../../shared/SharedProductCard/ProductCard";

interface Props {
  seller: ISeller | null;
}

const SellerInfo: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const { seller } = props;

  return (
    <div className="container-x mx-auto">
      <div
        data-aos="fade-up"
        className="w-full tab-content-item aos-init aos-animate"
      >
        <div className="saller-info-wrapper w-full">
          <div className="saller-info sm:flex justify-between items-center pb-[30px] border-b border-[#E8E8E8]">
            <div className="sm:flex sm:space-x-5 items-center sm:w-1/4">
              <div className="saller w-[73px] h-[73px] rounded-full overflow-hidden relative">
                <span>
                  <img
                    alt="saller"
                    src={seller?.avatar}
                    decoding="async"
                    data-nimg="fill"
                    className="w-full h-full object-cover"
                    sizes="100vw"
                  />
                  <noscript></noscript>
                </span>
              </div>
              <div>
                <h6 className="text-[18px] font-medium leading-[30px]">
                  {seller?.fullName}
                </h6>
                {seller?.address && (
                  <p className="text-[13px] font-normal text-qgray leading-[30px]">
                    {`${seller?.address?.city}, ${seller?.address?.country}`}
                  </p>
                )}
                <div className="flex items-center mt-4">
                  <div className="flex">
                    <span className="text-gray-500">
                      <svg
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                          fill="#D2D8E1"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-gray-500">
                      <svg
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                          fill="#D2D8E1"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-gray-500">
                      <svg
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                          fill="#D2D8E1"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-gray-500">
                      <svg
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                          fill="#D2D8E1"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-gray-500">
                      <svg
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                          fill="#D2D8E1"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <span className="text-[13px] font-normal ml-1 leading-none">
                    (0)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full sm:flex sm:space-x-5 justify-between sm:ml-[60px] mt-5 sm:mt-0">
              <div className="w-full mb-5 sm:mb-0">
                <ul>
                  <li className="text-qgray leading-[30px]">
                    <span className="text-[15px] text-qblack font-medium capitalize">
                      products
                    </span>
                    : {seller?.sellerProducts?.length}
                  </li>
                  <li className="text-qgray leading-[30px]">
                    <span className="text-[15px] text-qblack font-medium capitalize">
                      Shop Name
                    </span>
                    : {seller?.shop?.shop_name}
                  </li>
                  {seller?.phone && (
                    <li className="text-qgray leading-[30px]">
                      <span className="text-[15px] text-qblack font-medium capitalize">
                        phone
                      </span>
                      : {seller?.phone}
                    </li>
                  )}
                </ul>
              </div>
              <div className="w-full "></div>
            </div>
          </div>
          <div className="saller-product w-full mt-[30px]">
            <h1 className="text-[18px] font-medium mb-5">Product from Shop</h1>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
              {seller?.sellerProducts?.map((product) => (
                <ProductCard product={product}></ProductCard>
              ))}
            </div>
          </div>
          <div className="mt-[40px] w-full flex justify-center">
            <a
              rel="noopener noreferrer"
              href="/seller-products?seller=rikayi-rox"
            >
              <div className="lg:w-[300px] w-full h-[50px]">
                <div
                  className="w-full h-full yellow-btn text-qblack font-semibold"
                  style={{ fontSize: " 16px" }}
                >
                  View Shop
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
