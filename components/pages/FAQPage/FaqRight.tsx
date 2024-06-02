import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import emailjs from "@emailjs/browser";

interface Props {}

const FaqRight: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [formValue, setformValue] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  let form = useRef<any>();

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_0rgueuw",
        "template_20jt7nw",
        form.current,
        "ldVPHA88PMT4CEjob"
      )
      .then(
        (result: any) => {
          console.log(result.text);
        },
        (error: any) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div className="bg-white sm:p-10 p-5">
      <div className="flex flex-col items-center">
        <h1 className="lg:text-[34px] text-xl font-bold text-qblack">
          Have Any Question
        </h1>
        <span className="-mt-3 block">
          <svg
            width="354"
            height="30"
            viewBox="0 0 354 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
              stroke="#FFBB38"
              strokeWidth="2"
              strokeLinecap="round"></path>
          </svg>
        </span>
      </div>
      <form ref={form} onSubmit={(e) => sendEmail(e)}>
        <div className="mt-5">
          <div className="input-com w-full h-full mb-4">
            <label
              className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
              htmlFor="first_name">
              Name*
            </label>
            <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
              <input
                onChange={(e) => {
                  setformValue({ ...formValue, name: e.target.value });
                }}
                placeholder="Name"
                className="input-field placeholder:text-sm text-sm px-6 w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                id="first_name"
                type="text"
                name="user_name"
              />
            </div>
          </div>

          <div className="input-com w-full h-full mb-4">
            <label
              className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
              htmlFor="email">
              Email Address*
            </label>
            <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
              <input
                onChange={(e) => {
                  setformValue({ ...formValue, email: e.target.value });
                }}
                placeholder="Email Address"
                className="input-field placeholder:text-sm text-sm px-6 w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                id="email"
                type="email"
                name="user_email"
              />
            </div>
          </div>

          <div className="input-com w-full h-full mb-4">
            <label
              className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
              htmlFor="subject">
              Subject*
            </label>
            <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
              <input
                onChange={(e) => {
                  setformValue({ ...formValue, subject: e.target.value });
                }}
                placeholder="Subject"
                className="input-field placeholder:text-sm text-sm px-6 w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                id="subject"
                name="email_subject"
                type="text"
              />
            </div>
          </div>

          <div className="input-com w-full h-full mb-5">
            <label
              className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
              htmlFor="message">
              Message*
            </label>
            <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
              <textarea
                onChange={(e) => {
                  setformValue({ ...formValue, message: e.target.value });
                }}
                placeholder="Type your message here"
                className="input-field placeholder:text-sm text-sm px-6 py-3 w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                id="message"
                name="message"
                defaultValue=""
                spellCheck="false"
                style={{ height: "74px" }}
              />
            </div>
          </div>
          <input
            value="Send Now"
            disabled={
              formValue.email === "" ||
              formValue.name === "" ||
              formValue.subject === "" ||
              formValue.message === ""
            }
            type="submit"
            className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-qblack text-white text-sm font-semibold w-full h-[50px] flex justify-center items-center"
          />
        </div>
      </form>
    </div>
  );
};

export default FaqRight;
