import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import PageHeader from "../../shared/SharedPageHeader/PageHeader";
import Drawer from "./Drawer";
import FaqRight from "./FaqRight";

interface Props { }

const FAQ: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div>
      <PageHeader slug="FAQ" link="/faq" title="Frequently asked questions" />
      {/* <div className="w-full mb-10">
        <div className="container-x mx-auto w-full lg:flex lg:gap-x-[30px]">
      <FaqHeader /> */}
      <div className="w-full mb-10 ">
        <div className="container-x mx-auto w-full lg:flex lg:gap-x-[30px] mt-10">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
            <Drawer></Drawer>
          </div>
          {/* <div className="flex-1"></div> */}
          {/* <div className="flex-1">
            <FaqRight />
          </div> */}
          <div className="flex-1">
            <FaqRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
