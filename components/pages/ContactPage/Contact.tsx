import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import PageHeader from "../../shared/SharedPageHeader/PageHeader";
import ContactInformation from "./ContactInformation";
import GetInTouch from "./GetInTouchComponent/GetInTouch";

interface Props {}

const Contact: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <>
      <PageHeader slug="Contact" link="/contact" title="Contact" />
      <div className="w-full min-h-screen mt-10 pt-0 pb-0">
        <div className="container-x mx-auto">
          <div className="main-wrapper w-full lg:flex lg:space-x-[30px] my-16">
            <ContactInformation></ContactInformation>
            <GetInTouch />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
