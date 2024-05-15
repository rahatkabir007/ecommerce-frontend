import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import SvgIconRenderer from "../SvgIconRenderer";
import { SvgPaths } from "../../../src/utils/SvgPaths";

interface Props {
  link: string;
}

const ViewMoreBtn: React.FC<Props> = (props) => {
  const { link } = props;
  const states = useSelector(() => controller.states);

  return (
    <div>
      <Link href={link} rel="noopener noreferrer">
        <div className="flex space-x-2 items-center cursor-pointer">
          <p className="text-base font-bold text-qblack">View More</p>
          <span>
            <SvgIconRenderer
              xmlns={"http://www.w3.org/2000/svg"}
              width={"1em"}
              height={"1em"}
              preserveAspectRatio={"xMidYMid meet"}
              viewBox={"0 0 24 24"}
              path={SvgPaths.viewMoreBtnIcon}
              pathFill={"currentColor"}
            />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ViewMoreBtn;
