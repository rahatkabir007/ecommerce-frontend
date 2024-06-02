import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IBlog, IBlogCategory, IBlogComment } from "../../../interfaces/models";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import BlogCommentCard from "./BlogCommentCard";
import { controller } from "../../../src/state/StateController";
import toast from "react-hot-toast";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import useWindowDimensions from "../../shared/hooks/useWindowDimensions";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import { createPortal } from "react-dom";

interface Props {
  blogData: IBlog;
  blogComments: IBlogComment[] | [];
}

const SingleBlogPage: React.FC<Props> = ({ blogData, blogComments }) => {
  const states = useSelector(() => controller.states);
  const [categories, setCategories] = useState<IBlogCategory[]>([]);
  const [cat, setCat] = useState("");
  const [byCategoryData, setByCategoryData] = useState<IBlog[]>([]);
  const [latestBlogsData, setLatestBlogsData] = useState<IBlog[]>([]);

  const router = useRouter();
  const shareableRoute = process.env.NEXT_PUBLIC_API_ENDPOINT + router.asPath;

  const { height, width } = useWindowDimensions();

  const FetchByCat = async () => {
    if (cat) {
      const { res, err } = await EcommerceApi.getFilteredBlog(cat);
      if (res) {
        setByCategoryData(res);
      } else {
        console.log(err);
      }
    }
  };

  const FetchBlogCat = async () => {
    const { res, err } = await EcommerceApi.getAllBlogCategories();
    if (res) {
      setCategories(res);
    } else {
      console.log(err);
    }
  };

  useEffect(() => {
    //@ts-ignore
    document.getElementById("blog-description").innerHTML =
      blogData.long_description || "";
    FetchByCat();
    FetchBlogCat();
  }, [cat]);

  //----------------------- addSubscriber ------------
  const addSubscriber = async (e: any) => {
    e.preventDefault();
    controller.setApiLoading(true);
    const subs = {
      email: e.target.email.value,
      user_slug: states.user?.slug,
    };
    if (states.user) {
      const { res, err } = await EcommerceApi.addSubscriber(subs);
      if (res) {
        e.target.reset();
        toast.success("Successfuly subscribed  !");
      }
    } else {
      toast.error("Please , Log In first  !");
    }
    controller.setApiLoading(false);
  };
  //---------------------------------------------------

  const timeline = (createdAt: string): string => {
    const dateObj = new Date(createdAt);
    // const options = { month: "long" };
    const year = dateObj.getFullYear();
    const date = dateObj.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      dateObj
    );
    return `${date} ${month} ${year}`;
  };

  useEffect(() => {
    const fetchAllLatestBlogsData = async () => {
      const { res, err } = await EcommerceApi.getAllBlogs();
      if (err) {
        console.log(err);
      } else {
        setLatestBlogsData(res.latestBlogs);
      }
    };
    fetchAllLatestBlogsData();
  }, []);

  const [blogCommentsState, setBlogCommentsState] = useState(blogComments);

  if (!blogData) return <></>;

  const handlePostComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!states.user) {
      toast.error("Please Login to Comment");
      return;
    }
    controller.setApiLoading(true);

    const formData = {
      userSlug: states.user?.slug,
      avatar: states.user?.avatar,
      blogSlug: blogData?.slug,
      name: e.currentTarget.userName.value,
      email: e.currentTarget.email.value,
      comment: e.currentTarget.comment.value,
    };

    const { res, err } = await EcommerceApi.postBlogComments(formData);

    if (res) {
      setBlogCommentsState((blogCommentsState) => [res, ...blogCommentsState]);
      //@ts-ignore
      e.target.reset();
      toast.success("Your Comment is Posted");
    }
    controller.setApiLoading(false);
  };

  return (
    <div>
      <div className="title-area md:mb-[60px] mt-2">
        <div className="w-full bg-[#FFFAEF] h-[173px] py-10 hidden lg:block">
          <div className="container-x mx-auto">
            <div className="font-normal text-[13px] text-qblack mb-[23px] print:hidden">
              <span>
                <Link href="/">
                  <span className="mx-1 capitalize">Home</span>
                </Link>
                <span className="separator">/</span>
              </span>
              <span>
                <Link href={`/blogs`}>
                  <span className="mx-1 capitalize">blogs</span>
                </Link>
              </span>
              <span className="separator">/</span>
              <span>
                <Link href={`/blogs/blog?slug=${blogData.slug}`}>
                  <span className="mx-1 capitalize">{blogData.title}</span>
                </Link>
              </span>
            </div>
            <div className="flex justify-center">
              <h1 className="text-3xl font-semibold text-qblack">
                Blog Details
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="content-area w-full">
        <div className="container-x mx-auto px-2">
          <div className="blog-article lg:flex lg:space-x-[30px] rtl:space-x-reverse mb-7">
            <div className="flex-1">
              <div className="img w-full  relative">
                <img
                  className="w-full max-h-[300px] object-cover"
                  src={blogData.imageURL}
                  alt=""
                />
              </div>
              <div className="blog pt-[24px]">
                <div className="short-data flex space-x-9 rtl:space-x-reverse items-center mb-3">
                  <div className="flex space-x-1.5 rtl:space-x-reverse items-center">
                    <SvgIconRenderer
                      width={width && width > 640 ? "12" : "10"}
                      height={width && width > 640 ? "15" : "12"}
                      viewBox="0 0 12 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      path={SvgPaths.adminIcon}
                      pathFill="#FFBB38"
                    />

                    <span className="text-xs md:text-base text-qgraytwo capitalize">
                      By Admin
                    </span>
                  </div>
                  <div className="flex space-x-1.5 rtl:space-x-reverse items-center">
                    <SvgIconRenderer
                      width={width && width > 640 ? "16" : "13"}
                      height={width && width > 640 ? "15" : "12"}
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      path={SvgPaths.commentIcon}
                      pathFill="#FFBB38"
                    />
                    <span className="text-xs md:text-base text-qgraytwo capitalize">
                      {blogCommentsState?.length} Comments
                    </span>
                  </div>
                </div>
                <article className="details">
                  {/* <h1 className="text-[21px] md:text-[26px] text-[#374151] font-bold mb-[21px] md:mb-[21px] "> */}
                  <div className="prose prose-w-full max-w-full text-black prose-h1:mb-4 prose-h1:text-[22px] md:prose-h1:text-[36px]">
                    <h1>{blogData?.title}</h1>
                  </div>
                  <div className="mb-4 md:mb-8 text-sm md:text-base">
                    {blogData.description}
                  </div>
                  {blogData.long_description &&
                    createPortal(blogData.long_description, document.body)}
                  <div
                    id="blog-description"
                    className="mb-6 md:mb-10 prose prose-w-full max-w-full dark:prose-invert prose-strong:text-black prose-headings:text-qblack prose-headings:mb-3 prose-headings:mt-0 prose-blockquote:text-gray-500 prose-code:text-black prose-code:bg-slate-300 prose-code:px-1 prose-code:rounded-sm prose-base focus:outline-none leading-1 text-black text-sm md:text-base"
                    // dangerouslySetInnerHTML={{
                    //   __html: blogData.long_description,
                    // }}
                  ></div>
                </article>
              </div>

              <div className="extra-content w-full">
                <div className="ronin bhai">
                  <div className="extra-content w-full">
                    <div className="w-full h-[1px] bg-[#DCDCDC]"></div>
                    <div className="comment-area w-full mt-2 md:mt-8">
                      {/* share area */}
                      <div className="w-full sm:flex justify-between items-center mb-2 md:mb-8">
                        <div className="tags flex space-x-5 rtl:space-x-reverse items-center">
                          <span className="text-base md:text-2xl text-qblack font-semibold">
                            Share:
                          </span>
                          <div className="flex space-x-2.5 rtl:space-x-reverse items-center">
                            <div
                              aria-label="facebook"
                              className="bg-transparent border-none p-0 cursor-pointer flex justify-center items-center"
                            >
                              <FacebookShareButton url={shareableRoute}>
                                <FacebookIcon
                                  size={40}
                                  iconFillColor="#3E75B2"
                                  bgStyle={{ display: "none" }}
                                />
                              </FacebookShareButton>
                            </div>
                            <div
                              aria-label="twitter"
                              className="bg-transparent border-none p-0 cursor-pointer flex justify-center items-center"
                            >
                              <TwitterShareButton url={shareableRoute}>
                                <TwitterIcon
                                  size={40}
                                  iconFillColor="#3FD1FF"
                                  bgStyle={{ display: "none" }}
                                />
                              </TwitterShareButton>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        {/* posr comment area */}
                        <div className="write-review w-full mb-4 md:mb-[30px]">
                          <h1 className="text-lg md:text-2xl font-bold text-qblack mb-2 md:mb-5">
                            Leave a Comment
                          </h1>
                          <form
                            onSubmit={handlePostComment}
                            className="w-full review-form "
                          >
                            <div className="sm:flex sm:space-x-[30px] rtl:space-x-reverse items-center mb-2 md:mb-5 w-full">
                              <div className="w-full mb-2 sm:mb-0">
                                <div className="input-com w-full h-full">
                                  <label
                                    className="input-label capitalize block mb-1 md:mb-2 text-qgray text-[13px] font-normal"
                                    htmlFor="name"
                                  >
                                    Name*
                                  </label>
                                  <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                                    <input
                                      placeholder="Name"
                                      className="input-field placeholder:text-sm text-sm text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none px-3 md:px-6  h-[36px] md:h-[50px]"
                                      type="text"
                                      id="userName"
                                      required
                                      // value=""
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="w-full">
                                <div className="input-com w-full h-full">
                                  <label
                                    className="input-label capitalize block mb-1 md:mb-2 text-qgray text-[13px] font-normal"
                                    htmlFor="email"
                                  >
                                    Email*
                                  </label>
                                  <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                                    <input
                                      defaultValue={states.user?.email}
                                      readOnly
                                      placeholder="Email"
                                      className="input-field placeholder:text-sm text-sm text-dark-gray w-full font-normal bg-gray-200 focus:ring-0 focus:outline-none  px-3 md:px-6  h-[36px] md:h-[50px]"
                                      type="email"
                                      id="email"
                                      required
                                      // value=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="w-full mb-4 md:b-[30px]">
                              <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-1 md:mb-2 ">
                                Message*
                              </h6>
                              <textarea
                                name="comment"
                                id=""
                                cols={30}
                                rows={3}
                                className="w-full placeholder:text-sm focus:ring-0 focus:outline-none p-3 md:p-6"
                                required
                              ></textarea>
                            </div>
                            <div className="flex justify-end">
                              <button
                                type="submit"
                                className="black-btn w-[180px] md:w-[300px] h-[40px] md:h-[50px] flex justify-center"
                              >
                                <span className="flex space-x-1 items-center h-full text-sm font-semibold tracking-wide">
                                  Submit Review
                                </span>
                              </button>
                            </div>
                          </form>
                        </div>

                        {/* all comments area */}
                        <div className="w-full comments">
                          <div className="w-full h-[1px] bg-[#DCDCDC]"></div>
                          <h1 className="text-base md:text-2xl text-qblack font-medium my-3 md:my-5">
                            Comments
                          </h1>
                          {blogCommentsState?.length !== 0 ? (
                            blogCommentsState?.map((blogComment) => (
                              <BlogCommentCard
                                key={blogComment.slug}
                                blogComment={blogComment}
                              />
                            ))
                          ) : (
                            <div className="bg-gray-200 rounded-sm text-sm px-3 py-2 mb-4">
                              No comments yet.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-[370px] w-full">
              <div className="search-widget w-full p-[30px] bg-white mb-[30px] aos-init aos-animate hidden md:block">
                <h1 className="text-[22px] text-qblack font-bold mb-5">
                  Search
                </h1>
                <div className="w-full h-[1px] bg-[#DCDCDC] mb-5"></div>
                <div className="w-full h-[60px] relative">
                  <input
                    type="text"
                    className="w-full h-full bg-[#F9F3E9] focus:outline-none focus:ring-0 pl-5 pr-16 placeholder:text-qgraytwo"
                  />
                  <span className="absolute right-5 top-[17px]"></span>
                </div>
              </div>

              <div className="latest-post-widget w-full bg-white p-2 md:p-[30px] mb-[30px] aos-init aos-animate">
                <h1 className="text-lg md:text-[22px] text-qblack font-bold mb-2 md:mb-5">
                  Latest Posts
                </h1>
                <div className="w-full h-[1px] bg-[#DCDCDC] mb-3 md:mb-5"></div>
                <ul className="flex flex-col gap-2 md:gap-5-5 mb-3">
                  {latestBlogsData
                    .map((latestData) => (
                      <li
                        key={latestData.slug}
                        className="flex space-x-5 rtl:space-x-reverse"
                      >
                        <div className="w-16 md:w-[85px] h-16 md:h-[92px] overflow-hidden rounded relative">
                          <img
                            className="h-full object-cover"
                            src={latestData.imageURL}
                            alt=""
                          />
                        </div>
                        <div className="flex-1 h-full flex flex-col justify-between">
                          <Link href={`/blogs/blog?slug=${latestData.slug}`}>
                            <p className="text-sm md:text-[18px] text-qblack leading-7 cursor-pointer mb-1 md:mb-3 capitalize mt-1">
                              {latestData.title}
                            </p>
                          </Link>
                          <span className="text-xs md:text-sm text-qgraytwo">
                            {timeline(latestData?.createdAt)}
                          </span>
                        </div>
                      </li>
                    ))
                    .slice(0, 4)}
                </ul>
              </div>

              {/*******************  Categories  *****************************/}
              <div className="categories-widget w-full bg-white p-3 md:p-[30px] mb-4 md:mb-[30px] aos-init aos-animate">
                <h1 className="text-lg md:text-[22px] text-qblack font-bold mb-2 md:mb-5">
                  Categories
                </h1>
                <div className="w-full h-[1px] bg-[#DCDCDC] mb-2 md:mb-5"></div>
                <ul className="flex flex-col gap-3 md:gap-5">
                  {categories.map((cat, i) => (
                    <li
                      key={cat.slug}
                      className="flex justify-between items-center group"
                    >
                      <Link href={``}>
                        <span
                          onClick={() => setCat(cat?.name)}
                          className="text-sm md:text-base text-qgraytwo group-hover:text-qyellow cursor-pointer"
                        >
                          {cat.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/****************************************************/}

              {/****************************************************/}

              <div className="w-full h-[358px] aos-init aos-animate hidden md:block">
                <div className="w-full h-full p-[30px] bg-black bg-opacity-75 flex flex-col justify-between">
                  <form onSubmit={addSubscriber}>
                    <div>
                      <h1 className="text-[22px] text-white font-bold mb-5">
                        Our Newsletter
                      </h1>
                      <div className="w-full h-[1px] bg-[#615B9C] mb-5"></div>
                      <p className="text-base text-white leading-[26px] line-clamp-2">
                        Follow our newsletter to stay updated about us.
                      </p>
                    </div>
                    <div>
                      <div className="w-full mb-3.5">
                        <input
                          placeholder="Enter Your Email Address"
                          type="email"
                          className="w-full h-[60px] bg-[#ECEAEC] pl-5 rtl:pr-5 focus:outline-none focus:ring-0 placeholder:text-[#9A9A9A]"
                          name="email"
                        />
                      </div>
                      <button className="w-full h-[60px]">
                        <span
                          style={{ fontSize: "18px" }}
                          className="yellow-btn w-full h-full text-[18px]"
                        >
                          Subscribe
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
