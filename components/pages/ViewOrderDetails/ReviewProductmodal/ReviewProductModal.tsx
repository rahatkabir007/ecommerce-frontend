import React, { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
//@ts-ignore
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface Props {
  reportModalSlug: string;
  setReportModalSlug: Dispatch<SetStateAction<string>>;
  setSellerSlug: Dispatch<SetStateAction<string>>;
  handleReview: Function;
  ratingChanged: Function;
  rating: number;
}

const ReviewProductModal: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const {
    handleReview,
    reportModalSlug,
    setReportModalSlug,
    setSellerSlug,
    ratingChanged,
    rating,
  } = props;

  return (
    <>
      {reportModalSlug ? (
        <div className="relative">
          <div
            data-aos="fade-up"
            className="flex justify-center items-center fixed inset-0 z-50 bg-black bg-opacity-10 w-full py-[40px] px-[38px] aos-init aos-animate"
          >
            <div className="bg-white rounded-md shadow sm:w-[548px] py-[40px] px-[38px] ">
              <div className="title-bar flex items-center justify-between mb-3">
                <h6 className="text-2xl font-medium">Review Products</h6>
                <span
                  onClick={() => {
                    setReportModalSlug("");
                    setSellerSlug("");
                  }}
                  className="cursor-pointer"
                >
                  <svg
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.9399 54.0001C12.0678 53.9832 -0.0210736 41.827 2.75822e-05 26.9125C0.0211287 12.0507 12.1965 -0.0315946 27.115 6.20658e-05C41.9703 0.0317188 54.0401 12.2153 54 27.1404C53.9599 41.9452 41.7972 54.0191 26.9399 54.0001ZM18.8476 16.4088C17.6765 16.4404 16.9844 16.871 16.6151 17.7194C16.1952 18.6881 16.3893 19.5745 17.1363 20.3258C19.0966 22.2906 21.0252 24.2913 23.0425 26.197C23.7599 26.8745 23.6397 27.2206 23.0045 27.8305C21.078 29.6793 19.2148 31.5956 17.3241 33.4802C16.9211 33.8812 16.5581 34.3012 16.4505 34.8857C16.269 35.884 16.6953 36.8337 17.5456 37.3106C18.4382 37.8129 19.5038 37.6631 20.3394 36.8421C22.3673 34.8435 24.3866 32.8365 26.3723 30.7999C26.8513 30.3082 27.1298 30.2871 27.6193 30.7915C29.529 32.7584 31.4851 34.6789 33.4201 36.6184C33.8463 37.0447 34.2831 37.4436 34.9098 37.5491C35.9184 37.7201 36.849 37.2895 37.3196 36.4264C37.7964 35.5548 37.6677 34.508 36.8912 33.7144C34.9731 31.756 33.0677 29.7806 31.0631 27.9149C30.238 27.1467 30.3688 26.7479 31.1031 26.0535C32.9896 24.266 34.8022 22.3982 36.6338 20.5516C37.7922 19.3845 37.8914 17.9832 36.9081 17.0293C35.9501 16.1007 34.5975 16.2146 33.4623 17.3416C31.5188 19.2748 29.5649 21.1995 27.6594 23.1664C27.1446 23.6983 26.8492 23.6962 26.3343 23.1664C24.4267 21.1974 22.4664 19.2811 20.5336 17.3374C19.9997 16.7971 19.4258 16.3666 18.8476 16.4088Z"
                      fill="#F34336"
                    ></path>
                  </svg>
                </span>
              </div>
              <form onSubmit={(e) => handleReview(e)} className="inputs w-full">
                <div className="w-full mb-5">
                  {/* *******  Rating ********8 */}
                  <div className="flex space-x-1 items-center mb-[30px]">
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      isHalf={true}
                      emptyIcon={<FaRegStar />}
                      halfIcon={<FaStarHalfAlt />}
                      fullIcon={<FaStar />}
                      activeColor="rgb(255, 168, 0)"
                      color="#d3d3d3"
                    />
                    <span className="text-qblack text-[15px] font-normal mt-1">
                      {rating}
                    </span>
                  </div>
                  {/* ****************** */}

                  <div className="input-com w-full h-full">
                    <label
                      className="input-label capitalize block  mb-2 text-[13px] font-600 leading-[24px] text-qblack"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                      <input
                        required
                        name="name"
                        placeholder=""
                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                        type="text"
                        id="name"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full mb-[40px]">
                  <h6 className="input-label capitalize text-[13px] font-600 leading-[24px] text-qblack block mb-2 ">
                    Message
                  </h6>
                  <textarea
                    required
                    name="message"
                    id=""
                    cols={30}
                    rows={6}
                    className="w-full focus:ring-0 focus:outline-none py-3 px-4 border  placeholder:text-sm text-sm border-qgray-border"
                    placeholder=""
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="black-btn flex w-1/2 h-[50px] items-center justify-center "
                >
                  <span>Submit Review</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ReviewProductModal;
