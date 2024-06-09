import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  IProduct,
  IReview,
  ISeller,
  IUser,
} from "../../../../interfaces/models";
import { EcommerceApi } from "../../../../src/API/EcommerceApi";
import { controller } from "../../../../src/state/StateController";
import ReviewCard from "../../SingleProductPage/ReviewCard";
import SellerInfo from "./SellerInfo";

interface Props {
  singleProduct: IProduct | null;
}

const ItemDetails: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const router = useRouter();
  const { asPath } = router;
  const [singleProduct, setSingleProduct] = useState<IProduct | null>(null);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [seller, setSeller] = useState<ISeller | null>(null);

  const productSlug = asPath.split("=")[1];

  const getProductReviews = async () => {
    const { res, err } = await EcommerceApi.getAllProductReviews(productSlug);
    if (res) {
      setReviews(res);
    }
  };

  const getSeller = async () => {
    const { res, err } = await EcommerceApi.getSellerWithProducts(
      singleProduct?.seller_slug
    );
    setSeller(res);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      const { res, err } = await EcommerceApi.getSingleProduct(productSlug);
      setSingleProduct(res);
    };

    if (!states.initialDataLoading) {
      fetchProductData();
    }
    getProductReviews();
    getSeller();
  }, [productSlug, states.initialDataLoading, singleProduct?.seller_slug]);

  return (
    <div className="w-full bg-qgrayBorder px-2 md:px-0">
      <div className="container-x mx-auto pb-[60px]">
        <div className="tab-buttons w-full mb-10 mt-5 sm:mt-0">
          <div>
            <ul className="flex space-x-12 ">
              <li>
                <span className="py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer border-qyellow text-qblack ">
                  Description
                </span>
              </li>
            </ul>
          </div>
          <div className="w-full h-[1px] bg-[#c1cccc] relative left-0 sm:top-[00px] top-[36px] -z-1"></div>
        </div>
        <div className="tab-contents w-full ">
          <div>
            <h6 className="text-[20px] font-bold text-qblack mb-5">
              Introduction
            </h6>

            <div className="product-detail-des mb-10 text-qgray">
              <p>{props?.singleProduct?.description}</p>
            </div>
          </div>
          {reviews.length > 0 && (
            <div>
              <h6 className="text-[20px] font-bold text-qblack mb-5 ">
                Reviews
              </h6>
              {reviews.map((review) => (
                <ReviewCard review={review} />
              ))}
            </div>
          )}
          {seller && (
            <div>
              <h6 className="text-[20px] font-bold text-qblack mb-5 ">
                Seller Info
              </h6>
              <SellerInfo seller={seller}></SellerInfo>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
