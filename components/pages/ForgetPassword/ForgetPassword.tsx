import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import { SocialLogin } from "../../helpers/SocialLogin";
import SharedLoginSignupImage from "../../shared/SharedLoginSignupImage/SharedLoginSignupImage";
import Style from "./ForgetPassword.module.css";
interface Props {}

const ForgetPassword: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const forgetPass = async (e:any) => {
    SocialLogin.forgetEmail(e.target.email.value)
  }

  return (
    <div className="w-full min-h-screen  pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack capitalize">
                    Forgot password
                  </h1>
                  <div className="shape -mt-6">
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
                        stroke-width="2"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                  </div>
                </div>
                <form className="input-area" onSubmit={(e) => forgetPass(e) }>
                  <div className="input-item mb-5">
                    <div className="input-com w-full h-full">
                      <label
                        className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                        htmlFor="email"
                      >
                        Email Address*
                      </label>
                      <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                        <input
                          placeholder="Email Address"
                          className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                          type="email"
                          id="email"
                          name="email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="signin-area mb-3.5">
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className={`${Style["black-btn"]} mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center`}
                      >
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <SharedLoginSignupImage></SharedLoginSignupImage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
