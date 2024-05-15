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

interface Props {
  blogData: IBlog | any;
  blogComments: IBlogComment[] | [];
}

const SingleBlogPage: React.FC<Props> = ({ blogData, blogComments }) => {
  const states = useSelector(() => controller.states);
  const [categories, setCategories] = useState<IBlogCategory[]>([]);
  const [cat, setCat] = useState("");
  const [byCategoryData, setByCategoryData] = useState<IBlog[]>([]);

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
  console.log("byCategoryData-", byCategoryData);
  console.log("cat-", cat);

  useEffect(() => {
    FetchByCat();
  }, [cat]);

  const FetchBlogCat = async () => {
    const { res, err } = await EcommerceApi.getAllBlogCategories();
    if (res) {
      setCategories(res);
    } else {
      console.log(err);
    }
  };
  useEffect(() => {
    FetchBlogCat();
  }, []);

  const addSubscriber = async (e: any) => {
    e.preventDefault();
    const subs = {
      email: e.target.email.value,
    };
    const { res, err } = await EcommerceApi.addSubscriber(subs);
    if (res) {
      console.log(res);
    }
    console.log(subs);
    e.target.reset();
  };
  const [latestBlogsData, setLatestBlogsData] = useState<IBlog[]>([]);

  const timeline = (createdAt: string): string => {
    const xmas95 = new Date(createdAt);
    // const options = { month: "long" };
    const year = xmas95.getFullYear();
    const date = xmas95.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      xmas95
    );
    return `${date} ${month} ${year}`;
  };

  useEffect(() => {
    const fetchAllLatestBlogsData = async () => {
      const { res, err } = await EcommerceApi.getAllBlogs();
      if (err) {
        console.log(err);
      } else {
        // setSlug(res[0]?.cat_slug);
        setLatestBlogsData(res.latestBlogs);
        console.log(res.latestBlogs);

        // console.log(res);
      }
    };
    fetchAllLatestBlogsData();
  }, []);

  const { asPath } = useRouter();

  const [blogCommentsState, setBlogCommentsState] = useState(blogComments);

  if (!blogData) return <></>;

  const router = useRouter();

  const shareableRoute = process.env.NEXT_PUBLIC_API_ENDPOINT + router.asPath;

  const handlePostComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    }
  };

  return (
    <div>
      <div className="title-area mb-[60px]">
        <div className="w-full bg-[#FFFAEF] h-[173px] py-10">
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
                  <span className="mx-1 capitalize">
                    blogs
                  </span>
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
                <span>
                  <img className="w-full" src={blogData.imageURL} alt="" />
                </span>
              </div>
              <div className="blog pt-[24px]">
                <div className="short-data flex space-x-9 rtl:space-x-reverse items-center mb-3">
                  <div className="flex space-x-1.5 rtl:space-x-reverse items-center">
                    <span>
                      <svg
                        width="12"
                        height="15"
                        viewBox="0 0 12 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.761 14.9996C1.55973 14.9336 1.35152 14.8896 1.16065 14.7978C0.397206 14.4272 -0.02963 13.6273 0.00160193 12.743C0.0397743 11.6936 0.275749 10.7103 0.765049 9.7966C1.42439 8.56373 2.36829 7.65741 3.59327 7.07767C3.67309 7.04098 3.7529 7.00428 3.85007 6.95658C2.68061 5.9512 2.17396 4.67062 2.43422 3.10017C2.58691 2.18285 3.03804 1.42698 3.72514 0.847238C5.24163 -0.42967 7.34458 -0.216852 8.60773 1.1738C9.36424 2.00673 9.70779 3.01211 9.61757 4.16426C9.52734 5.31642 9.01375 6.23374 8.14619 6.94924C8.33359 7.04098 8.50363 7.11436 8.6702 7.20609C10.1485 8.006 11.1618 9.24254 11.6997 10.9011C11.9253 11.5945 12.0328 12.3137 11.9912 13.0476C11.9357 14.0163 11.2243 14.8235 10.3151 14.9703C10.2908 14.974 10.2665 14.9886 10.2387 14.9996C7.41051 14.9996 4.58575 14.9996 1.761 14.9996ZM6.00507 13.8475C7.30293 13.8475 8.60079 13.8401 9.89518 13.8512C10.5684 13.8548 10.9571 13.3338 10.9015 12.7577C10.8807 12.5486 10.8773 12.3394 10.846 12.1303C10.6309 10.6185 9.92294 9.41133 8.72225 8.5784C7.17106 7.50331 5.50883 7.3602 3.84313 8.23349C2.05944 9.16916 1.15718 10.7506 1.09125 12.8568C1.08778 13.0072 1.12595 13.1723 1.18494 13.3044C1.36193 13.6934 1.68466 13.8438 2.08026 13.8438C3.392 13.8475 4.70027 13.8475 6.00507 13.8475ZM5.99119 6.53462C7.38969 6.54195 8.53833 5.33843 8.54527 3.85238C8.55221 2.37733 7.41745 1.16647 6.00507 1.15179C4.62046 1.13344 3.45794 2.35531 3.45099 3.8377C3.44405 5.31275 4.58922 6.52728 5.99119 6.53462Z"
                          fill="#FFBB38"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-base text-qgraytwo capitalize">
                      By Admin
                    </span>
                  </div>
                  <div className="flex space-x-1.5 rtl:space-x-reverse items-center">
                    <span>
                      <svg
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.73636 12.2092C3.29706 12.1112 2.89189 11.9493 2.52936 11.698C1.55268 11.0206 1.02382 10.0834 1.01102 8.89479C0.989696 7.06292 0.993961 5.23105 1.00676 3.39919C1.02382 1.68235 2.23934 0.297797 3.94108 0.0379278C4.11168 0.0123668 4.29081 0.00384653 4.46567 0.00384653C7.15688 0.00384653 9.8481 -0.000413627 12.5393 0.00384653C14.2069 0.00810668 15.5717 1.10723 15.9172 2.73034C15.9684 2.97317 15.9897 3.22452 15.9897 3.47587C15.994 5.25236 15.9982 7.0331 15.994 8.80958C15.9897 10.5136 14.8637 11.8939 13.2047 12.2134C12.9701 12.2603 12.7312 12.2688 12.4924 12.2688C11.2939 12.2731 10.0997 12.2731 8.90127 12.2688C8.77332 12.2688 8.66669 12.2986 8.56007 12.3711C7.33175 13.1933 6.10343 14.0112 4.87511 14.8334C4.71731 14.9399 4.55097 15.0166 4.35478 14.9953C3.98799 14.957 3.74489 14.6843 3.74062 14.3009C3.73636 13.6747 3.74062 13.0442 3.74062 12.4179C3.73636 12.354 3.73636 12.2901 3.73636 12.2092ZM5.09262 13.0442C5.16939 12.9973 5.21631 12.9632 5.26322 12.9334C6.1802 12.3242 7.09717 11.715 8.00988 11.0973C8.20607 10.9652 8.40226 10.9098 8.63684 10.9098C9.94193 10.9141 11.2428 10.9141 12.5478 10.9098C13.742 10.9056 14.6334 10.0109 14.6334 8.81384C14.6334 7.02458 14.6334 5.23531 14.6334 3.44605C14.6334 2.26173 13.7378 1.36284 12.5521 1.36284C9.85663 1.36284 7.15688 1.36284 4.46141 1.36284C3.27147 1.36284 2.37582 2.26173 2.37582 3.45457C2.37582 5.23957 2.37582 7.02032 2.37582 8.80532C2.37582 9.9726 3.2075 10.8459 4.37611 10.9056C4.84952 10.9311 5.09262 11.1825 5.09689 11.6554C5.09262 12.1069 5.09262 12.5543 5.09262 13.0442Z"
                          fill="#FFBB38"
                        ></path>
                        <path
                          d="M8.48317 5.45638C7.13543 5.45638 5.79196 5.45638 4.44422 5.45638C3.93668 5.45638 3.60401 4.99628 3.77461 4.54044C3.87697 4.26353 4.09022 4.12295 4.38024 4.09313C4.43142 4.08887 4.48687 4.08887 4.53805 4.08887C7.17808 4.08887 9.81385 4.08887 12.4539 4.08887C12.569 4.08887 12.6885 4.09739 12.7994 4.13147C13.115 4.22945 13.2984 4.5447 13.2514 4.88552C13.2088 5.19651 12.9273 5.44786 12.5946 5.45212C12.2108 5.46064 11.8269 5.45212 11.4473 5.45212C10.4621 5.45638 9.47265 5.45638 8.48317 5.45638Z"
                          fill="#FFBB38"
                        ></path>
                        <path
                          d="M8.48349 8.17895C7.58784 8.17895 6.69646 8.18321 5.80507 8.17895C5.32739 8.17469 5.01178 7.78701 5.11841 7.3397C5.18238 7.05853 5.42975 6.84552 5.71977 6.82848C5.76242 6.82422 5.80507 6.82422 5.84772 6.82422C7.6177 6.82422 9.39194 6.82422 11.1619 6.82422C11.5586 6.82422 11.8272 7.02871 11.8955 7.37378C11.9765 7.78275 11.6822 8.16617 11.2643 8.17895C10.8889 8.19173 10.5094 8.18321 10.1298 8.18321C9.5796 8.17895 9.03368 8.17895 8.48349 8.17895Z"
                          fill="#FFBB38"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-base text-qgraytwo capitalize">
                      {blogCommentsState?.length} Comments
                    </span>
                  </div>
                </div>
                <article className="details">
                  <h1 className="text-[22px] text-qblack font-semibold line-clamp-2 mb-1 capitalize">
                    {blogData?.title}
                  </h1>
                  <div className="mb-10">{blogData.description}</div>
                  <div
                    id="blog-description"
                    className="mb-10  prose prose-w-full dark:prose-invert prose-strong:text-black prose-headings:text-gray-700 prose-blockquote:text-gray-500 prose-base focus:outline-none leading-1 text-black"
                    dangerouslySetInnerHTML={{
                      __html: blogData.long_description,
                    }}
                  ></div>
                </article>
              </div>

              <div className="extra-content w-full">
                <div className="ronin bhai">
                  <div className="extra-content w-full">
                    <div className="w-full h-[1px] bg-[#DCDCDC]"></div>
                    <div className="comment-area w-full mt-8">
                      <div className="w-full sm:flex justify-between items-center mb-8">
                        <div className="tags flex space-x-5 rtl:space-x-reverse items-center">
                          <span className="text-2xl text-qblack">Share:</span>
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
                        <div className="write-review w-full mb-[30px]">
                          <h1 className="text-2xl font-bold text-qblack mb-5">
                            Leave a Comment
                          </h1>
                          <form
                            onSubmit={handlePostComment}
                            className="w-full review-form "
                          >
                            <div className="sm:flex sm:space-x-[30px] rtl:space-x-reverse items-center mb-5 w-full">
                              <div className="w-full mb-5 sm:mb-0">
                                <div className="input-com w-full h-full">
                                  <label
                                    className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                                    htmlFor="name"
                                  >
                                    Name*
                                  </label>
                                  <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                                    <input
                                      placeholder="Name"
                                      className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
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
                                    className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                                    htmlFor="email"
                                  >
                                    Email*
                                  </label>
                                  <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                                    <input
                                      placeholder="Email"
                                      className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                                      type="email"
                                      id="email"
                                      required
                                      // value=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-full mb-[30px]">
                              <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
                                Message*
                              </h6>
                              <textarea
                                name="comment"
                                id=""
                                cols={30}
                                rows={3}
                                className="w-full placeholder:text-sm focus:ring-0 focus:outline-none p-6"
                                required
                              ></textarea>
                            </div>
                            <div className="flex justify-end">
                              <button
                                type="submit"
                                className="black-btn w-[300px] h-[50px] flex justify-center"
                              >
                                <span className="flex space-x-1 items-center h-full">
                                  <span className="text-sm font-semibold">
                                    Submit Review
                                  </span>
                                </span>
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className="w-full comments">
                          <div className="w-full h-[1px] bg-[#DCDCDC]"></div>
                          <h1 className="text-2xl font-medium text-qblack my-5">
                            Comments
                          </h1>
                          {blogCommentsState?.length !== 0 &&
                            blogCommentsState?.map((blogComment) => (
                              <BlogCommentCard blogComment={blogComment} />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-[370px] w-full">
              <div className="search-widget w-full p-[30px] bg-white mb-[30px] aos-init aos-animate">
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

              <div className="latest-post-widget w-full bg-white p-[30px] mb-[30px] aos-init aos-animate">
                <h1 className="text-[22px] text-qblack font-bold mb-5">
                  Latest Post
                </h1>
                <div className="w-full h-[1px] bg-[#DCDCDC] mb-5"></div>
                <ul className="flex flex-col space-y-5">
                  {latestBlogsData
                    .map((latestData) => (
                      <li className="flex space-x-5 rtl:space-x-reverse">
                        <div className="w-[85px] h-[92px] overflow-hidden rounded relative">
                          <span>
                            <img
                              className="h-full object-cover"
                              src={latestData.imageURL}
                              alt=""
                            />
                          </span>
                        </div>
                        <div className="flex-1 h-full flex flex-col justify-between">
                          <Link href={`/blogs/blog?slug=${latestData.slug}`}>
                            <p className="text-[18px] text-qblack leading-7 cursor-pointer mb-3">
                              {latestData.title}
                            </p>
                          </Link>
                          <div className="flex space-x-3 rtl:space-x-reverse items-center">
                            <span></span>
                            <span className="text-sm text-qgraytwo">
                              {/* 22 Sep 2022 */}
                              {timeline(latestData?.createdAt)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))
                    .slice(0, 4)}
                </ul>
              </div>

              {/*******************  Categories  *****************************/}
              <div className="categories-widget w-full bg-white p-[30px] mb-[30px] aos-init aos-animate">
                <h1 className="text-[22px] text-qblack font-bold mb-5">
                  Categories
                </h1>
                <div className="w-full h-[1px] bg-[#DCDCDC] mb-5"></div>
                <ul className="flex flex-col space-y-5">
                  {categories.map((cat, i) => (
                    <li className="flex justify-between items-center group">
                      <Link href={``}>
                        <span
                          onClick={() => setCat(cat?.name)}
                          className="text-base text-qgraytwo group-hover:text-qyellow cursor-pointer"
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

              <div className="w-full h-[358px] aos-init aos-animate">
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
