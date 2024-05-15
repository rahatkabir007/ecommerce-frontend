import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import { MdOutlineMail } from "react-icons/md";
import { EcommerceApi } from "../../../src/API/EcommerceApi";

interface Props {}

const FooterCta: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const addSubscriber = async (e: any) => {
    e.preventDefault();
    const subs = {
      email: e.target.email.value,
      user_slug: states.user?.slug,
    };
    const { res, err } = await EcommerceApi.addSubscriber(subs);
    if (res) {
      // console.log(res);
      e.target.reset();
    } else {
      console.log(err);
    }
  };

  return (
    <div
      className="h-[307px] bg-cover bg-center bg-no-repeat flex justify-center items-end"
      style={{
        backgroundImage:
          "url(https://api.websolutionus.com/shopo/uploads/website-images/banner-2022-09-25-05-12-43-6914.png)",
      }}>
      <div className="mb-[70px]">
        <h1 className="sm:text-3xl text-xl font-bold mb-2 text-center">
          Get our latest offer
        </h1>
        <p className="text-center sm:text-[18px] text-sm">by subscription</p>
        <form onSubmit={addSubscriber}>
          <div
            data-aos="fade-right"
            className="sm:w-[543px] w-[300px] h-[54px] flex mt-8 aos-init aos-animate">
            <div className="flex-1 bg-white pl-4 flex space-x-2 items-center h-full">
              <span>
                <MdOutlineMail className="text-lg w-5 h-5 text-[#9A9A9A]" />
              </span>
              <input
                type="email"
                name="email"
                className="w-full h-full focus:outline-none text-sm placeholder:text-xs tracking-wider"
                placeholder="EMAIL ADDRESS"
              />
            </div>
            <button
              type="submit"
              className="sm:w-[158px] w-[80px] h-full text-sm bg-yellow-400 font-semibold">
              Get the Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FooterCta;
