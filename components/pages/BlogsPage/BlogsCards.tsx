import Link from "next/link";
import React, { useState } from "react";
import { useSelector, useStore } from "react-redux";
import { controller } from "../../../src/state/StateController";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import ViewMoreBtn from "../../helpers/Buttons/ViewMoreBtn";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import BlogCard from "./BlogCard";
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
    <div className="w-full pt-0 md:pt-[60px] px-0 md:px-0 bg-white">
      <div className="container-x mx-auto">
        <div className="w-full">
          <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-2 xl:gap-5 pb-2 md:pb-[60px]">
            {!showAll
              ? blogsData
                  ?.slice(0, 10)
                  .map((data: any, idx: any) => <BlogCard data={data} />)
              : blogsData.map((data: any, idx: any) => (
                  <BlogCard data={data} />
                ))}
          </div>
          <div className="flex justify-center pb-4 md:pb-[60px]">
            {!showAll && (
              <button
                onClick={() => setShowAll(true)}
                type="button"
                className="w-[130px] md:w-[180px] h-[35px] md:h-[54px] bg-qyellow rounded mt-4 md:mt-10 text-white"
              >
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
                    }}
                  ></div>
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
