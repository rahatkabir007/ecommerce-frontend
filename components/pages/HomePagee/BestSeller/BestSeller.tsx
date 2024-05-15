import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { Jsondata } from "../../../../src/utils/Jsondata";
import SectionHeader from "../SectionHeader";
import styles from "./BestSeller.module.css";
interface Props { }

const BestSeller: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div
      className={`${styles["best-sellers-section"]} w-full md:mb-[60px] mb-[30px]`}
    >
      <div className="container-x mx-auto">
        <SectionHeader title="Best Seller" link="/" />
        <div className={styles["section-content"]}>
          <div className="w-full">
            <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 xl:gap-[30px] sm:gap-5 gap-2">
              {Jsondata.bestSeller.map((item, index) => {
                return (
                  <div className="item w-full flex flex-col items-center">
                    <div className="sm:w-[170px] sm:h-[170px] w-[140px] h-[140px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2 relative">
                      <span className={styles["item-span"]}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles["item-img"]}
                        />
                      </span>
                    </div>
                    <a href="" rel="noopener noreferrer">
                      <p className="text-base font-medium text-center cursor-pointer">
                        {item.name}
                      </p>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
