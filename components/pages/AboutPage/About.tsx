import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import PageHeader from "../../shared/SharedPageHeader/PageHeader";
import { AiFillCheckCircle } from "react-icons/ai";
import styles from "./About.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ViewMoreBtn from "../../helpers/Buttons/ViewMoreBtn";
// import { Jsondata } from "../../../src/utils/Jsondata";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { IBlog } from "../../../interfaces/models";

interface Props {}

const About: React.FC<Props> = (props) => {
  // const states = useSelector(() => controller.states);

  const slider = React.useRef(null);
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    const getBlogs = async () => {
      const { res, err } = await EcommerceApi.getAllBlogs();
      if (res.latestBlogs) {
        setBlogs(res?.latestBlogs);
      }
    };

    getBlogs();
  }, []);

  const feedbacks = [
    {
      description:
        "Almost every imaginable design is possible and customizations are allowed on every level. Some features could make use of better controls. If you know how to operate your mouse, then you are all set to use this pagebuilder.",
      name: "Michael",
      designation: "CEO",
      picture:
        "https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fcustom-images%2Fjohn-doe-20220922033955.png&w=1920&q=75",
    },
    {
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English",
      name: "James Robert",
      designation: "CEO",
      picture:
        "https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fcustom-images%2Fjohn-doe-20220922033955.png&w=1920&q=75",
    },
    {
      description:
        "As a digital marketing agency our team works day in and day out on websites of all kinds. Some of the most common errors we see are websites not optimized for SEO because of old, boring, or out of date website themes or designs.",
      name: "John Doe",
      designation: "CEO",
      picture:
        "https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fcustom-images%2Fjohn-doe-20220922033955.png&w=1920&q=75",
    },
    {
      description:
        "Almost every imaginable design is possible and customizations are allowed on every level. Some features could make use of better controls. If you know how to operate your mouse, then you are all set to use this pagebuilder.",
      name: "Michael",
      designation: "CEO",
      picture:
        "https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fcustom-images%2Fjohn-doe-20220922033955.png&w=1920&q=75",
    },
    {
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English",
      name: "James Robert",
      designation: "CEO",
      picture:
        "https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fcustom-images%2Fjohn-doe-20220922033955.png&w=1920&q=75",
    },
    {
      description:
        "Almost every imaginable design is possible and customizations are allowed on every level. Some features could make use of better controls. If you know how to operate your mouse, then you are all set to use this pagebuilder.",
      name: "Michael",
      designation: "CEO",
      picture:
        "https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fcustom-images%2Fjohn-doe-20220922033955.png&w=1920&q=75",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    // className: "center",
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <div className="">
      <PageHeader slug="About Us" link="/aboutus" title="About Us" />
      <div className="w-full min-h-screen mt-10 pt-0 pb-0 bg-gray-50">
        <div className="aboutus-wrapper w-full py-2 ">
          <div className="container-x mx-auto">
            <div className="w-full min-h-[665px] lg:flex lg:space-x-12 items-center pb-10 lg:pb-0">
              <div className="md:w-[570px] w-full md:h-[560px] h-auto rounded overflow-hidden my-5 lg:my-0 relative">
                <img
                  src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fcustom-images%2Fabout-us-2022-09-22-04-39-05-2348.png&w=1920&q=75"
                  alt=""
                />
              </div>
              <div className="content flex-1">
                <div className="about-content">
                  <div>
                    <h1 className="text-3xl font-semibold mb-4 ">
                      What is e-commerce business?
                    </h1>

                    <p className="text-base text-[#797979] leading-8 ">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries but also the on leap into electronic
                      typesetting.
                    </p>
                    <ul className="mt-5">
                      <li className="text-base text-[#797979] leading-8 flex items-center mb-3">
                        <div>
                          <AiFillCheckCircle
                            className={`${styles["checkmark"]}`}
                          />
                        </div>
                        <div>slim body with metal cover</div>
                      </li>
                      <li className="text-base text-[#797979] leading-8 flex items-center mb-3">
                        <div>
                          <AiFillCheckCircle
                            className={`${styles["checkmark"]}`}
                          />
                        </div>
                        <div>
                          latest Intel Core i5-1135G7 processor (4 cores / 8
                          threads)
                        </div>
                      </li>
                      <li className="text-base text-[#797979] leading-8 flex items-center mb-3">
                        <div>
                          <AiFillCheckCircle
                            className={`${styles["checkmark"]}`}
                          />
                        </div>
                        <div>8GB DDR4 RAM and fast 512GB PCIe SSD</div>
                      </li>
                      <li className="text-base text-[#797979] leading-8 flex items-center mb-3">
                        <div>
                          <AiFillCheckCircle
                            className={`${styles["checkmark"]}`}
                          />
                        </div>
                        <div className="leading-8">
                          NVIDIA GeForce MX350 2GB GDDR5 graphics card backlit
                          keyboard
                        </div>
                      </li>
                      <li className="text-base text-[#797979] leading-8 flex items-center mb-3">
                        <div>
                          <AiFillCheckCircle
                            className={`${styles["checkmark"]}`}
                          />
                        </div>
                        <div>hello hello hello prashant sir ?</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <Link href="/contact">
                  <div className="w-[121px] h-10 mt-5 cursor-pointer">
                    <span className="yellow-btn">Contact Us</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="customer-feedback w-full bg-white py-[60px]">
          <div className="title flex justify-center mb-5">
            <h1 className="text-[30px] font-semibold text-qblack">
              Customers Feedback
            </h1>
          </div>
          <div className="feedback-slider-wrapper w-vw relative overflow-hidden">
            <Slider ref={slider} {...settings}>
              {feedbacks &&
                feedbacks.map((feedback, index) => (
                  <div
                    key={index}
                    className="item h-auto bg-primarygray sm:px-10 sm:py-9 p-2"
                  >
                    <div className="rating flex space-x-1 items-center mb-4 ">
                      <span>
                        <SvgIconRenderer
                          className={"fill-qyellow"}
                          width={"18"}
                          height={"17"}
                          viewBox={"0 0 18 17"}
                          xmlns={"http://www.w3.org/2000/svg"}
                          path={SvgPaths.customerFeedbackRating}
                          // pathFill={"currentColor"}
                          pathFill={"fill-qyellow"}
                        />
                      </span>
                      <span>
                        <SvgIconRenderer
                          className={"fill-qyellow"}
                          width={"18"}
                          height={"17"}
                          viewBox={"0 0 18 17"}
                          xmlns={"http://www.w3.org/2000/svg"}
                          path={SvgPaths.customerFeedbackRating}
                          // pathFill={"currentColor"}
                          pathFill={"fill-qyellow"}
                        />
                      </span>
                      <span>
                        <SvgIconRenderer
                          className={"fill-qyellow"}
                          width={"18"}
                          height={"17"}
                          viewBox={"0 0 18 17"}
                          xmlns={"http://www.w3.org/2000/svg"}
                          path={SvgPaths.customerFeedbackRating}
                          // pathFill={"currentColor"}
                          pathFill={"fill-qyellow"}
                        />
                      </span>
                      <span>
                        <SvgIconRenderer
                          className={"fill-qyellow"}
                          width={"18"}
                          height={"17"}
                          viewBox={"0 0 18 17"}
                          xmlns={"http://www.w3.org/2000/svg"}
                          path={SvgPaths.customerFeedbackRating}
                          // pathFill={"currentColor"}
                          pathFill={"fill-qyellow"}
                        />
                      </span>
                      <span>
                        <SvgIconRenderer
                          className={"fill-qyellow"}
                          width={"18"}
                          height={"17"}
                          viewBox={"0 0 18 17"}
                          xmlns={"http://www.w3.org/2000/svg"}
                          path={SvgPaths.customerFeedbackRating}
                          // pathFill={"currentColor"}
                          pathFill={"fill-qyellow"}
                        />
                      </span>
                      <div>
                        <span className="text-[13px] text-qblack">(5)</span>
                      </div>
                    </div>
                    <div className="text-[15px] text-qgray leading-[30px] line-clamp-6 mb-4">
                      {feedback.description}
                    </div>
                    <div className="flex items-center space-x-2.5 mt-3">
                      <div className="w-[50px] h-[50px] rounded-full overflow-hidden relative">
                        <span>
                          <img src={feedback.picture} alt="" />
                        </span>
                      </div>
                      <div>
                        <p className="text-[18px] text-qblack font-medium">
                          {feedback.name}
                        </p>
                        <p className="text-qgray text-[13px]">
                          {feedback.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>

          <div className=" flex justify-center mt-[40px]">
            <div className="flex space-x-5 item-center">
              <button
                //@ts-ignore
                onClick={() => slider?.current?.slickNext()}
                type="button"
                className="w-[48px] h-[48px] rounded-full overflow-hidden flex justify-center items-center border border-qyellow text-qyellow focus:bg-qyellow focus:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </button>
              <button
                //@ts-ignore
                onClick={() => slider?.current?.slickPrev()}
                type="button"
                className="w-[48px] h-[48px] rounded-full overflow-hidden flex justify-center items-center border border-qyellow text-qyellow focus:bg-qyellow focus:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 transform rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="container-x mx-auto my-[60px]">
          <div
            data-aos="fade-up"
            className="best-services w-full bg-qyellow flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10 aos-init aos-animate"
          >
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                  <span className="w-10 h-10 text-black">
                    <SvgIconRenderer
                      aria-hidden={"true"}
                      focusable={"false"}
                      data-prefix={"fas"}
                      data-icon={"truck-fast"}
                      className={"svg-inline--fa fa-truck-fast w-8 h-8"}
                      role={"img"}
                      xmlns={"http://www.w3.org/2000/svg"}
                      viewBox={"0 0 640 512"}
                      path={SvgPaths.freeShipingZipIcon}
                      pathFill={"currentColor"}
                    />
                  </span>
                </div>
                <div>
                  <p className="text-black text-[15px] font-bold tracking-wide mb-1">
                    Free Shipping
                  </p>
                  <p className="text-sm text-qblack line-clamp-1">
                    Free Shipping on Payment
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                  <span className="w-10 h-10 text-black">
                    <SvgIconRenderer
                      aria-hidden={"true"}
                      focusable={"false"}
                      data-prefix={"fas"}
                      data-icon={"circle-chevron-left"}
                      className={
                        "svg-inline--fa fa-circle-chevron-left w-8 h-8"
                      }
                      role={"img"}
                      xmlns={"http://www.w3.org/2000/svg"}
                      viewBox={"0 0 512 512"}
                      path={SvgPaths.returnPolicyIcon}
                      pathFill={"currentColor"}
                    />
                  </span>
                </div>
                <div>
                  <p className="text-black text-[15px] font-bold tracking-wide mb-1">
                    Return Policy
                  </p>
                  <p className="text-sm text-qblack line-clamp-1">
                    24 Hours Return Policy
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                  <span className="w-10 h-10 text-black">
                    <SvgIconRenderer
                      aria-hidden={"true"}
                      focusable={"false"}
                      data-prefix={"fab"}
                      data-icon={"cc-amazon-pay"}
                      className={"svg-inline--fa fa-cc-amazon-pay w-8 h-8"}
                      role={"img"}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      path={SvgPaths.securedPaymentIcon}
                      pathFill="currentColor"
                    />
                  </span>
                </div>
                <div>
                  <p className="text-black text-[15px] font-bold tracking-wide mb-1">
                    Secured Payment
                  </p>
                  <p className="text-sm text-qblack line-clamp-1">
                    Secure Card Payments
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex space-x-5 items-center">
                <div>
                  <span className="w-10 h-10 text-black">
                    <SvgIconRenderer
                      aria-hidden={"true"}
                      focusable={"false"}
                      data-prefix={"fas"}
                      data-icon={"circle-check"}
                      className={"svg-inline--fa fa-circle-check w-8 h-8"}
                      role={"img"}
                      xmlns={"http://www.w3.org/2000/svg"}
                      viewBox={"0 0 512 512"}
                      path={SvgPaths.bestQualityIcon}
                      pathFill={"currentColor"}
                    />
                  </span>
                </div>
                <div>
                  <p className="text-black text-[15px] font-bold tracking-wide mb-1">
                    Best Quality
                  </p>
                  <p className="text-sm text-qblack line-clamp-1">
                    Best Quality Products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-post-wrapper w-full mb-[30px]">
          <div className="container-x mx-auto">
            <div className="blog-post-title flex justify-center items-cente mb-[30px]">
              <h1 className="text-3xl font-semibold text-qblack">
                My Latest News
              </h1>
            </div>
            <div className="blogs-wrapper w-full">
              <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-5">
                {blogs?.slice(0, 2).map((data, idx) => (
                  <div
                    key={idx}
                    data-aos="fade-up"
                    className="item w-full aos-init aos-animate"
                  >
                    <div className="blog-card-wrapper w-full border border-[#D3D3D3] ">
                      <div className="img w-full h-[340px] relative">
                        <span>
                          <img
                            alt="blog"
                            sizes="100vw"
                            src={data.imageURL}
                            decoding="async"
                            data-nimg="fill"
                            className="w-full h-full object-cover"
                          />
                        </span>
                      </div>
                      <div className="p-[24px]">
                        <div className="short-data flex space-x-9 items-center mb-3">
                          <div className="flex space-x-1.5 items-center">
                            <span>
                              <SvgIconRenderer
                                width="12"
                                height="15"
                                viewBox="0 0 12 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                path={SvgPaths.adminIcon}
                                pathFill={"#FFBB38"}
                              />
                            </span>
                            <span className="text-base text-qgraytwo capitalize">
                              By Admin
                            </span>
                          </div>
                          <div className="flex space-x-1.5 items-center">
                            <span>
                              <SvgIconRenderer
                                width="16"
                                height="15"
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                path={SvgPaths.commentIcon}
                                pathFill={"#FFBB38"}
                              />
                            </span>
                            <span className="text-base text-qgraytwo">
                              0 Comments
                            </span>
                          </div>
                        </div>
                        <div className="details">
                          <a
                            rel="noopener noreferrer"
                            href="/blogs/blog?slug=its-official-the-iphone-14-series-is-on-its-way-rumors-turned-out-to-be-true-the-goods-the-bads"
                          >
                            <h1 className="text-[22px] text-qblack hover:text-blue-500 font-semibold line-clamp-2 mb-1 capitalizen cursor-pointer">
                              {data?.title?.length > 72
                                ? data?.title?.slice(0, 72) + "..."
                                : data?.title}
                            </h1>
                          </a>
                          <div className="article-area line-clamp-2">
                            <p
                              style={{
                                marginRight: "0px",
                                marginBottom: "15px",
                                marginLeft: "0px",
                                padding: "0px",
                                textAlign: "justify",
                                color: "rgb(0, 0, 0)",
                              }}
                            ></p>

                            <p className="opacity-50">
                              {data.description && data.description.length > 130
                                ? data.description.slice(0, 130) + "..."
                                : data.description}
                            </p>
                          </div>
                          <div className="mt-4">
                            <ViewMoreBtn
                              link={`/blogs/blog?slug=${data.slug}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
