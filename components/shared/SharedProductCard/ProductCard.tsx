import React from "react";
import { useSelector } from "react-redux";
import { IProduct, IWishlistProduct } from "../../../interfaces/models";
import { controller } from "../../../src/state/StateController";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import styles from "./ProductCard.module.css";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import Link from "next/link";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { CookiesHandler } from "../../../src/utils/CookiesHandler";
interface Props {
  // product: IProduct;
  product: IWishlistProduct;
}

const user_slug = CookiesHandler.getSlug();

const ProductCard: React.FC<Props> = (props) => {
  const { product } = props;
  // console.log(product);
  const states = useSelector(() => controller.states);

  const isInWishlist = (slug: string | undefined) => {
    for (let i = 0; i < states?.wishlistData?.length; i++) {
      if (states?.wishlistData[i]?.slug === slug) {
        return true;
      }
    }
    return false;
  };

  const handleWishlist = async () => {
    const newProduct = { ...product };
    //@ts-ignore
    delete newProduct._id;
    newProduct.user_slug = user_slug;

    if (!isInWishlist(product.slug)) {
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

  const cartListProduct = states?.cartlistData.find(
    (cartProduct) => cartProduct.slug === product.slug
  );

  const handleCartToggle = async () => {
    if (!user_slug) {
      alert("Please login first");
      return;
    }

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
      } else {
        console.log(err);
        alert("Failed");
      }
    }
  };

  return (
    <div>
      <div data-aos="fade-up" className="item aos-init">
        <div className="main-wrapper-card relative">
          <div
            className={`${styles["product-card-one"]} w-full h-[445px] bg-white relative group overflow-hidden`}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 15px 64px 0px",
            }}
          >
            <div className="product-card-img w-full h-[300px] -mt-2">
              <div className="w-full h-full relative flex justify-center items-center transform scale-100 group-hover:scale-110 transition duration-300 ease-in-out">
                <span
                  style={{
                    boxSizing: "border-box",
                    display: "block",
                    overflow: "hidden",
                    width: "initial",
                    height: "initial",
                    background: "none",
                    opacity: 1,
                    border: 0,
                    margin: 0,
                    padding: 0,
                    position: "absolute",
                    inset: 0,
                  }}
                >
                  <picture>
                    {product && product?.imageURL?.length > 0 && (
                      <img
                        alt=""
                        src={product?.imageURL[0]}
                        decoding="async"
                        data-nimg="fill"
                        className="w-full h-full object-contain"
                        style={{
                          position: "absolute",
                          inset: 0,
                          boxSizing: "border-box",
                          padding: 0,
                          border: "none",
                          margin: "auto",
                          display: "block",
                          width: 0,
                          height: 0,
                          minWidth: "100%",
                          maxWidth: "100%",
                          minHeight: "100%",
                          maxHeight: "100%",
                          objectFit: "scale-down",
                        }}
                        sizes="100vw"
                      />
                    )}
                  </picture>
                </span>
              </div>
            </div>
            <div className="product-card-details px-[30px] pb-[30px] relative pt-2">
              <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[85px] transition-all duration-300 ease-in-out">
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
              <div className="reviews flex space-x-[1px] mb-3">
                <span className="text-gray-500">
                  <SvgIconRenderer
                    width={"18"}
                    height={"17"}
                    viewBox={"0 0 18 17"}
                    fill={"none"}
                    xmlns={"http://www.w3.org/2000/svg"}
                    path={SvgPaths.ratingIcon}
                    pathFill={"#D2D8E1"}
                  />
                </span>
                <span className="text-gray-500">
                  <SvgIconRenderer
                    width={"18"}
                    height={"17"}
                    viewBox={"0 0 18 17"}
                    fill={"none"}
                    xmlns={"http://www.w3.org/2000/svg"}
                    path={SvgPaths.ratingIcon}
                    pathFill={"#D2D8E1"}
                  />
                </span>
                <span className="text-gray-500">
                  <SvgIconRenderer
                    width={"18"}
                    height={"17"}
                    viewBox={"0 0 18 17"}
                    fill={"none"}
                    xmlns={"http://www.w3.org/2000/svg"}
                    path={SvgPaths.ratingIcon}
                    pathFill={"#D2D8E1"}
                  />
                </span>
                <span className="text-gray-500">
                  <SvgIconRenderer
                    width={"18"}
                    height={"17"}
                    viewBox={"0 0 18 17"}
                    fill={"none"}
                    xmlns={"http://www.w3.org/2000/svg"}
                    path={SvgPaths.ratingIcon}
                    pathFill={"#D2D8E1"}
                  />
                </span>
                <span className="text-gray-500">
                  <SvgIconRenderer
                    width={"18"}
                    height={"17"}
                    viewBox={"0 0 18 17"}
                    fill={"none"}
                    xmlns={"http://www.w3.org/2000/svg"}
                    path={SvgPaths.ratingIcon}
                    pathFill={"#D2D8E1"}
                  />
                </span>
              </div>
              <Link
                rel="noopener noreferrer"
                href={`/single_product?slug=${product.slug}`}
              >
                <p className="title mb-2 text-[15px] font-semibold text-qblack leading-[24px] line-clamp-2 hover:text-blue-600 cursor-pointer">
                  {product.productName}
                </p>
              </Link>
              <p className="price">
                <span className="main-price  font-semibold text-[18px] line-through text-qgray">
                  <span>${product.price}</span>
                </span>
                <span className="offer-price text-qred font-semibold text-[18px] ml-2">
                  <span>${product.offerPrice}</span>
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

              {/* <button
                className="absolute group-hover:right-4 -right-10 top-[168px] transition-all duration-500 ease-in-out"
                type="button"
              >
                <span className="w-10 h-10 flex justify-center text-black hover:text-white transition-all duration-300 ease-in-out items-center hover:bg-qyellow bg-primarygray rounded">
                  <SvgIconRenderer
                    width={"20"}
                    height={"22"}
                    viewBox={"0 0 20 22"}
                    fill={"none"}
                    xmlns={"http://www.w3.org/2000/svg"}
                    path={SvgPaths.compare}
                    pathFill={"black"}
                  />
                </span>
              </button> */}
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
