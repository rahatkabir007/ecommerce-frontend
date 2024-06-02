import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { useRouter } from "next/router";
import { FaFlag, FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";
//@ts-ignore
import ReactStars from "react-rating-stars-component";

import FacebookIcon from "react-share/lib/FacebookIcon";
import TwitterIcon from "react-share/lib/TwitterIcon";
import {
  ICartProduct,
  IProduct,
  IWishlistProduct,
} from "../../../interfaces/models";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import toast from "react-hot-toast";

interface Props {
  singleProduct: IProduct | null;
  setReportModalSlug: Dispatch<SetStateAction<string>>;
}

const ProductDetails: React.FC<Props> = (props) => {
  const { singleProduct } = props;
  const states = useSelector(() => controller.states);
  const user_slug = states.user?.slug;

  const [brandName, setBrandName] = useState<string | undefined>("");
  const [avgRating, setAvgRating] = useState(0);
  const [totalReview, setTotalReview] = useState(0);
  const [categoryName, setCategoryName] = useState<string | undefined>("");

  const { asPath } = useRouter();
  let productSlug = asPath.split("=")[1];

  let selectedItem: ICartProduct | undefined;

  const [cartQuantity, setCartQuantity] = useState<number>(
    selectedItem?.quantity || 1
  );

  const { setReportModalSlug } = props;

  const getProductReviews = async () => {
    let rating = 0;
    const { res, err } = await EcommerceApi.getAllProductReviews(
      singleProduct?.slug
    );
    if (res?.length !== 0) {
      setTotalReview(res.length);
      res.map((data) => {
        rating = rating + data.rating / res.length;
        setAvgRating(rating);
      });
    } else if (res?.length === 0) {
      setTotalReview(0);
      setAvgRating(0);
    }
  };

  if (singleProduct) {
    selectedItem = states?.cartlistData?.find(
      (product) => singleProduct.slug === product.slug
    );
  }

  useEffect(() => {
    const handleCategory = () => {
      if (states.categories && singleProduct && singleProduct.catSlug) {
        let cat = states.categories.find(
          (cat) => cat.cat_slug === singleProduct.catSlug
        );
        setCategoryName(cat?.cat_name);
      }
    };
    handleCategory();
  }, [singleProduct, productSlug]);

  useEffect(() => {
    const handleBrand = () => {
      if (states.brands && singleProduct && singleProduct.brandSlug) {
        let brand = states.brands.find(
          (b) => b.slug === singleProduct.brandSlug
        );
        setBrandName(brand?.name);
      }
    };
    handleBrand();
    getProductReviews();
  }, [singleProduct, productSlug]);

  const shareableRoute = process.env.NEXT_PUBLIC_API_ENDPOINT + asPath;

  const handleIncreaseQuantity = async (item: ICartProduct) => {
    if (!user_slug) {
      toast.error("Please Login First");
      return;
    }

    if (!item.stock) {
      toast.error(
        "Sorry, this product is out of stock. Please add to wishlist instead."
      );
      return;
    }

    if (item.stock && cartQuantity > item.stock) {
      toast.error("Cart quantity cannot be more than available stock");
      return;
    }

    if (cartQuantity > 10) {
      toast.error(
        "Sorry, One can not buy more than 10 units of a single product."
      );
      return;
    }

    controller.setApiLoading(true);
    if (!states?.cartlistData?.some((prd) => prd.slug === item.slug)) {
      const cartProductData = {
        user_slug: user_slug,
        product_slug: singleProduct?.slug,
        quantity: 1,
      };

      const { res, err } = await EcommerceApi.addToCart(cartProductData);

      if (res) {
        const newProduct = {
          ...singleProduct,
          cart_slug: res.slug,
        };

        //@ts-ignore
        controller.setAddToCartListWithQuantity(newProduct, cartQuantity);
        toast.success("Added to cart");
      } else {
        console.log(err);
        toast.error("Failed");
      }
    } else {
      const newProduct = {
        ...singleProduct,
      };

      //@ts-ignore
      controller.setAddToCartListWithQuantity(newProduct, cartQuantity);
      toast.success("Added to cart");
    }

    controller.setApiLoading(false);
  };

  const isInWishlist = (slug: string | undefined) => {
    for (let i = 0; i < states?.wishlistData?.length; i++) {
      if (states?.wishlistData[i]?.slug === slug) {
        return true;
      }
    }
    return false;
  };

  const handleWishlist = async () => {
    if (!user_slug) {
      toast.error("Please Login First");
      return;
    }

    controller.setApiLoading(true);
    //@ts-ignore
    const newProduct: IWishlistProduct = { ...singleProduct };
    //@ts-ignore
    delete newProduct._id;
    newProduct.user_slug = user_slug;

    if (!isInWishlist(newProduct.slug)) {
      const { res, err } = await EcommerceApi.postWishlistProduct(newProduct);
      if (err) {
        console.log(err);
      } else {
        controller.setAddtoWishlist(newProduct);
        toast.success("Added to wishlist");
      }
    } else {
      const { res, err } = await EcommerceApi.deleteWishlistSingleProduct(
        newProduct.slug,
        newProduct?.user_slug
      );
      if (err) {
      } else {
        controller.setRemoveWishlistSingleProduct(newProduct);
        toast.success("Removed from wishlist");
      }
    }

    controller.setApiLoading(false);
  };

  return (
    <div className="mt-10 lg:mt-0">
      <span className="text-xs text-qgray font-normal uppercase tracking-wider mb-2 inline-block">
        {brandName}
      </span>

      <h1 className="text-xl text-qblack font-medium mb-4 capitalize">
        {props.singleProduct?.productName}
      </h1>

      <div className="flex gap-x-[10px] items-center mb-6">
        <div className="flex">
          {singleProduct && avgRating !== 0 && (
            <ReactStars
              count={5}
              value={avgRating}
              edit={false}
              size={24}
              isHalf={true}
              emptyIcon={<FaRegStar />}
              halfIcon={<FaStarHalfAlt />}
              fullIcon={<FaStar />}
              activeColor="#FFA800"
              color="#d3d3d3"
            />
          )}
          {singleProduct && avgRating === 0 && (
            <ReactStars
              count={5}
              value={0}
              edit={false}
              size={24}
              isHalf={true}
              emptyIcon={<FaRegStar />}
              halfIcon={<FaStarHalfAlt />}
              fullIcon={<FaStar />}
              activeColor="#FFA800"
              color="#d3d3d3"
            />
          )}
        </div>

        {singleProduct && totalReview !== 0 && (
          <span className="font-semibold text-[15px]  text-qblack">
            {" "}
            {totalReview} Reviews
          </span>
        )}
        {singleProduct && totalReview === 0 && (
          <span className="font-semibold text-[15px]  text-qblack">
            {" "}
            {totalReview} Reviews
          </span>
        )}
      </div>

      <div className="flex gap-x-2 items-baseline mb-7">
        <span
          className={`${
            props.singleProduct?.offerPrice
              ? "line-through text-qgray"
              : "text-red-500 text-[24px]"
          }  font-semibold  text-[15px]`}
        >
          ${props.singleProduct?.price}
        </span>
        <span className="text-red-500 font-semibold text-[24px] ml-2">
          {props.singleProduct?.offerPrice ? `$` : ""}

          {props.singleProduct?.offerPrice
            ? props.singleProduct?.offerPrice
            : ""}
        </span>
      </div>

      <div className="mb-[30px]">
        <p className="text-qgray text-sm font-normal leading-7">
          {props.singleProduct?.description}
        </p>
        <button type="button" className="text-blue-500 text-xs font-bold">
          See Less
        </button>
      </div>

      <div className="p-3 bg-[rgb(249,243,231)] flex items-center gap-x-2 mb-[30px] rounded-lg w-fit">
        <span className="text-base font-bold text-qblack">Availability :</span>
        <span className="text-base font-bold text-qyellow">
          {props.singleProduct?.stock} Products Available
        </span>
      </div>

      <div className="w-full flex items-center h-[50px] gap-x-[10px] mb-[30px]">
        <div className="w-[120px] h-full px-[26px] flex items-center border border-gray-200">
          <div className="flex justify-between items-center w-full">
            <button
              onClick={() => {
                if (!(cartQuantity <= 1)) {
                  setCartQuantity(cartQuantity - 1);
                }
              }}
              type="button"
              className="text-base text-qgray"
            >
              -
            </button>
            <span className="text-qblack">{cartQuantity}</span>
            <button
              onClick={() => {
                if (!(cartQuantity >= 10)) {
                  setCartQuantity(cartQuantity + 1);
                }
              }}
              type="button"
              className="text-base text-qgray"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleWishlist}
          className="w-[60px] h-full flex justify-center items-center border border-qgray-border"
        >
          <span className="w-10 h-10 flex text-black hover:text-black justify-center items-center transition-all duration-300 ease-in-out   rounded">
            {
              //@ts-ignore
              singleProduct && isInWishlist(singleProduct.slug as string) ? (
                <BsHeartFill
                  style={{
                    width: "25px",
                    height: "21px",
                    color: "#EF272D",
                  }}
                />
              ) : (
                <BsHeart style={{ width: "25px", height: "21px" }} />
              )
            }
          </span>
        </button>

        <div className="flex-1 h-full">
          <button
            type="button"
            onClick={() =>
              handleIncreaseQuantity(props.singleProduct as ICartProduct)
            }
            className="bg-black text-white text-sm font-semibold w-full h-full"
          >
            Add To Cart
          </button>
        </div>
      </div>

      <div className="mb-[20px]">
        <p className="text-[13px] text-qgray leading-7">
          <span className="text-qblack">Category : {categoryName}</span>
        </p>
      </div>

      <div className="flex gap-x-2 items-center mb-[20px] text-qred">
        <FaFlag className="w-3 h-3" />
        <button
          onClick={() => setReportModalSlug("aaa")}
          type="button"
          className="font-semibold text-[13px]"
        >
          Report This Item
        </button>
      </div>

      <div
        data-aos="fade-up"
        className="social-share flex items-center w-full aos-init aos-animate"
      >
        <span className="text-qblack text-[13px] mr-[17px] inline-block">
          Share This
        </span>
        <div className="flex items-center">
          <div
            aria-label="facebook"
            className="bg-transparent border-none p-0 cursor-pointer"
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
            className="bg-transparent border-none p-0 cursor-pointer"
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
  );
};

export default ProductDetails;
