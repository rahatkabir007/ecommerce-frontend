import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IProduct, IReview, IUser } from "../../../../interfaces/models";
import { EcommerceApi } from "../../../../src/API/EcommerceApi";
import { controller } from "../../../../src/state/StateController";
import ReviewCard from "../../SingleProductPage/ReviewCard";
import SellerInfo from "./SellerInfo";

interface Props {}

const ItemDetails: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const router = useRouter();
  const { asPath } = router;
  const [singleProduct, setSingleProduct] = useState<IProduct | null>(null);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [seller, setSeller] = useState<IUser | null>(null);

  console.log(asPath.split("=")[1]);
  const productSlug = asPath.split("=")[1];

  const getProductReviews = async () => {
    const { res, err } = await EcommerceApi.getAllProductReviews(productSlug);
    if (res) {
      console.log(res);
      setReviews(res);
    }
  };
  console.log(singleProduct?.seller_slug);

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
    <div className="w-full bg-qgrayBorder">
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
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32.
              </p>
              <p>
                The standard chunk of Lorem Ipsum used since the 1500s is
                reproduced below for those interested. Sections 1.10.32 and
                1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                reproduced in their exact original form, accompanied by English
                versions from the 1914 translation by H. Rackham.
              </p>
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
          <div>
            <h6 className="text-[20px] font-bold text-qblack mb-5 ">
              Seller Info
            </h6>
            <SellerInfo seller={seller}></SellerInfo>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
