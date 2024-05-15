import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import About from "../components/pages/AboutPage/About";
import { controller } from "../src/state/StateController";

interface Props {}

const about: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <Suspense fallback={<div>Loading</div>}><About /></Suspense>;
};

export default about;
