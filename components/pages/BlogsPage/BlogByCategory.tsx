import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import BlogsCards from "./BlogsCards";

interface Props {}

const BlogByCategory: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [cat, setCat] = useState("");

  return <div>BlogByCategory</div>;
};

export default BlogByCategory;
