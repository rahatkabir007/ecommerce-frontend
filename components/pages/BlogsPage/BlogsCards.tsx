import Link from "next/link";
import React, { useState } from "react";
import { useSelector, useStore } from "react-redux";
import { controller } from "../../../src/state/StateController";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import ViewMoreBtn from "../../helpers/Buttons/ViewMoreBtn";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
interface Props {
  blogsData?: any;
  setBlogsData?: any;
  byCategoryData?: any;
}

const BlogsCards: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [showAll, setShowAll] = useState(false);
  const { blogsData, setBlogsData } = props;

  return (
    <div className="w-full pt-[60px] bg-white">
      <div className="container-x mx-auto">
        <div className="w-full">
          <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-5 pb-[60px]">
            {!showAll
              ? blogsData?.slice(0, 10).map((data: any, idx: any) => (
                  <div
                    key={idx}
                    data-aos="fade-up"
                    className="item w-full aos-init aos-animate">
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
                                pathFill="#FFBB38"
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
                                pathFill="#FFBB38"
                              />
                            </span>
                            <span className="text-base text-qgraytwo">
                              0 Comments
                            </span>
                          </div>
                        </div>
                        <div className="details">
                          <Link href={`/blogs/blog?slug=${data.slug}`}>
                            <h1 className="text-[22px] text-qblack hover:text-blue-500 font-semibold line-clamp-2 mb-1 capitalizen cursor-pointer">
                              {data?.title?.length > 72
                                ? data?.title?.slice(0, 72) + "..."
                                : data?.title}
                            </h1>
                          </Link>
                          <div className="article-area line-clamp-2">
                            <p
                              style={{
                                marginRight: "0px",
                                marginBottom: "15px",
                                marginLeft: "0px",
                                padding: "0px",
                                textAlign: "justify",
                                color: "rgb(0, 0, 0)",
                              }}></p>

                            <p className="opacity-50">
                              {data.description.length > 130
                                ? data.description.slice(0, 130) + "..."
                                : data.description}
                            </p>
                          </div>
                          <div
                            onClick={() => setShowAll(true)}
                            className="mt-4">
                            <ViewMoreBtn
                              link={`/blogs/blog?slug=${data.slug}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : blogsData.map((data: any, idx: any) => (
                  <div
                    key={idx}
                    data-aos="fade-up"
                    className="item w-full aos-init aos-animate">
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
                                pathFill="#FFBB38"
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
                                pathFill="#FFBB38"
                              />
                            </span>
                            <span className="text-base text-qgraytwo">
                              0 Comments
                            </span>
                          </div>
                        </div>
                        <div className="details">
                          <Link href={`/blogs/blog?slug=${data.slug}`}>
                            <h1 className="text-[22px] text-qblack hover:text-blue-500 font-semibold line-clamp-2 mb-1 capitalizen cursor-pointer">
                              {data?.title?.length > 72
                                ? data?.title?.slice(0, 72) + "..."
                                : data?.title}
                            </h1>
                          </Link>
                          <div className="article-area line-clamp-2">
                            <p
                              style={{
                                marginRight: "0px",
                                marginBottom: "15px",
                                marginLeft: "0px",
                                padding: "0px",
                                textAlign: "justify",
                                color: "rgb(0, 0, 0)",
                              }}></p>

                            <p className="opacity-50">
                              {data.description.length > 130
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
          <div className="flex justify-center pb-[60px]">
            {!showAll && (
              <button
                onClick={() => setShowAll(true)}
                type="button"
                className="w-[180px] h-[54px] bg-qyellow rounded mt-10 text-white">
                <div className="flex justify-center w-full h-full items-center group rounded relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer">
                  <div className="flex items-center transition-all duration-300 ease-in-out relative z-10 text-qblack group-hover:text-white">
                    <span className="text-sm font-semibold tracking-wide leading-7 mr-2">
                      Show more...
                    </span>
                  </div>
                  <div
                    className="w-full h-full bg-black text-white absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]"
                    style={{
                      transition: "transform 0.25s ease-in-out 0s",
                    }}></div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsCards;
