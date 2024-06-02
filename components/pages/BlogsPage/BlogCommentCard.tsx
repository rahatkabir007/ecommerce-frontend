import React from "react";
import { useSelector } from "react-redux";
import { IBlogComment } from "../../../interfaces/models";
import { controller } from "../../../src/state/StateController";

interface Props {
  blogComment: IBlogComment;
}

const BlogCommentCard: React.FC<Props> = ({ blogComment }) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="comment-item bg-white px-10 py-[32px] mb-2.5">
      <div className="comment-author flex justify-between items-center mb-3">
        <div className="flex space-x-3 rtl:space-x-reverse items-center">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden relative">
            <span>
              <picture>
                <img
                  alt=""
                  src={blogComment.avatar}
                  decoding="async"
                  data-nimg="fill"
                  className="w-full h-full object-cover"
                />
              </picture>
            </span>
          </div>
          <div>
            <p className="text-[18px] font-medium text-qblack">
              {blogComment.name}
            </p>
          </div>
        </div>
      </div>
      <div className="comment mb-[30px]">
        <p className="text-[15px] text-qgray leading-7 text-normal">
          {blogComment.comment}
        </p>
      </div>
    </div>
  );
};

export default BlogCommentCard;
