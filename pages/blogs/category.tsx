import React from "react";
import { useSelector } from "react-redux";
import BlogByCategory from "../../components/pages/BlogsPage/BlogByCategory";
import { controller } from "../../src/state/StateController";

interface Props {}

const category: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <BlogByCategory />;
};

export default category;
