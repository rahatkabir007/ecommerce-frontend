import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import ViewMoreBtn from "../../helpers/Buttons/ViewMoreBtn";

interface Props {
  title: string;
  link: string;
}

const SectionHeader: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const { title, link } = props;

  return (
    <div className="mb-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="sm:text-3xl text-xl font-semibold leading-none">
          {title}
        </h1>
        <ViewMoreBtn link={link} />
      </div>
    </div>
  );
};

export default SectionHeader;
