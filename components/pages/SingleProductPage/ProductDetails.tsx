import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FaRegHeart, FaFlag } from "react-icons/fa";
// import ReactStars from "react-rating-stars-component";
import { useRouter } from "next/router";
import FacebookIcon from "react-share/lib/FacebookIcon";
import TwitterIcon from "react-share/lib/TwitterIcon";
import {
  ICartProduct,
  IProduct,
  IWishlistProduct,
} from "../../../interfaces/models";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { CartHandler } from "../../../src/utils/CartHandler";
import { CookiesHandler } from "../../../src/utils/CookiesHandler";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface Props {
  // brand: string;
  singleProduct: IProduct | null;
  setReportModalSlug: Dispatch<SetStateAction<string>>;
}

const user_slug = CookiesHandler.getSlug();

const ProductDetails: React.FC<Props> = (props) => {
  const { singleProduct } = props;
  const states = useSelector(() => controller.states);
  const [brandName, setBrandName] = useState<string | undefined>("");

  let selectedItem: ICartProduct | undefined;

  if (singleProduct) {
    selectedItem = states?.cartlistData?.find(
      (product) => singleProduct.slug === product.slug
    );
  }

  const [cartQuantity, setCartQuantity] = useState<number>(
    selectedItem?.quantity || 1
  );

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
  }, [singleProduct]);
  const { setReportModalSlug } = props;
  const router = useRouter();

  const shareableRoute = process.env.NEXT_PUBLIC_API_ENDPOINT + router.asPath;
  // const shareableRoute = "https://www.google.com" || undefined;

  // console.log({ shareableRoute, router });

  const handleIncreaseQuantity = async (item: ICartProduct) => {
    if (!item.stock) {
      alert("Sorry, this product is out of stock. Please add to wishlist instead.");
      return;
    }

    if (item.stock && cartQuantity > item.stock) {
      alert("Cart quantity cannot be more than available stock");
      return;
    }

    if (cartQuantity > 10) {
      alert("Sorry, One can not buy more than 10 units of a single product.");
    }

    if (user_slug) {
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
        } else {
          console.log(err);
          alert("Failed");
        }
      } else {
        const newProduct = {
          ...singleProduct,
        };

        //@ts-ignore
        controller.setAddToCartListWithQuantity(newProduct, cartQuantity);
      }
    } else {
      alert("Please Login First");
    }
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
        console.log(res);
        controller.setAddtoWishlist(newProduct);
      }
    } else {
      const { res, err } = await EcommerceApi.deleteWishlistSingleProduct(
        newProduct.slug,
        newProduct?.user_slug
      );
      if (err) {
      } else {
        controller.setRemoveWishlistSingleProduct(newProduct);
      }
    }
  };

  return (
    <div className="mt-10 lg:mt-0">
      <span className="text-xs text-qgray font-normal uppercase tracking-wider mb-2 inline-block">
        {brandName}
      </span>

      <h1 className="text-xl text-qblack font-medium mb-4">
        {props.singleProduct?.productName}
      </h1>

      <div className="flex gap-x-[10px] items-center mb-6">
        <div className="flex">
          <span className="text-gray-500">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                fill="#D2D8E1"
              ></path>
            </svg>
          </span>
          <span className="text-gray-500">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                fill="#D2D8E1"
              ></path>
            </svg>
          </span>
          <span className="text-gray-500">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                fill="#D2D8E1"
              ></path>
            </svg>
          </span>
          <span className="text-gray-500">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                fill="#D2D8E1"
              ></path>
            </svg>
          </span>
          <span className="text-gray-500">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
                fill="#D2D8E1"
              ></path>
            </svg>
          </span>
        </div>
        <span className="text-[13px] font-normal text-qblack">
          {/* {props.itemDetail?.reviews?.length}  */}
          Reviews
        </span>
      </div>

      <div className="flex gap-x-2 items-baseline mb-7">
        <span className="font-semibold line-through text-qgray text-[15px]">
          ${props.singleProduct?.price}
        </span>
        <span className="text-red-500 font-semibold text-[24px] ml-2">
          ${props.singleProduct?.offerPrice}
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
          {/* </> */}
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
          <span className="text-qblack">Category :</span>
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
