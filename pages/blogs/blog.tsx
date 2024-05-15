import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import SingleBlogPage from "../../components/pages/BlogsPage/SingleBlogPage";
import { IBlog, IBlogComment } from "../../interfaces/models";
import { EcommerceApi } from "../../src/API/EcommerceApi";
import { controller } from "../../src/state/StateController";

interface Props {
  blogData: IBlog | any;
  blogComments: IBlogComment[] | [];
}

const blog: React.FC<Props> = ({ blogData, blogComments }) => {
  console.log(blogData);

  const states = useSelector(() => controller.states);

  return <SingleBlogPage blogData={blogData} blogComments={blogComments} />;
};

export async function getServerSideProps(context: any) {
  console.log(context.query.slug);

  const slug = context.query.slug || "iphone_12_is_very_good_1rr2-Op57";

  const { res, err } = await EcommerceApi.getSingleBlog(slug);
  const { res: blogCommentsRes, err: commentsErr } = await EcommerceApi.getBlogComments(slug);

  if (res && blogCommentsRes) {
    return {
      props: {
        blogData: res,
        blogComments: blogCommentsRes
      }, // will be passed to the page component as props
    };
  } else {
    return {
      props: {}, // will be passed to the page component as props
    };
  }
}

export default blog;
