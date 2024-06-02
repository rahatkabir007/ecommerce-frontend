import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import SingleBlogPage from "../../components/pages/BlogsPage/SingleBlogPage";
import { IBlog, IBlogComment } from "../../interfaces/models";
import { EcommerceApi } from "../../src/API/EcommerceApi";
import { controller } from "../../src/state/StateController";
import SharedHead from "../../components/shared/SharedHead/SharedHead";

interface Props {
  blogData: IBlog | any;
  blogComments: IBlogComment[] | [];
}

const blog: React.FC<Props> = ({ blogData, blogComments }) => {
  const states = useSelector(() => controller.states);

  const router = useRouter();

  if (!blogData) {
    router.replace("/404");
    return <></>;
  }


  return (
    <>
      <SharedHead
        title={blogData.title}
        keyword={blogData.seo_title}
        desc={blogData.seo_description}
      />
      <SingleBlogPage blogData={blogData} blogComments={blogComments} />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const slug = context.query.slug || "iphone_12_is_very_good_1rr2-Op57";

  const { res, err } = await EcommerceApi.getSingleBlog(slug);
  const { res: blogCommentsRes, err: commentsErr } =
    await EcommerceApi.getBlogComments(slug);

  if (res && blogCommentsRes) {
    return {
      props: {
        blogData: res,
        blogComments: blogCommentsRes,
        fallback: false,
      },
    };
  } else {
    return {
      props: {
        fallback: false,
      },
    };
  }
}

export default blog;
