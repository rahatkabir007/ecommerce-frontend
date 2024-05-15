import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import { FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";

interface Props {}

const FooterBottom: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="container-x mx-auto lg:h-[82px] flex lg:flex-row flex-col-reverse justify-between items-center text-[#9A9A9A]">
      <div className="flex lg:gap-x-5 gap-x-3 justify-between items-center mb-3 lg:mb-0 mt-2 lg:mt-0">
        <div className="flex gap-x-5 items-center">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer noopener"
            title="facebook-link"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noreferrer noopener"
            title="twitter-link"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer noopener"
            title="linkedin-link"
          >
            <FaLinkedin />
          </a>
        </div>
        <span className="sm:text-base text-[10px] font-light">
          ©2023 RichCommerce All rights reserved
        </span>
      </div>
      <span className="mt-2 lg:mt-0">
        <a href="#" title="payment-gateways">
          <img
            src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Fpayment-card-2022-09-26-12-59-29-8933.png&w=384&q=75"
            alt=""
          />
        </a>
      </span>
    </div>
  );
};

export default FooterBottom;
