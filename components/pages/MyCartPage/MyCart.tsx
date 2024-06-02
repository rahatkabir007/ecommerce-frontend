import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { ICartProduct } from "../../../interfaces/models";
import { controller } from "../../../src/state/StateController";
import SharedEmptyCart from "../../shared/SharedEmptyCart/SharedEmptyCart";
import PageHeader from "../../shared/SharedPageHeader/PageHeader";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { CartHandler } from "../../../src/utils/CartHandler";
import toast from "react-hot-toast";
import useWindowDimensions from "../../shared/hooks/useWindowDimensions";
interface Props {}

const MyCart: React.FC<Props> = (props) => {
  const { user, cartlistData } = useSelector(() => controller.states);
  const user_slug = user?.slug;

  const { height, width } = useWindowDimensions();

  const handleIncreaseQuantity = async (item: ICartProduct) => {
    if (cartlistData?.some((prd) => prd.slug === item.slug)) {
      const selectedItem = cartlistData?.find((prd) => prd.slug === item.slug);

      if (
        selectedItem &&
        selectedItem.stock &&
        selectedItem?.quantity >= selectedItem?.stock
      ) {
        toast.error("Cart quantity cannot be more than available stock");
        return;
      }

      if (selectedItem && selectedItem.stock && selectedItem?.quantity >= 10) {
        toast.error(
          "Sorry, One can not buy more than 10 units of a single product."
        );
        return;
      }

      controller.setAddtoCartlist(item);
    } else {
      const { res, err } = await EcommerceApi.updateSingleCartProduct(
        item?.cart_slug,
        item?.quantity + 1
      );
      if (res) {
        controller.setAddtoCartlist(item);
      }
    }
  };

  const handleDecreaseQuantity = async (item: ICartProduct) => {
    if (item?.quantity === 1) {
      await CartHandler.handleDeleteFromCart(item, user_slug as string);
    } else {
      controller.setMinusFromCartlist(item);
    }
  };

  const handleAllCartProductClear = async () => {
    controller.setApiLoading(true);
    if (user_slug) {
      const { res, err } = await EcommerceApi.deleteAllCartlistProduct(
        user_slug
      );
      if (err) {
        console.log(err);
      } else {
        //
        toast.success("Cart Cleared");
        controller.setClearCartlist();
      }
    }
    controller.setApiLoading(false);
  };

  const handleDeleteFromCart = async (
    item: ICartProduct,
    user_slug: string
  ) => {
    controller.setApiLoading(true);
    await CartHandler.handleDeleteFromCart(item, user_slug as string);
    toast.success("Item Removed From Cart");
    controller.setApiLoading(false);
  };

  return (
    <div className="w-full min-h-screen pt-0 md:pt-[30px] pb-[5px]">
      {cartlistData.length === 0 ? (
        <SharedEmptyCart
          slug="cartlist"
          imgURL="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2F%2Fuploads%2Fwebsite-images%2Fempty_cart-2022-11-17-11-10-20-7795.png&w=1920&q=75"
        />
      ) : (
        <>
          <PageHeader slug="Cart" link="/cart" title="Your Cart" />
          <div className="w-full mt-2 md:mt-[23px] ">
            <div className="container-x mx-auto">
              <div className="w-full mb-2 md:mb-[30px]">
                <div className="relative w-full overflow-x-auto md:border border-[#EDEDED]">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr
                        className={
                          width && width > 640
                            ? "text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase"
                            : "hidden"
                        }
                      >
                        <td
                          width="60%"
                          className="py-4 capitalize pl-10 block whitespace-nowrap"
                        >
                          Product
                        </td>
                        <td
                          width={150}
                          className="py-4 capitalize whitespace-nowrap text-center"
                        >
                          Price
                        </td>
                        <td
                          width={120}
                          className="py-4 capitalize whitespace-nowrap text-center"
                        >
                          Quantity
                        </td>
                        <td
                          width={150}
                          className="py-4 capitalize whitespace-nowrap text-center"
                        >
                          Total
                        </td>
                        <td
                          width={60}
                          className="py-4 capitalize whitespace-nowrap text-center block"
                        >
                          {/* Action */}
                        </td>
                      </tr>
                      {cartlistData?.map((item, ind) => {
                        const selectedItem = cartlistData?.find(
                          (product) => item.slug === product.slug
                        );
                        return (
                          <tr
                            key={item.slug}
                            className={
                              width && width > 640
                                ? "border-b"
                                : "flex mb-2 border" +
                                  " bg-white  hover:bg-gray-50 relative overflow-hidden"
                            }
                          >
                            <td
                              width="60%"
                              className={
                                width && width > 640
                                  ? "pl-10 py-4 w-[380px]"
                                  : "w-full p-2" + " capitalize"
                              }
                            >
                              <div className="flex gap-x-4 md:gap-x-6 md:items-center">
                                <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED] relative">
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
                                    <img
                                      alt="product"
                                      src={item?.imageURL[0]}
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
                                      }}
                                      sizes="100vw"
                                    />
                                  </span>
                                </div>
                                <div className="flex-1 flex flex-col">
                                  <p className="font-medium text-sm md:text-[15px] text-qblack hover:text-blue-500 cursor-pointer pt-1 md:pt-0 line-clamp-1">
                                    <Link
                                      href={`/single_product?slug=${item.slug}`}
                                    >
                                      {item.productName}
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td
                              width={150}
                              className={
                                width && width > 640
                                  ? "text-center py-4 capitalize px-2"
                                  : "hidden"
                              }
                            >
                              <div className="flex space-x-1 items-center justify-center">
                                <span className="text-sm md:text-[15px] font-semibold md:font-normal">
                                  $
                                  {item.offerPrice
                                    ? item.offerPrice
                                    : item.price}
                                </span>
                              </div>
                            </td>

                            <td
                              width={120}
                              className={
                                width && width > 640
                                  ? "text-center py-4 capitalize px-2"
                                  : "absolute left-[103px] top-[50px]"
                              }
                            >
                              <div className="md:flex space-x-1 items-center justify-center ">
                                <div className="w-[75px] md:w-[120px] h-full md:px-[26px] flex items-center md:border border-gray-200">
                                  <div className="flex justify-between items-center w-full py-2">
                                    <button
                                      onClick={() =>
                                        handleDecreaseQuantity(item)
                                      }
                                      type="button"
                                      className="text-base text-white md:text-qgray font-bold bg-qyellow md:bg-transparent hover:bg-yellow-600 md:hover:bg-transparent rounded-full md:rounded-none w-5 md:w-auto h-5 md:h-auto flex md:block justify-center items-center"
                                    >
                                      -
                                    </button>
                                    <span className="text-qblack">
                                      {selectedItem?.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleIncreaseQuantity(item)
                                      }
                                      type="button"
                                      className="text-base text-white md:text-qgray font-bold bg-qyellow md:bg-transparent hover:bg-yellow-600 md:hover:bg-transparent rounded-full md:rounded-none w-5 md:w-auto h-5 md:h-auto flex md:block justify-center items-center"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td
                              width={150}
                              className={
                                width && width > 640
                                  ? "text-center py-4 capitalize px-2"
                                  : "absolute left-[103px] top-[34px] text-qred "
                              }
                            >
                              <div className="md:flex space-x-1 items-center justify-center">
                                <span className="text-sm md:text-[15px] font-semibold md:font-normal">
                                  ${CartHandler.getPrice(item)}
                                </span>
                              </div>
                            </td>

                            <td
                              width={60}
                              className={
                                width && width > 640
                                  ? "text-right py-4 capitalize"
                                  : "absolute -right-[13px] top-[5px]"
                              }
                            >
                              <div className="flex space-x-1 items-center justify-center p-2">
                                <span
                                  className="cursor-pointer"
                                  onClick={() =>
                                    handleDeleteFromCart(
                                      item,
                                      user_slug as string
                                    )
                                  }
                                >
                                  <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                                      fill="#AAAAAA"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-full sm:flex justify-between ">
                <div className="flex w-full md:space-x-4 items-center mb-16">
                  <button
                    className="hidden md:block"
                    onClick={handleAllCartProductClear}
                  >
                    <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
                      Clear Cart
                    </div>
                  </button>
                  <Link
                    className="grid w-full md:w-[300px] h-[50px] bg-black place-items-center"
                    href="/checkout"
                  >
                    <span className="text-sm text-white font-semibold">
                      Proceed to Checkout
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCart;
