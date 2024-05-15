import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import { Jsondata } from "../../../src/utils/Jsondata";
import FooterHeader from "./FooterHeader";

interface Props {}

const FooterBody: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="container-x mx-auto pt-[56px] px-2">
      <div className="w-full flex flex-col items-center mb-[50px]">
        <Link href="/">
          <img
            className="mb-[40px]"
            src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Flogo-2022-11-22-11-19-02-4634.png&w=256&q=75"
            alt=""
          />
        </Link>
        <div className="w-full h-px bg-[#E9E9E9]"></div>
      </div>
      <div className="lg:flex justify-between mb-[50px]">
        <div className="lg:w-[424px] ml-0 w-full mb-10 lg:mb-0">
          <FooterHeader header="About Us" />
          <p className="text-[#9A9A9A] text-[15px] w-[247px] leading-[28px]">
            We know there are a lot of threat developers our but we pride into a
            firm in the industry.
          </p>
        </div>
        <div className="flex-1 lg:flex">
          {Jsondata.footerData.map(({ header, links }, idx) => (
            <div key={idx} className="lg:w-1/3 w-full mb-10 lg:mb-0">
              <div className="mb-5">
                <FooterHeader header={header} />
              </div>
              <ul className="flex flex-col gap-y-4">
                {links.map(({ title, url }, idx) => (
                  <li key={idx}>
                    <Link href={"/" + url}>
                      <span className="text-[#9A9A9A] text-[15px] hover:text-gray-900 border-b border-transparent hover:border-gray-900 cursor-pointer capitalize">
                        {title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-px bg-[#E9E9E9]"></div>
    </div>
  );
};

export default FooterBody;
