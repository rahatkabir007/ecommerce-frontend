import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import { IBlog } from "../../../interfaces/models";
import ViewMoreBtn from "../../helpers/Buttons/ViewMoreBtn";
import useWindowDimensions from "../../shared/hooks/useWindowDimensions";

interface Props {
  data: IBlog;
}

const BlogCard: React.FC<Props> = ({ data }) => {
  const states = useSelector(() => controller.states);

  const { height, width } = useWindowDimensions();

  return (
    <div data-aos="fade-up" className="item w-full aos-init aos-animate">
      <div className="blog-card-wrapper w-full border border-[#D3D3D3] ">
        <div className="img w-full h-[150px] md:h-[340px] relative">
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
        <div className="py-2 px-3 md:p-[24px]">
          <div className="short-data flex space-x-9 items-center mb-2 md:mb-3">
            <div className="flex space-x-1.5 items-center">
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
            <div className="flex space-x-1.5 items-center">
              <SvgIconRenderer
                width={width && width > 640 ? "16" : "13"}
                height={width && width > 640 ? "15" : "12"}
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                path={SvgPaths.commentIcon}
                pathFill="#FFBB38"
              />
              <span className="text-xs md:text-base text-qgraytwo">
                0 Comments
              </span>
            </div>
          </div>
          <div className="details">
            <Link href={`/blogs/blog?slug=${data.slug}`}>
              <h1 className="text-base md:text-[22px] text-qblack hover:text-blue-500 font-semibold line-clamp-2 mb-1 capitalize cursor-pointer">
                {data?.title?.length > 72
                  ? data?.title?.slice(0, 72) + "..."
                  : data?.title}
              </h1>
            </Link>
            <div className="article-area line-clamp-2">
              {width && width > 640 && (
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
              )}

              <p className="opacity-50 text-sm md:text-base">
                {data.description && data.description.length > 130
                  ? data.description.slice(0, 130) + "..."
                  : data.description}
              </p>
            </div>
            <div className="mt-3 md:mt-4">
              <ViewMoreBtn link={`/blogs/blog?slug=${data.slug}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
