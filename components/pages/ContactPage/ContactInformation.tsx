import React from "react";
import { useSelector } from "react-redux";
import { GoLocation } from "react-icons/go";
import mapss from "./mapss.png";
import { controller } from "../../../src/state/StateController";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import { SvgPaths } from "../../../src/utils/SvgPaths";

interface Props {}

const ContactInformation: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="lg:w-1/2 w-full">
      <h1 className="text-[22px] font-semibold text-qblack leading-[30px] mb-1">
        Contact Information
      </h1>
      <p className="text-[15px] text-qgray leading-[30px] mb-5">
        Fill the form below or write us .We will help you as soon as possible.
      </p>
      <div className="xl:flex xl:space-x-[30px] mb-[30px]">
        <div className="xl:w-1/2 w-full h-[196px] flex flex-col item justify-center bg-[#FFEAE5] p-5">
          <div className="flex justify-center mb-3 ">
            <span className="h-11 w-11 border border-[#FFBB38] rounded-full">
              <SvgIconRenderer
                className="h-6 w-6 m-2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                path={SvgPaths.phoneIconInContact}
                pathFill="#FFBB38"
              />
            </span>
          </div>
          <p className="text-[22px] text-black leading-[30px] text-center font-semibold">
            phone
          </p>
          <p className="text-[15px] text-black leading-[30px] text-center">
            +88 01682 825 123
          </p>
        </div>
        <div className="xl:w-1/2 w-full h-[196px] flex flex-col item justify-center bg-[#D3EFFF] p-5">
          <div className="flex justify-center mb-3 ">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 43C33.598 43 43 33.598 43 22C43 10.402 33.598 1 22 1C10.402 1 1 10.402 1 22C1 33.598 10.402 43 22 43ZM22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
                fill="#FFBB38"></path>
              <path
                d="M11.0183 18.6455C11.2024 18.761 11.3464 18.8458 11.4851 18.9382C14.2825 20.8029 17.0792 22.6676 19.8759 24.5331C21.3894 25.5429 22.6125 25.5413 24.1329 24.5277C26.9304 22.663 29.7271 20.7975 32.5237 18.9328C32.6539 18.8465 32.7856 18.7634 32.9659 18.6478C32.9782 18.8042 32.9959 18.9212 32.9959 19.0391C32.9974 22.1169 32.9997 25.1939 32.9959 28.2718C32.9944 29.6582 32.1625 30.4854 30.773 30.4862C24.9186 30.4877 19.0641 30.4877 13.2096 30.4862C11.8456 30.4854 11.0037 29.6543 11.0022 28.3003C10.9983 25.2086 11.0006 22.1169 11.0014 19.0245C11.0022 18.9151 11.0114 18.8065 11.0183 18.6455Z"
                fill="#FFBB38"></path>
              <path
                d="M22.0007 14.0029C24.963 14.0029 27.9261 13.9983 30.8883 14.0052C32.1292 14.0083 33.0427 14.9295 32.9934 16.1149C32.9633 16.8296 32.5944 17.3418 32.0082 17.7308C29.4226 19.4476 26.8424 21.1722 24.2598 22.8944C23.8793 23.1485 23.5042 23.4112 23.1145 23.6515C22.3766 24.1075 21.6133 24.1275 20.8901 23.6492C17.8839 21.6605 14.8862 19.6594 11.8915 17.6538C11.1213 17.1377 10.8333 16.2889 11.0936 15.4378C11.3547 14.5837 12.1288 14.0068 13.07 14.0045C15.889 13.9968 18.7088 14.0014 21.5278 14.0014C21.6857 14.0029 21.8436 14.0029 22.0007 14.0029Z"
                fill="#FFBB38"></path>
              <path
                fillRule="evenodd"
                clip-rule="evenodd"
                d="M32.0082 17.7308C32.5944 17.3418 32.9633 16.8296 32.9934 16.1149C33.0427 14.9295 32.1292 14.0083 30.8883 14.0052C28.7724 14.0003 26.6561 14.0012 24.5399 14.0022C23.6935 14.0025 22.8471 14.0029 22.0007 14.0029C21.8436 14.0029 21.6857 14.0029 21.5278 14.0014C20.759 14.0014 19.9902 14.001 19.2213 14.0007C17.1709 13.9998 15.1202 13.9989 13.07 14.0045C12.1288 14.0068 11.3547 14.5837 11.0936 15.4378C10.8333 16.2889 11.1213 17.1377 11.8915 17.6538C14.8862 19.6594 17.8839 21.6605 20.8901 23.6492C21.6133 24.1275 22.3766 24.1075 23.1145 23.6515C23.3977 23.4769 23.6732 23.2904 23.9487 23.104C24.0523 23.0339 24.1558 22.9638 24.2598 22.8944C24.9163 22.4566 25.5726 22.0186 26.229 21.5807C28.1545 20.2959 30.0799 19.0112 32.0082 17.7308ZM21.4417 22.8151C21.6574 22.9577 21.8376 23.0016 21.9909 23.0007C22.1486 22.9998 22.3464 22.9506 22.5888 22.8008L22.5896 22.8003C22.8536 22.6375 23.1029 22.4688 23.3716 22.287C23.4787 22.2145 23.5889 22.1399 23.7043 22.0628L23.705 22.0624C24.3607 21.6251 25.0165 21.1875 25.6725 20.7499C27.5985 19.4647 29.5255 18.179 31.4551 16.8977L31.4553 16.8976C31.8444 16.6394 31.9808 16.3923 31.9942 16.0729C32.0181 15.4929 31.5978 15.0071 30.886 15.0052M21.4417 22.8151C18.4378 20.8279 15.4419 18.8281 12.4482 16.823L21.4417 22.8151ZM12.0499 15.7302L12.0499 15.7303C11.9179 16.1618 12.0459 16.5534 12.448 16.8229M13.0727 15.0045L13.0724 15.0045C12.5581 15.0057 12.1793 15.3069 12.0499 15.7302M24.5417 15.0022C23.695 15.0025 22.848 15.0029 22.0007 15.0029H21.9984C21.8444 15.0029 21.6841 15.0029 21.523 15.0014C20.7548 15.0014 19.987 15.001 19.2194 15.0007C17.1695 14.9998 15.1212 14.9989 13.0727 15.0045M24.5417 15.0022C26.6573 15.0012 28.7714 15.0003 30.8859 15.0052L24.5417 15.0022Z"
                fill="#FFBB38"></path>
            </svg>
          </div>
          <p className="text-[22px] text-black leading-[30px] text-center font-semibold">
            Email
          </p>
          <p className="text-[15px] text-black leading-[30px] text-center">
            sadabrahman275@gmail.com
          </p>
        </div>
      </div>
      <div className="p-5 flex flex-col justify-between w-full bg-[#E7F2EC]">
        <div className="flex space-x-5">
          <span className="grid place-items-center h-11 w-11 border border-[#FFBB38] rounded-full">
            <GoLocation className="text-[#FFBB38] h-6 w-6 "></GoLocation>
          </span>
          <div>
            <h1 className="text-[22px] font-semibold text-qblack leading-[30px] mb-2">
              Address
            </h1>
            <p className="text-[15px] text-qblack leading-[30px]">
              Mirpur 11 ,Dhaka 1216 Bangladesh
            </p>
          </div>
        </div>
        <div className="w-full h-[206px] mt-5">
          <img src={mapss.src} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
