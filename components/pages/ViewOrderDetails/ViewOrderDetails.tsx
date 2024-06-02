import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IOrder } from "../../../interfaces/models";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { controller } from "../../../src/state/StateController";
import ReviewProductModal from "./ReviewProductmodal/ReviewProductModal";
import { CartHandler } from "../../../src/utils/CartHandler";
import Link from "next/link";
interface Props {}

const ViewOrderDetails: React.FC<Props> = (props) => {
  const user_slug = useSelector(() => controller.states.user?.slug);

  const [orderData, setOrderData] = useState<IOrder | null>(null);
  const [reviewModalSlug, setReviewModalSlug] = useState<any | string>("");
  const [sellerSlug, setSellerSlug] = useState<any | string>("");

  const router = useRouter();
  const { asPath } = router;
  const orderSlug = asPath.split("/")[2];

  const [rating, setRating] = useState(0);
  const ratingChanged = (newRating: number) => {
    setRating(newRating);
  };

  const fetchSingleOrder = async () => {
    if (user_slug && orderSlug) {
      const { res, err } = await EcommerceApi.getSingleOrder(orderSlug);
      if (res) {
        setOrderData(res);
      } else {
        router.replace("/404");
      }
    }
  };

  useEffect(() => {
    fetchSingleOrder();
  }, [orderSlug, user_slug]);

  const handleReview = async (e: any) => {
    e.preventDefault();
    controller.setApiLoading(true);

    const review = {
      product_slug: reviewModalSlug,
      order_slug: orderData?.slug,
      user_slug: user_slug,
      seller_slug: sellerSlug,
      name: e.target.name.value,
      message: e.target.message.value,
      rating: rating,
      status: "active",
    };

    const { res, err } = await EcommerceApi.addReview(review);

    if (res) {
      setReviewModalSlug("");
      setRating(0);
      toast.success("Thank you for your feedback");
    } else if (err) {
      toast.error("Sorry, we could not process your review. Please try again.");
    }
    
    controller.setApiLoading(false);
  };

  return (
    <div>
      <div className="w-full min-h-screen  pt-[30px] pb-[60px]">
        <div className="order-tracking-wrapper w-full">
          <div className="container-x mx-auto">
            <div>
              <div className="breadcrumb-wrapper font-400 text-[13px] text-qblack mb-[23px] print:hidden">
                <span>
                  <a href="/">
                    <span className="mx-1 capitalize">home</span>
                  </a>
                  <span className="sperator">/</span>
                </span>
                <span>
                  <a href="/profile">
                    <span className="mx-1 capitalize">Order</span>
                  </a>
                </span>
              </div>
            </div>
            <div className="w-full h-[168px] bg-[#CBECFF] rounded-2xl mb-10 relative print:hidden">
              <div className="w-full px-10 flex justify-between pt-3 mb-7"></div>
              <div className="flex lg:space-x-[373px] space-x-[90px] rtl:space-x-reverse w-full h-full justify-center">
                <div className="relative">
                  {/* {
                    orderData && (
                       (orderData.order_status === "pending" ||
                         orderData.order_status === "progress" ||
                        orderData.order_status === "delivered") ? ( */}
                  <div className="w-[30px] h-[30px] border-[8px] rounded-full border-qyellow bg-white relative z-20"></div>
                  {/* )
                     ) : (
                       <div className="w-[30px] h-[30px] border-[8px] rounded-full  bg-white relative z-20 border-qgray"></div>
                     )
                  } */}
                  <div className="lg:w-[400px] w-[100px] h-[8px] absolute ltr:lg:-left-[390px] ltr:-left-[92px] rtl:lg:-right-[390px] rtl:-right-[92px] top-[10px] z-10  bg-white"></div>
                  <p className="absolute -left-4 top-10 sm:text-base text-sm font-400">
                    Pending
                  </p>
                </div>
                <div className="relative">
                  {orderData && orderData.order_status === "pending" ? (
                    <div className="w-[30px] h-[30px] border-[8px] rounded-full  bg-white relative z-20 border-qgray"></div>
                  ) : (
                    <div className="w-[30px] h-[30px] border-[8px] rounded-full border-qyellow bg-white relative z-20"></div>
                  )}

                  <div className="lg:w-[400px] w-[100px] h-[8px] absolute ltr:lg:-left-[390px] ltr:-left-[92px] rtl:lg:-right-[390px] rtl:-right-[92px] top-[10px] z-10  bg-white"></div>
                  <p className="absolute -left-4 top-10 sm:text-base text-sm font-400">
                    Progress
                  </p>
                </div>
                <div className="relative">
                  {orderData &&
                  (orderData.order_status === "pending" ||
                    orderData.order_status === "in_progress") ? (
                    <div className="w-[30px] h-[30px] border-[8px] rounded-full  bg-white relative z-20 border-qgray"></div>
                  ) : (
                    <div className="w-[30px] h-[30px] border-[8px] rounded-full border-qyellow bg-white relative z-20"></div>
                  )}
                  <p className="absolute -left-4 top-10 sm:text-base text-sm font-400">
                    Delivered
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white lg:p-10 p-3 rounded-xl">
              <div id="printSection">
                <div className="sm:flex justify-between items-center mb-4">
                  <div>
                    <h1 className="text-[26px] font-semibold text-qblack mb-2.5">
                      Order Details
                    </h1>
                    <ul className="flex flex-col space-y-0.5">
                      <li className="text-[22px]n text-[#4F5562]">
                        Order ID:
                        <span className="text-[#27AE60]">
                          {orderData?.slug}
                        </span>
                      </li>
                      {/* <li className="text-[22px]n text-[#4F5562]">
                        Billing Address:
                        <span className="text-[#27AE60]">
                          {`City: ${orderData?.address.city}, 
                         State: ${orderData?.address.state}, 
                         Country: ${orderData?.address.country}
                         Additional: ${orderData?.address.address}`}
                        </span>
                      </li> */}
                      <li className="text-[22px]n text-[#4F5562]">
                        Shipping Address:
                        <span className="text-[#27AE60]">
                          {`City: ${orderData?.address?.city}, 
                         State: ${orderData?.address?.state}, 
                         Country: ${orderData?.address?.country}
                         Additional: ${orderData?.address?.address}`}
                        </span>
                      </li>
                      <li className="text-[22px]n text-[#4F5562]">
                        Type: <span className="text-[#27AE60]">Office</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <button
                      onClick={() => print()}
                      type="button"
                      className="w-[161px] h-[52px] rounded flex space-x-2.5 rtl:space-x-reverse items-center justify-center bg-qyellow print:hidden mt-5 sm:mt-0"
                    >
                      <span>
                        <svg
                          width="27"
                          height="26"
                          viewBox="0 0 27 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24.9 6.10885H22.0364V0.900017C22.0364 0.402996 21.6334 0 21.1364 0H5.86364C5.36662 0 4.96362 0.402943 4.96362 0.900017V6.10885H2.09999C0.942047 6.10885 0 7.05095 0 8.2089V17.2635C0 18.4214 0.942047 19.3635 2.09999 19.3635H4.96378V24.1947C4.96378 24.6917 5.36672 25.0947 5.8638 25.0947H21.1362C21.6332 25.0947 22.0362 24.6918 22.0362 24.1947V19.3635H24.9C26.058 19.3635 27 18.4214 27 17.2635V8.2089C27 7.05101 26.058 6.10885 24.9 6.10885ZM6.76361 1.80004H20.2363V6.10885H6.76361V1.80004ZM20.2362 23.2947H6.76382C6.76382 23.1188 6.76382 16.149 6.76382 15.9315H20.2362C20.2362 16.1545 20.2362 23.1256 20.2362 23.2947ZM21.1364 11.3936H18.8454C18.3484 11.3936 17.9454 10.9907 17.9454 10.4936C17.9454 9.99654 18.3483 9.5936 18.8454 9.5936H21.1364C21.6334 9.5936 22.0364 9.99654 22.0364 10.4936C22.0364 10.9907 21.6334 11.3936 21.1364 11.3936Z"
                            fill="#222222"
                          ></path>
                        </svg>
                      </span>
                      <span className="text-sm text-qblack">Print PDF</span>
                    </button>
                  </div>
                </div>
                <div className="relative w-full overflow-x-auto overflow-style-none border border-[#EDEDED] box-border mb-10">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                        <td className="pl-10 py-4 ltr:pl-10 rtl:pr-10 block whitespace-nowrap rtl:text-right w-[380px]">
                          Product
                        </td>
                        <td className="py-4 whitespace-nowrap text-center">
                          quantity
                        </td>
                        <td className="py-4 whitespace-nowrap text-center"></td>
                        <td className="py-4 whitespace-nowrap text-center capitalize">
                          SUBTOTAL
                        </td>
                        <td className="py-4 whitespace-nowrap text-center print:hidden">
                          Review
                        </td>
                      </tr>

                      {orderData?.product_list.map((order) => (
                        <tr className="bg-white border-b hover:bg-gray-50">
                          <td className="pl-10 w-[400px] py-4 ">
                            <div className="flex space-x-6 items-center">
                              <div className="flex-1 flex flex-col">
                                <p className="font-medium text-[15px] text-blue-500 rtl:text-right rtl:pr-10">
                                  <Link
                                    href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/single_product?slug=${order.slug}`}
                                  >
                                    {order.productName}
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className=" py-4">
                            <div className="flex justify-center items-center">
                              <div className="w-[54px] h-[40px] justify-center flex items-center border border-qgray-border">
                                <span>{order.quantity}</span>
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-4 px-2">
                            <div className="flex space-x-1 items-center justify-center">
                              <span className="text-[15px] font-normal">
                                <span>$</span>
                                <span>
                                  {order.offerPrice
                                    ? order.offerPrice
                                    : order.price}
                                </span>
                              </span>
                            </div>
                          </td>
                          <td className="text-center py-4 px-2">
                            <div className="flex space-x-1 items-center justify-center">
                              <span className="text-[15px] font-normal">
                                <span>$</span>
                                <span>{CartHandler.getPrice(order)}</span>
                              </span>
                            </div>
                          </td>
                          <td className="text-center py-4 px-2 print:hidden">
                            <button
                              onClick={() => {
                                setReviewModalSlug(order.slug);
                                setSellerSlug(order?.seller_slug);
                              }}
                              type="button"
                              className="text-green-500 text-sm font-semibold capitalize"
                            >
                              review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex sm:justify-end print:justify-end justify-center sm:mr-10">
                  <div>
                    <div className="flex justify-between font-semibold w-[200px] mb-1">
                      <p className="text-sm text-qblack capitalize">SUBTOTAL</p>
                      <p className="text-sm text-qblack">
                        <span>$</span>
                        <span>{orderData?.subTotal}</span>
                      </p>
                    </div>
                    <div className="flex justify-between font-semibold w-[200px]">
                      <p className="text-sm text-qred">(-) Discount coupon</p>
                      <p className="text-sm text-qred">
                        -<span>$</span>
                        <span>{orderData?.discount}</span>
                      </p>
                    </div>
                    <div className="flex justify-between font-semibold w-[200px]">
                      <p className="text-sm text-qblack">(+) Shipping Cost</p>
                      <p className="text-sm text-qblack">
                        +<span>$</span>
                        <span>{orderData?.shippingCost}</span>
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-qgray-border mt-4"></div>
                    <div className="flex justify-between font-semibold w-[200px] mt-4">
                      <p className="text-lg text-qblack">Total Paid</p>
                      <p className="text-lg text-qblack">
                        <span>$</span>
                        <span>{orderData?.total}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewProductModal
        rating={rating}
        ratingChanged={ratingChanged}
        setReportModalSlug={setReviewModalSlug}
        setSellerSlug={setSellerSlug}
        reportModalSlug={reviewModalSlug}
        handleReview={handleReview}
      />
    </div>
  );
};

export default ViewOrderDetails;
