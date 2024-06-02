import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import DeliveryComponents from "../DeliveryPolicyData/DeliveryComponents";
import HeroSlider from "./HeroSctionSlider/HeroSlider";
import HeroStatic from "./StaticHeroSection/HeroStatic";

interface Props { }

const HeroSection: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="w-full pt-[22px]">
      <div></div>
      <div className="w-full banner">
        <div className="container-x mx-auto pb-[15px] md:pb-[60px]">
          <div className="main-wrapper w-full">
            <div className="banner-card xl:flex xl:space-x-[30px] xl:h-[600px] mb-[30px]">
              <HeroSlider />
              <HeroStatic />
            </div>
            <DeliveryComponents />
          </div>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
