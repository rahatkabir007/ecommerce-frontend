import React, { useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import useCountDown from "../../shared/hooks/useCountDown";

interface Props {
  outputTime: any;
}

const CountDown: React.FC<Props> = ({ outputTime }) => {
  const states = useSelector(() => controller.states);
  const { days, hours, minutes, seconds } = useCountDown(outputTime);

  return (
    <div className="ltr:sm:mr-[75px] rtl:sm:ml-[75px] pr-9">
      <div className="countdown-wrapper  w-full flex sm:space-x-6 rtl:space-x-reverse space-x-3 sm:justify-between justify-evenly">
        <div className="countdown-item ">
          <div className="  countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
            <span className=" font-700 sm:text-[30px] font-bold text-base text-[#EB5757]">
              {days}
            </span>
          </div>
          <p className="sm:text-[18px] text-xs font-500 text-center leading-8 text-black">
            Days
          </p>
        </div>
        <div className="countdown-item">
          <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
            <span className="font-700 sm:text-[30px] font-bold text-base text-[#d557eb]">
              {hours}
            </span>
          </div>
          <p className="sm:text-[18px] text-xs font-500 text-center leading-8 text-black">
            Hours
          </p>
        </div>
        <div className="countdown-item">
          <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
            <span className="font-700 sm:text-[30px] font-bold text-base text-[#5772eb]">
              {minutes}
            </span>
          </div>
          <p className="sm:text-[18px] text-xs font-500 text-center leading-8 text-black">
            Minutes
          </p>
        </div>
        <div className="countdown-item">
          <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
            <span className="font-700 sm:text-[30px] font-bold text-base text-[#57ebd7]">
              {seconds}
            </span>
          </div>
          <p className="sm:text-[18px] text-xs font-500 text-center leading-8 text-black">
            Seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
