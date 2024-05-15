import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import PageHeader from "../../shared/SharedPageHeader/PageHeader";
import sslcommerze from "../../../public/images/sslcommerze.png";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { CartHandler } from "../../../src/utils/CartHandler";
import SharedAddNewAddress from "../../shared/SharedAddNewAddress/SharedAddNewAddress";
import { IAddress } from "../../../interfaces/models";
import SharedDeleteModal from "../../shared/SharedDeleteModal/SharedDeleteModal";
import { useRouter } from "next/navigation";
import { CookiesHandler } from "../../../src/utils/CookiesHandler";

interface Props {}

const CheckoutPage: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  // -------- mike ---------- //
  const [form, setForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [addressData, setAddressData] = useState<IAddress[]>([]);
  const [deleteModalSlug, setDeleteModalSlug] = useState<any | string>("");
  const [refresh, setRefresh] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const handleSelect = (addressData: IAddress) => {
    setSelectedAddress(addressData);
  };

  const handleDelete = async () => {
    const { res, err } = await EcommerceApi.deleteAddress(deleteModalSlug);
    if (res) {
      setDeleteModalSlug("");
      const remainingAddress = addressData.filter(
        (product) => product.slug !== deleteModalSlug
      );
      setAddressData(remainingAddress);
    }
  };

  useEffect(() => {
    const allAddress = async () => {
      const { res, err } = await EcommerceApi.allAddress(states.user?.email);
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        setAddressData(res);
      }
    };

    if (states.user?.email) {
      allAddress();
    }
  }, [refresh, states.user?.email]);

  // ---------------- ------------------- //
  const router = useRouter();
  const cartListProduct = states.cartlistData;
  const user_slug = CookiesHandler.getSlug();

  const order = {
    product_list: cartListProduct,
    user_name: states.user?.fullName,
    user_slug: user_slug,
    user_email: states.user?.email,
    // user_phone: states.user?.phone,
    user_phone: states.user?.phone,
    payment_method: selectedMethod,
    // transaction_id: "1HJGXX1222",
    address: {
      country: selectedAddress?.country,
      state: selectedAddress?.state,
      city: selectedAddress?.city,
      address: selectedAddress?.address,
    },
    subTotal: CartHandler.cartSubTotal(cartListProduct),
    discount: 100,
    shippingCost: 50,
    total: CartHandler.cartSubTotal(cartListProduct) - 100 + 50,
  };
  const handleCheckout = async () => {
    if (!selectedAddress) {
      return;
    }
    const { res, err } = await EcommerceApi.postOrder(order);
    if (err) {
      console.log(err);
    } else if (res) {
      controller.setClearCartlist();
      const { res: cartdelRes, err } =
        await EcommerceApi.deleteAllCartlistProduct(user_slug);
      if (cartdelRes) {
        router.push(res.data);
      }
    }
  };
  // ------------------------------------ //

  return (
    <div>
      <div className="w-full min-h-screen  pt-0 pb-0">
        <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full mb-5">
            <PageHeader slug="checkout" link="/checkout" title="Check out" />
          </div>
          <div className="checkout-main-content w-full">
            <div className="container-x mx-auto">
              <div className="w-full lg:flex lg:space-x-[30px]">
                <div className="lg:w-4/6 w-full">
                  <h1 className="sm:text-2xl text-xl text-qblack font-medium mt-5 mb-5">
                    Addresses
                  </h1>
                  <div className="addresses-widget w-full">
                    <div className="sm:flex justify-between items-center w-full mb-5">
                      <div className="bg-[#FFFAEF] border border-qyellow rounded ">
                        <button
                          type="button"
                          className="px-4 py-3 text-md font-medium rounded-md  text-qblack bg-qyellow "
                        >
                          Shipping Address
                        </button>
                      </div>
                      <button
                        onClick={() => setForm(true)}
                        type="button"
                        className="w-[100px] h-[40px] mt-2 sm:mt-0 border border-qblack hover:bg-qblack hover:text-white transition-all duration-300 ease-in-out"
                      >
                        <span className="text-sm font-semibold">Add New</span>
                      </button>
                    </div>
                    {!form ? (
                      <div
                        data-aos="zoom-in"
                        className="grid sm:grid-cols-2 grid-cols-1 gap-3 aos-init aos-animate"
                      >
                        {addressData.map((singleAddress: IAddress, index) => (
                          <div
                            onClick={() => handleSelect(singleAddress)}
                            className={
                              singleAddress?.slug === selectedAddress?.slug
                                ? `w-full p-5 border cursor-pointer relative    border-qyellow bg-[#FFFAEF]
                                `
                                : `w-full p-5 border cursor-pointer relative   bg-primarygray
                                border-transparent
                                `
                            }
                          >
                            <div className="flex justify-between items-center">
                              <p className="title text-[22px] font-semibold">
                                {`Address ${index + 1}`}
                              </p>
                              <button
                                onClick={() =>
                                  setDeleteModalSlug(singleAddress.slug)
                                }
                                type="button"
                                className="border border-qgray w-[34px] h-[34px] rounded-full flex justify-center items-center"
                              >
                                <SvgIconRenderer
                                  width="17"
                                  height="19"
                                  viewBox="0 0 17 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  path={SvgPaths.deleteIcon}
                                  pathFill="#EB5757"
                                />
                              </button>
                            </div>
                            <SharedDeleteModal
                              deleteModalSlug={deleteModalSlug}
                              handleDelete={handleDelete}
                              setDeleteModalSlug={setDeleteModalSlug}
                            />
                            <div className="mt-5">
                              <table>
                                <tbody>
                                  <tr className="flex mb-3">
                                    <td className="text-base text-qgraytwo w-[70px] block line-clamp-1 capitalize">
                                      Name:
                                    </td>
                                    <td className="text-base text-qblack line-clamp-1 font-medium">
                                      {singleAddress.name}
                                    </td>
                                  </tr>
                                  <tr className="flex mb-3">
                                    <td className="text-base text-qgraytwo w-[70px] block line-clamp-1 capitalize">
                                      Email:
                                    </td>
                                    <td className="text-base text-qblack line-clamp-1 font-medium">
                                      {singleAddress.email}
                                    </td>
                                  </tr>
                                  <tr className="flex mb-3">
                                    <td className="text-base text-qgraytwo w-[70px] block line-clamp-1 capitalize">
                                      phone:
                                    </td>
                                    <td className="text-base text-qblack line-clamp-1 font-medium">
                                      {singleAddress.phone}
                                    </td>
                                  </tr>
                                  <tr className="flex mb-3">
                                    <td className="text-base text-qgraytwo w-[70px] block line-clamp-1 capitalize">
                                      Country:
                                    </td>
                                    <td className="text-base text-qblack line-clamp-1 font-medium">
                                      {singleAddress.country}
                                    </td>
                                  </tr>
                                  <tr className="flex mb-3">
                                    <td className="text-base text-qgraytwo w-[70px] block line-clamp-1 capitalize">
                                      State:
                                    </td>
                                    <td className="text-base text-qblack line-clamp-1 font-medium">
                                      {singleAddress?.state}
                                    </td>
                                  </tr>
                                  <tr className="flex mb-3">
                                    <td className="text-base text-qgraytwo w-[70px] block line-clamp-1 capitalize">
                                      City:
                                    </td>
                                    <td className="text-base text-qblack line-clamp-1 font-medium">
                                      {singleAddress?.city}
                                    </td>
                                  </tr>
                                  <tr className="flex mb-3">
                                    <td className="text-base text-qgraytwo w-[70px] block  capitalize">
                                      Address:
                                    </td>
                                    <td className="text-base text-qblack line-clamp-2 font-medium">
                                      {singleAddress.address}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            {singleAddress?.slug === selectedAddress?.slug && (
                              <span className="text-qblack bg-qyellow px-2 text-sm absolute right-2 -top-2 font-medium">
                                Selected
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <SharedAddNewAddress
                        setRefresh={setRefresh}
                        refresh={refresh}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        setForm={setForm}
                        form={form}
                        singleAddressData={undefined}
                      />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-10">
                    <h1 className="sm:text-2xl text-xl text-qblack font-medium mt-5 mb-5">
                      Apply Coupon
                    </h1>
                    <div className="discount-code w-full mb-5 sm:mb-0 h-[50px] flex ">
                      <div className="flex-1 h-full">
                        <div className="input-com w-full h-full">
                          <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                            <input
                              placeholder="Discount Code"
                              className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none "
                              type="text"
                              value=""
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="w-[90px] h-[50px] black-btn"
                      >
                        <span className="text-sm font-semibold">Apply</span>
                      </button>
                    </div>
                  </div>
                  <h1 className="sm:text-2xl text-xl text-qblack font-medium mt-5 mb-5">
                    Order Summary
                  </h1>
                  <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                    <div className="sub-total mb-6">
                      <div className=" flex justify-between mb-5">
                        <p className="text-[13px] font-medium text-qblack uppercase">
                          Product
                        </p>
                        <p className="text-[13px]  text-qblack uppercase font-bold">
                          Total
                        </p>
                      </div>
                      <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                    </div>
                    <div className="product-list w-full mb-[30px]">
                      <ul className="flex flex-col space-y-5">
                        {states.cartlistData.map((pro) => (
                          <>
                            <li>
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4
                                    title="Apple watch pro"
                                    className="text-[15px] text-qblack line-clamp-1 mb-2.5"
                                  >
                                    {pro.productName}
                                    <sup className="text-[13px] text-qgray ml-2 mt-2">
                                      x{pro.quantity}
                                    </sup>
                                  </h4>
                                  <p className="text-[13px] text-qgray line-clamp-1"></p>
                                </div>
                                <div>
                                  <span className="text-[15px] text-qblack font-medium">
                                    ${CartHandler.getPrice(pro)}
                                  </span>
                                </div>
                              </div>
                            </li>
                          </>
                        ))}
                      </ul>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                    <div className="mt-[20px]">
                      <div className=" flex justify-between mb-5">
                        <p className="text-[13px] text-qblack uppercase font-bold">
                          SUBTOTAL
                        </p>
                        <p className="text-[15px] font-bold text-qblack uppercase">
                          ${CartHandler.cartSubTotal(states.cartlistData)}
                        </p>
                      </div>
                      <div className=" flex justify-between mb-5">
                        <p className="text-[13px] text-qblack uppercase font-bold">
                          Discount coupon (-)
                        </p>
                        <p className="text-[15px] font-bold text-qblack uppercase">
                          $0.00
                        </p>
                      </div>
                    </div>
                    <div className="shipping mb-6 mt-6">
                      <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                        Shipping (+)
                      </span>
                      <div className="flex flex-col space-y-2.5">
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <div className="mt-[30px]">
                      <div className=" flex justify-between mb-5">
                        <p className="text-2xl font-medium text-qblack capitalize">
                          Total
                        </p>
                        <p className="text-2xl font-medium text-qred">
                          ${CartHandler.cartSubTotal(states.cartlistData)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-[30px] mb-5 relative">
                      <div className="w-full">
                        <div className="flex flex-col space-y-3">
                          {/* cash on delivery method */}
                          <div
                            onClick={() => setSelectedMethod("cod")}
                            className={`payment-item relative bg-[#F8F8F8] text-center w-full h-[50px] text-sm text-qgreen flex justify-center items-center px-3 uppercase cursor-pointer
                            ${
                              selectedMethod === "cod"
                                ? "border-2 border-qyellow"
                                : "border border-gray-200"
                            }`}
                          >
                            <div className="w-full">
                              <span className="text-qblack font-bold text-base">
                                Cash On Delivery
                              </span>
                            </div>

                            {/* selected indicator */}
                            {selectedMethod === "cod" && (
                              <span
                                data-aos="zoom-in"
                                className="absolute text-white z-10 w-6 h-6 rounded-full bg-qyellow -right-2.5 -top-2.5 aos-init aos-animate"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                              </span>
                            )}
                          </div>
                          {/* sslcommerze method */}
                          <div
                            onClick={() => setSelectedMethod("ssl")}
                            className={`payment-item text-center bg-[#F8F8F8] relative w-full h-[50px] font-bold text-sm text-white text-qyellow  flex justify-center items-center px-3 uppercase cursor-pointer   ${
                              selectedMethod === "ssl"
                                ? "border-2 border-qyellow"
                                : "border border-gray-200"
                            }`}
                          >
                            <div className="w-full flex justify-center ">
                              <span className=" w-[120px] ">
                                <img src={sslcommerze.src} alt="sslcommerze" />
                              </span>
                            </div>

                            {/* selected indicator */}
                            {selectedMethod === "ssl" && (
                              <span
                                data-aos="zoom-in"
                                className="absolute text-white z-10 w-6 h-6 rounded-full bg-qyellow -right-2.5 -top-2.5 aos-init aos-animate"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleCheckout}
                      type="button"
                      className="w-full"
                    >
                      <div className="w-full h-[50px] bg-black text-white  flex justify-center items-center">
                        <span className="text-sm font-semibold">
                          Place Order Now
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
