import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";

interface Props {}

const GetInTouch: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="flex-1 bg-white sm:p-10 p-3">
      <div className="title flex flex-col items-center">
        <h1 className="text-[34px] font-bold text-qblack">Get In Touch</h1>
        <span className="-mt-5 block">
          <svg
            width="354"
            height="30"
            viewBox="0 0 354 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
              stroke="#FFBB38"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
          </svg>
        </span>
      </div>
      <div className="inputs mt-5">
        <div className="mb-4">
          <div className="input-com w-full h-full">
            <label
              className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
              htmlFor="name"
            >
              Name*
            </label>
            <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
              <input
                placeholder="Name"
                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                id="name"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="input-com w-full h-full">
            <label
              className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
              htmlFor="email"
            >
              Email Address*
            </label>
            <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
              <input
                placeholder="Email"
                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                id="email"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="input-com w-full h-full">
            <label
              className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
              htmlFor="subject"
            >
              Subject*
            </label>
            <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
              <input
                placeholder="Your Subject here"
                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                id="subject"
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
            Message*
          </h6>
          <textarea
            placeholder="Type your message here"
            className=" w-full h-[105px] focus:ring-0 focus:outline-none p-3 border placeholder:text-sm border-qgray-border"
          ></textarea>
        </div>
        <div>
          <button
            disabled
            type="button"
            className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-qblack text-white text-sm font-semibold w-full h-[50px] flex justify-center items-center"
          >
            <span>Send Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
