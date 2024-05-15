import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IReview } from "../../../../interfaces/models";
import { EcommerceApi } from "../../../../src/API/EcommerceApi";
import { CookiesHandler } from "../../../../src/utils/CookiesHandler";
import { controller } from "./../../../../src/state/StateController";
import ProfileReviewItem from "./ProfileReviewItem";

interface Props {}

const ProfileReviews: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const [reviewDatas, setReviewDatas] = useState<IReview[]>([]);

  const user_slug = CookiesHandler.getSlug();

  const getAllReviews = async () => {
    const { res, err } = await EcommerceApi.getAllReviews(user_slug);
    if (res) {
      console.log("res from get-all-reviews =", res);
      setReviewDatas(res);
    } else {
      console.log(" reviews=", err);
    }
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  if (reviewDatas.length === 0) {
    return (
      <div>
        <div className="flex justify-center items-center mb-12">
          <div>
            <img
              src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Fempty_wishlist-2022-11-17-11-23-16-9350.png&w=1920&q=75"
              alt=""
            />
          </div>
        </div>

        <div className="flex  justify-center">
          <h1 className="sm:text-xl text-base font-semibold text-center mb-5">
            Empty! You don't have any{" "}
            <span className="capitalize"> reviews </span>
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <Link href="/">
            <div className="w-[180px] h-[50px] ">
              <button className="yellow-btn ">Back to Shop</button>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
      {reviewDatas.map((review, idx) => (
        <ProfileReviewItem review={review} />
      ))}
    </div>
  );
};

export default ProfileReviews;
