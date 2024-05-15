import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { action } from "usm-redux";
import { IProduct, IWishlistProduct } from "../../../interfaces/models";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { controller } from "../../../src/state/StateController";
import { CookiesHandler } from "../../../src/utils/CookiesHandler";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import styles from "./ProductCardVertical.module.css";

interface Props {
  // product: IProduct;
  product: IWishlistProduct;
}

const user_slug = CookiesHandler.getSlug();

const ProductCardVertical: React.FC<Props> = (props) => {
  const { product } = props;
  const states = useSelector(() => controller.states);

  const handleWishlist = async () => {
    if (!user_slug) {
      alert("Please login first");
      return;
    }

    product.user_slug = states.user?.slug;

    if (!isInWishlist(product.slug)) {
      const { res, err } = await EcommerceApi.postWishlistProduct(product);
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        controller.setAddtoWishlist(product);
      }
    } else {
      const { res, err } = await EcommerceApi.deleteWishlistSingleProduct(
        product.slug,
        product.user_slug
      );
      if (err) {
      } else {
        controller.setRemoveWishlistSingleProduct(product);
      }
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

  const isInCartlist = (slug: string | undefined) => {
    for (let i = 0; i < states?.cartlistData?.length; i++) {
      if (states?.cartlistData[i]?.slug === slug) {
        return true;
      }
    }
    return false;
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

  // const handleWishlist = () => {
  //   controller.setAddtoWishlist(product);
  // };

  // const handleCartlist = () => {
  //   controller.setAddtoCartlist(product);
  // };

  return (
    <div>
      <div className="item w-full group">
        <div className="main-wrapper-card relative">
          <div
            data-aos="fade-left"
            className={`${styles["product-row-card-style-one"]} w-full lg:h-[250px] h-[200px] bg-white group relative overflow-hidden aos-init aos-animate`}
          >
            <div className="flex space-x-5 items-center w-full h-full lg:p-[30px] sm:p-5 p-2 ">
              <div className="lg:w-1/2 w-1/3 h-full relative transform scale-100 group-hover:scale-110 transition duration-300 ease-in-out">
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
                  className=""
                >
                  <picture>
                    {product && product?.imageURL?.length > 0 && (
                      <img
                        decoding="async"
                        data-nimg="fill"
                        style={{
                          position: "absolute",
                          inset: 0,
                          boxSizing: "border-box",
                          padding: 0,
                          border: "none",
                          margin: "auto",
                          display: "block",
                          objectFit: "scale-down",
                        }}
                        className="w-full h-full object-contain"
                        src={product?.imageURL[0]}
                        alt=""
                      />
                    )}
                  </picture>
                </span>
              </div>
              <div className="flex-1 flex flex-col justify-center h-full">
                <div>
                  <div className="flex space-x-1 mb-3">
                    <span>
                      <SvgIconRenderer
                        className="fill-qgray"
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        xmlns="http://www.w3.org/2000/svg"
                        path={SvgPaths.ratingIcon}
                        pathFill="fill-qgray"
                      />
                    </span>
                    <span className="fill-qgray">
                      <SvgIconRenderer
                        className="fill-qgray"
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        xmlns="http://www.w3.org/2000/svg"
                        path={SvgPaths.ratingIcon}
                        pathFill="fill-qgray"
                      />
                    </span>
                    <span className="fill-qgray">
                      <SvgIconRenderer
                        className="fill-qgray"
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        xmlns="http://www.w3.org/2000/svg"
                        path={SvgPaths.ratingIcon}
                        pathFill="fill-qgray"
                      />
                    </span>
                    <span className="fill-qgray">
                      <SvgIconRenderer
                        className="fill-qgray"
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        xmlns="http://www.w3.org/2000/svg"
                        path={SvgPaths.ratingIcon}
                        pathFill="fill-qgray"
                      />
                    </span>
                    <span className="fill-qgray">
                      <SvgIconRenderer
                        className="fill-qgray"
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        xmlns="http://www.w3.org/2000/svg"
                        path={SvgPaths.ratingIcon}
                        pathFill="fill-qgray"
                      />
                    </span>
                  </div>
                  <Link href={`/single_product?slug=${product.slug}`}>
                    <p className="title mb-2 sm:text-[15px] text-[13px] font-600 text-slate-700 font-semibold leading-[24px] line-clamp-2 hover:text-blue-600 cursor-pointer">
                      {product.productName}
                    </p>
                  </Link>
                  <p className="price mb-[26px]">
                    <span className="main-price font-semibold  font-600 text-[18px] line-through text-gray-500">
                      <span>{product.price}</span>
                    </span>
                    <span className="offer-price text-red-500 font-600 font-semibold text-[18px] ml-2">
                      <span>{product.offerPrice}</span>
                    </span>
                  </p>

                  {/* <button
                    onClick={handleCartToggle}
                    type="button"
                    className={`${styles["yellow-btn"]} group relative w-full h-full flex shadow justify-center items-center overflow-hidden`}>
                    <div
                      className={`${styles["btn-content"]} flex items-center space-x-3 relative z-10`}>
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
                      className={`${styles["bg-shape"]} w-full h-full absolute bg-qblack`}></div>
                  </button> */}

                  <button
                    type="button"
                    onClick={handleCartToggle}
                    className={`h-[30px] ${
                      isInCartlist(product.slug) ? "w-[140px] " : "w-[110px] "
                    } `}
                  >
                    <span className="yellow-btn">
                      {isInCartlist(product.slug)
                        ? "Remove From Cart"
                        : "Add To Cart"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="quick-access-btns flex flex-col space-y-2">
              <button
                className=" absolute group-hover:left-4 -left-10 top-5 transition-all ease-in-out"
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
                className="absolute group-hover:left-4 -left-10 top-[60px] transition-all duration-300 ease-in-out"
                type="button"
                onClick={handleWishlist}
              >
                <span className="w-10 h-10 flex text-black hover:text-white justify-center items-center transition-all duration-300 ease-in-out hover:bg-qyellow bg-primarygray rounded">
                  <SvgIconRenderer
                    width={"21"}
                    height={"18"}
                    viewBox={"0 0 21 18"}
                    fill={"none"}
                    className={"fill-current"}
                    xmlns={"http://www.w3.org/2000/svg"}
                    path={
                      isInWishlist(product.slug)
                        ? SvgPaths.filledHeart
                        : SvgPaths.emptyHeart
                    }
                    pathFill={isInWishlist(product.slug) ? "#EF272D" : "black"}
                  />
                </span>
              </button>
              {/* <button
                className="absolute group-hover:left-4 -left-10 top-[107px] transition-all duration-500 ease-in-out"
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

export default ProductCardVertical;
