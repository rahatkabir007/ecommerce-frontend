import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IBlog } from "../../../interfaces/models";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { controller } from "../../../src/state/StateController";
import PageHeader from "../../shared/SharedPageHeader/PageHeader";

import BlogsCards from "./BlogsCards";

interface Props {}

const Blogs: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [blogsData, setBlogsData] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchAllBlogsData = async () => {
      const { res, err } = await EcommerceApi.getAllBlogs();
      if (err) {
        console.log(err);
      } else {
        setBlogsData(res.allBlogs);
      }
    };
    fetchAllBlogsData();
  }, []);

  return (
    <div>
      <PageHeader slug="Blogs" link="/blogs" title="Blogs" />
      <BlogsCards blogsData={blogsData} setBlogsData={setBlogsData} />
    </div>
  );
};

export default Blogs;
