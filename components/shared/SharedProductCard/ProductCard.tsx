import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IWishlistProduct } from "../../../interfaces/models";
import { controller } from "../../../src/state/StateController";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import styles from "./ProductCard.module.css";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import Link from "next/link";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import toast from "react-hot-toast";
//@ts-ignore
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import useWindowDimensions from "../hooks/useWindowDimensions";
interface Props {
  product: IWishlistProduct;
  grid?: boolean;
}

const ProductCard: React.FC<Props> = ({ product, grid = false }) => {
  const states = useSelector(() => controller.states);
  const user_slug = useSelector(() => controller.states.user?.slug);

  const [avgRating, setAvgRating] = useState(0);

  const { height, width } = useWindowDimensions();

  // useEffect(() => {
  //   const getProductReviews = async () => {
  //     let rating = 0;
  //     const { res, err } = await EcommerceApi.getAllProductReviews(
  //       product?.slug
  //     );
  //     if (res?.length !== 0) {
  //       res.map((data) => {
  //         rating = rating + data.rating / res.length;
  //         setAvgRating(rating);
  //       });
  //     } else if (res?.length === 0) {
  //       setAvgRating(0);
  //     }
  //   };
  //   getProductReviews();
  // }, [product.slug]);

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
      toast.error("Please login first");
      return;
    }

    controller.setApiLoading(true);
    const newProduct = { ...product };
    //@ts-ignore
    delete newProduct._id;
    newProduct.user_slug = user_slug;

    if (!isInWishlist(product.slug)) {
      const { res, err } = await EcommerceApi.postWishlistProduct(newProduct);
      if (err) {
        console.log(err);
      } else {
        toast.success("Added To Wishlist");
        controller.setAddtoWishlist(newProduct);
      }
    } else {
      const { res, err } = await EcommerceApi.deleteWishlistSingleProduct(
        newProduct.slug,
        newProduct?.user_slug
      );
      if (err) {
      } else {
        toast.success("Removed from Wishlist");
        controller.setRemoveWishlistSingleProduct(newProduct);
      }
    }
    controller.setApiLoading(false);
  };

  const cartListProduct = states?.cartlistData.find(
    (cartProduct) => cartProduct.slug === product.slug
  );

  const handleCartToggle = async () => {
    if (!user_slug) {
      toast.error("Please login first");
      return;
    }

    controller.setApiLoading(true);

    const cartProductData = {
      user_slug: user_slug,
      product_slug: product.slug,
      quantity: cartListProduct?.quantity || 1,
    };

    if (cartListProduct) {
      const { res, err } = await EcommerceApi.deleteFromCart(
        user_slug,
        product?.slug
      );
      if (res) {
        toast.success("Item Deleted From Cart");
        controller.setRemoveCartItem(product);
      }
    } else {
      const { res, err } = await EcommerceApi.addToCart(cartProductData);
      if (res) {
        const newProduct = {
          ...product,
          cart_slug: res.slug,
          quantity: res.quantity,
        };

        controller.setAddtoCartlist(newProduct);
        toast.success("Added to Cart");
      } else {
        console.log(err);
        toast.error("Failed");
      }
    }

    controller.setApiLoading(false);
  };

  return (
    <div
      className={
        grid ? "w-auto" : "w-[220px]" + " sm:w-auto flex-shrink-0 snap-start"
      }
    >
      <div data-aos="fade-up" className="item aos-init">
        <div className="main-wrapper-card relative">
          <div
            className={`${styles["product-card-one"]} w-full h-[270px] md:h-[445px] bg-white relative group overflow-hidden`}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 15px 64px 0px",
            }}
          >
            <div className="product-card-img w-full h-[150px] md:h-[300px] -mt-2">
              <div className="w-full h-full relative flex justify-center items-center transform scale-100 group-hover:scale-110 transition duration-300 ease-in-out mt-2">
                <picture className="w-full h-full md:h-auto flex justify-center p-1">
                  {product && product?.imageURL?.length > 0 && (
                    <img
                      alt=""
                      src={product?.imageURL[0]}
                      decoding="async"
                      data-nimg="fill"
                      className="object-contain"
                    />
                  )}
                </picture>
              </div>
            </div>
            <div className="product-card-details px-[12px] md:px-[30px] pb-[12px] md:pb-[30px] relative pt-2">
              <div className="absolute w-full h-10 px-[12px] md:px-[30px] left-0 top-40 group-hover:top-[65px] md:group-hover:top-[80px] transition-all duration-300 ease-in-out">
                <button
                  onClick={handleCartToggle}
                  type="button"
                  className={`${styles["yellow-btn"]} group relative w-full h-full flex shadow justify-center items-center overflow-hidden`}
                >
                  <div
                    className={`${styles["btn-content"]} flex items-center space-x-3 relative z-10`}
                  >
                    <span>
                      <SvgIconRenderer
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current"
                        path={SvgPaths.cartIcon}
                        pathFill="fill-current"
                      />
                    </span>

                    {cartListProduct ? (
                      <span>Remove from Cart</span>
                    ) : (
                      <span>Add to Cart</span>
                    )}
                  </div>
                  <div
                    className={`${styles["bg-shape"]} w-full h-full absolute bg-qblack`}
                  ></div>
                </button>
              </div>
              <div className="reviews flex space-x-[1px] mb-1 md:mb-3">
                {product && (
                  <ReactStars
                    count={5}
                    value={product?.rating}
                    edit={false}
                    size={width && width > 640 ? 24 : 16}
                    isHalf={true}
                    emptyIcon={<FaRegStar />}
                    halfIcon={<FaStarHalfAlt />}
                    fullIcon={<FaStar />}
                    activeColor="#FFA800"
                    color="#d3d3d3"
                  />
                )}
                {/* {product && avgRating === 0 && (
                  <ReactStars
                    count={5}
                    value={0}
                    edit={false}
                    size={width && width > 640 ? 24 : 16}
                    isHalf={true}
                    emptyIcon={<FaRegStar />}
                    halfIcon={<FaStarHalfAlt />}
                    fullIcon={<FaStar />}
                    activeColor="#FFA800"
                    color="#d3d3d3"
                  />
                )} */}
              </div>
              <Link
                rel="noopener noreferrer"
                href={`/single_product?slug=${product.slug}`}
              >
                <p className="title md-1 md:mb-2 text-[15px] font-semibold text-qblack leading-[24px] line-clamp-2 hover:text-blue-600 cursor-pointer capitalize">
                  {product.productName}
                </p>
              </Link>
              <p className="price">
                <span
                  className={` ${
                    product.offerPrice
                      ? "line-through text-qgray"
                      : " text-qred"
                  } main-price  font-semibold text-sm md:text-[18px] `}
                >
                  <span>${product.price}</span>
                </span>
                <span className="offer-price text-qred font-semibold text-sm md:text-[18px] ml-2">
                  <span>
                    {product.offerPrice ? `$` : ""}
                    {product.offerPrice ? product.offerPrice : ""}
                  </span>
                </span>
              </p>
            </div>
            <div className="quick-access-btns flex flex-col space-y-2">
              <button
                className=" absolute group-hover:right-4 -right-10 top-20 transition-all ease-in-out"
                type="button"
              >
                <span className="w-10 h-10 flex justify-center text-black hover:text-white items-center transition-all duration-300 ease-in-out hover:bg-qyellow bg-primarygray rounded">
                  <SvgIconRenderer
                    width={"20"}
                    height={"20"}
                    viewBox={"0 0 20 20"}
                    fill={"none"}
                    className={"fill-current"}
                    xmlns={"http://www.w3.org/2000/svg"}
                    path={SvgPaths.zoomImage}
                    pathFill={"black"}
                  />
                </span>
              </button>

              <button
                className="absolute group-hover:right-4 -right-10 top-[120px] transition-all duration-300 ease-in-out"
                type="button"
                onClick={handleWishlist}
              >
                <span className="w-10 h-10 flex text-black hover:text-black justify-center items-center transition-all duration-300 ease-in-out hover:bg-qyellow bg-primarygray rounded">
                  {isInWishlist(product.slug) ? (
                    <BsHeartFill
                      style={{
                        width: "25px",
                        height: "21px",
                        color: "#EF272D",
                      }}
                    />
                  ) : (
                    <BsHeart style={{ width: "25px", height: "21px" }} />
                  )}
                </span>
              </button>
            </div>
          </div>
          <span className={`${styles["anim"]} ${styles["bottom"]} `}></span>
          <span className={`${styles["anim"]} ${styles["right"]} `}></span>
          <span className={`${styles["anim"]} ${styles["top"]} `}></span>
          <span className={`${styles["anim"]} ${styles["left"]} `}></span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
