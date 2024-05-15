import React from "react";
import { useSelector } from "react-redux";
import Blogs from "../../components/pages/BlogsPage/Blogs";
import { controller } from "../../src/state/StateController";
interface Props {}
const blogs: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  return <Blogs />;
};

export default blogs;
