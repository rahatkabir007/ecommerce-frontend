import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";

interface Props {
  header: string;
}

const FooterHeader: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const header = props.header;

  return <h1 className="text-lg font-medium text-[#2F2F2F] mb-5">{header}</h1>;
};

export default FooterHeader;
