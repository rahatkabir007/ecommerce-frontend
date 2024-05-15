import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ICategories, IMegaCategory } from "../../../../interfaces/models";
import { EcommerceApi } from "../../../../src/API/EcommerceApi";
import { controller } from "../../../../src/state/StateController";
import styles from "./styles.module.css";

interface Props {}

const HeaderDropdown: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [megaMenuData, setMegaMenuData] = useState<IMegaCategory[]>([]);
  const openCategoryDropDown = () => {
    console.log("hello");
    setOpenDropdown(!openDropdown);
  };

  useEffect(() => {
    const fetchAllMegaMenuCategoriesData = async () => {
      const { res, err } = await EcommerceApi.getMegaMenuCategories();
      if (err) {
        console.log(err);
      } else {
        setMegaMenuData(res);
        console.log(res);
      }
    };
    fetchAllMegaMenuCategoriesData();
  }, []);

  // const fetchAllCategories = async () => {
  //   const { res, err } = await EcommerceApi.getCategories();
  //   if (res) {
  //     controller.setCategories(res);
  //   }
  // };
  // console.log(states.categories);
  // console.log(states.subCategories);
  // useEffect(() => {
  //   const getAllCartData = async () => {
  //     const { res, err } = await EcommerceApi.getAllCartData("user_slug_1");
  //     if (res) {
  //       controller.setAllCartListData(res);
  //     }
  //   };
  //   const getAllWishlistData = async () => {
  //     const { res, err } = await EcommerceApi.getAllWishlistProducts(
  //       "user_slug_1"
  //     );
  //     if (res) {
  //       controller.setAllWishlistData(res);
  //     }
  //   };
  //   getAllWishlistData();
  //   getAllCartData();
  //   fetchAllCategories();
  //   // fetchAllSubCategories();
  //   // fetchAllBrands();
  //   controller.setInitialDataLoading();
  // }, []);

  return (
    <div>
      <div
        className={`${styles["nav-widget-wrapper"]} w-full  h-[60px] relative z-30  quomodo-shop-nav-bar lg:block hidden bg-qyellow`}
      >
        <div className="container-x mx-auto h-full">
          <div className="w-full h-full relative">
            <div className="w-full h-full flex justify-between items-center">
              <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
                <div className="category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative">
                  {openDropdown && (
                    <div
                      onClick={() => {
                        openCategoryDropDown();
                      }}
                      className="fixed top-0 left-0 w-full h-full -z-10"
                    ></div>
                  )}
                  <button
                    onClick={() => {
                      openCategoryDropDown();
                    }}
                    type="button"
                    className="w-full h-full flex justify-between items-center"
                  >
                    <div className="flex space-x-3 items-center">
                      <span>
                        <svg
                          width="14"
                          height="9"
                          viewBox="0 0 14 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="14" height="1" fill="#1D1D1D"></rect>
                          <rect
                            y="8"
                            width="14"
                            height="1"
                            fill="#1D1D1D"
                          ></rect>
                          <rect
                            y="4"
                            width="10"
                            height="1"
                            fill="#1D1D1D"
                          ></rect>
                        </svg>
                      </span>
                      <span className="text-sm font-semibold text-qblacktext">
                        All Categories
                      </span>
                    </div>
                    <div>
                      <svg
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        className="fill-current text-qblacktext"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="9.18359"
                          y="0.90918"
                          width="5.78538"
                          height="1.28564"
                          transform="rotate(135 9.18359 0.90918)"
                        ></rect>
                        <rect
                          x="5.08984"
                          y="5"
                          width="5.78538"
                          height="1.28564"
                          transform="rotate(-135 5.08984 5)"
                        ></rect>
                      </svg>
                    </div>
                  </button>
                  <div
                    className={`${styles["box"]} ${
                      styles["category-dropdown"]
                    } w-full absolute left-0 top-[53px] bg-white  ${
                      openDropdown ? "block" : "hidden"
                    }`}
                  >
                    <ul className={`${styles["categories-list"]} relative`}>
                      {states.categories.map((single: ICategories, index) => (
                        <>
                          <li className={`${styles["category-item"]}`}>
                            <Link
                              rel="noopener noreferrer"
                              href="/products?category=electronics"
                            >
                              <div className=" flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer">
                                <div className="flex items-center space-x-6">
                                  <span>
                                    <svg
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="anchor"
                                      className="svg-inline--fa fa-anchor w-4 h-4"
                                      role="img"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 576 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M352 176C369.7 176 384 190.3 384 208C384 225.7 369.7 240 352 240H320V448H368C421 448 464 405 464 352V345.9L456.1 352.1C447.6 362.3 432.4 362.3 423 352.1C413.7 343.6 413.7 328.4 423 319L479 263C488.4 253.7 503.6 253.7 512.1 263L568.1 319C578.3 328.4 578.3 343.6 568.1 352.1C559.6 362.3 544.4 362.3 535 352.1L528 345.9V352C528 440.4 456.4 512 368 512H208C119.6 512 48 440.4 48 352V345.9L40.97 352.1C31.6 362.3 16.4 362.3 7.029 352.1C-2.343 343.6-2.343 328.4 7.029 319L63.03 263C72.4 253.7 87.6 253.7 96.97 263L152.1 319C162.3 328.4 162.3 343.6 152.1 352.1C143.6 362.3 128.4 362.3 119 352.1L112 345.9V352C112 405 154.1 448 208 448H256V240H224C206.3 240 192 225.7 192 208C192 190.3 206.3 176 224 176H234.9C209 158.8 192 129.4 192 96C192 42.98 234.1 0 288 0C341 0 384 42.98 384 96C384 129.4 366.1 158.8 341.1 176H352zM288 128C305.7 128 320 113.7 320 96C320 78.33 305.7 64 288 64C270.3 64 256 78.33 256 96C256 113.7 270.3 128 288 128z"
                                      ></path>
                                    </svg>
                                  </span>
                                  <span className="text-xs font-normal">
                                    {single.cat_name}
                                  </span>
                                </div>
                                <div>
                                  <span>
                                    <svg
                                      width="6"
                                      height="9"
                                      viewBox="0 0 6 9"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        x="1.49805"
                                        y="0.818359"
                                        width="5.78538"
                                        height="1.28564"
                                        transform="rotate(45 1.49805 0.818359)"
                                        fill="#1D1D1D"
                                      ></rect>
                                      <rect
                                        x="5.58984"
                                        y="4.90918"
                                        width="5.78538"
                                        height="1.28564"
                                        transform="rotate(135 5.58984 4.90918)"
                                        fill="#1D1D1D"
                                      ></rect>
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </Link>
                            <div
                              className={`${styles["height"]} ${styles["sub-category-lvl-two"]} absolute left-[270px] top-0 z-10 w-[270px] bg-white`}
                            >
                              <ul className="">
                                {states.subCategories
                                  .filter(
                                    (subCat) =>
                                      subCat.cat_slug === single.cat_slug
                                  )
                                  .map((s) => (
                                    <>
                                      <li
                                        className={`${styles["category-item"]}`}
                                      >
                                        <Link
                                          rel="noopener noreferrer"
                                          href={`/products?sub_category=${s.subcat_name}`}
                                        >
                                          <div className=" flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer">
                                            <div>
                                              <span className="text-xs font-normal">
                                                {s.subcat_name}
                                              </span>
                                            </div>
                                          </div>
                                        </Link>
                                      </li>
                                    </>
                                  ))}
                              </ul>
                            </div>
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={`${styles["nav"]}`}>
                  <ul className="nav-wrapper flex xl:space-x-10 space-x-5">
                    <li>
                      <span className="flex items-center text-sm font-semibold cursor-pointer ">
                        <span>Shop</span>
                        <span className="ml-1.5 ">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            className="fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="9.18359"
                              y="0.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 9.18359 0.90918)"
                            ></rect>
                            <rect
                              x="5.08984"
                              y="5"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(-135 5.08984 5)"
                            ></rect>
                          </svg>
                        </span>
                      </span>
                      <div
                        className={`${styles["sub-menu"]} w-full absolute left-0 top-[60px]`}
                      >
                        <div
                          className={`${styles["boxHeight"]} mega-menu-wrapper w-full bg-white p-[30px] flex justify-between items-center`}
                        >
                          <div className="categories-wrapper flex-1 h-full flex justify-around -ml-[70px]">
                            {/* <div> */}
                            {megaMenuData.map((data) => (
                              <>
                                <div className="category">
                                  <h1 className="text-[13px] font-bold text-qblack uppercase mb-[13px]">
                                    {data.cat_name}
                                  </h1>
                                  <div className="category-items">
                                    <ul className="flex flex-col space-y-2">
                                      {data.sub_cat_list.map((subcat: any) => (
                                        <>
                                          <li>
                                            <Link
                                              rel="noopener noreferrer"
                                              href={`/products?sub_category=${subcat.label}`}
                                            >
                                              <span className="text-qgray text-sm font-normal border-b border-transparent hover:border-qyellow hover:text-qyellow cursor-pointer">
                                                {subcat.label}
                                              </span>
                                            </Link>
                                          </li>
                                        </>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                          <div
                            className={`${styles["background"]} thumbnil w-[348px] h-[235px] relative flex items-center pl-[40px] group`}
                          >
                            <div className="flex flex-col justify-between">
                              <div>
                                <div className=" mb-[10px]">
                                  <span className="text-qblack uppercase text-xs font-semibold">
                                    SMART WATCH
                                  </span>
                                </div>
                                <div className="mb-[30px]">
                                  <h1 className="w-[160px] text-[24px] leading-[32px] text-qblack font-semibold">
                                    Samsung Smart Watch
                                  </h1>
                                </div>
                              </div>
                              <div className="w-[90px]">
                                <Link
                                  rel="noopener noreferrer"
                                  href="/products?category=electronics"
                                >
                                  <div className="cursor-pointer w-full relative ">
                                    <div className="inline-flex space-x-1.5 items-center relative z-20">
                                      <span className="text-sm text-qblack font-medium leading-[30px]">
                                        Shop Now
                                      </span>
                                      <span className="leading-[30px]">
                                        <svg
                                          width="7"
                                          height="11"
                                          viewBox="0 0 7 11"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <rect
                                            x="2.08984"
                                            y="0.636719"
                                            width="6.94219"
                                            height="1.54271"
                                            transform="rotate(45 2.08984 0.636719)"
                                            fill="#1D1D1D"
                                          ></rect>
                                          <rect
                                            x="7"
                                            y="5.54492"
                                            width="6.94219"
                                            height="1.54271"
                                            transform="rotate(135 7 5.54492)"
                                            fill="#1D1D1D"
                                          ></rect>
                                        </svg>
                                      </span>
                                    </div>
                                    <div className="w-[82px] transition-all duration-300 ease-in-out group-hover:h-4 h-[0px] bg-qyellow absolute left-0 bottom-0 z-10"></div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="/sellers">
                        <span className="flex items-center text-sm font-semibold cursor-pointer ">
                          <span>Sellers</span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="/blogs">
                        <span className="flex items-center text-sm font-semibold cursor-pointer ">
                          <span className="capitalize">blogs</span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="/about">
                        <span className="flex items-center text-sm font-semibold cursor-pointer ">
                          <span>About</span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link rel="noopener noreferrer" href="/contact">
                        <span className="flex items-center text-sm font-semibold cursor-pointer ">
                          <span>Contact</span>
                        </span>
                      </Link>
                    </li>
                    <li className="relative">
                      <span className="flex items-center text-sm font-semibold cursor-pointer ">
                        <span>Pages</span>
                        <span className="ml-1.5 ">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            className="fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="9.18359"
                              y="0.90918"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(135 9.18359 0.90918)"
                            ></rect>
                            <rect
                              x="5.08984"
                              y="5"
                              width="5.78538"
                              height="1.28564"
                              transform="rotate(-135 5.08984 5)"
                            ></rect>
                          </svg>
                        </span>
                      </span>
                      <div
                        className={`${styles["sub-menu"]} w-[220px] absolute left-0 top-[60px]`}
                      >
                        <div
                          className={`${styles["box"]} w-full bg-white flex justify-between items-center `}
                        >
                          <div className="categories-wrapper w-full h-full p-5">
                            <div>
                              <div className="category-items">
                                <ul className="flex flex-col space-y-2">
                                  <li>
                                    <Link
                                      rel="noopener noreferrer"
                                      href="/privacy_policy"
                                    >
                                      <span className="text-qgray text-sm font-normal border-b border-transparent hover:border-qyellow hover:text-qyellow cursor-pointer">
                                        Privacy Policy
                                      </span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      rel="noopener noreferrer"
                                      href="/terms_condition"
                                    >
                                      <span className="text-qgray text-sm font-normal border-b border-transparent hover:border-qyellow hover:text-qyellow cursor-pointer">
                                        Terms and Conditions
                                      </span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      rel="noopener noreferrer"
                                      href="/seller_terms_condition"
                                    >
                                      <span className="text-qgray text-sm font-normal border-b border-transparent hover:border-qgreen hover:text-qgreen cursor-pointer">
                                        Seller terms and conditions
                                      </span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link rel="noopener noreferrer" href="/faq">
                                      <span className="text-qgray text-sm font-normal border-b border-transparent hover:border-qyellow hover:text-qyellow cursor-pointer">
                                        FAQ
                                      </span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="become-seller-btn">
                <Link href="/become_seller">
                  <div className=" w-[161px] h-[40px] flex justify-center items-center cursor-pointer bg-qblack text-white">
                    <div className="flex space-x-2 items-center">
                      <span className="text-sm font-semibold">
                        Become seller
                      </span>
                      <span>
                        <svg
                          width="6"
                          height="10"
                          viewBox="0 0 6 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-current"
                        >
                          <rect
                            x="1.08984"
                            width="6.94106"
                            height="1.54246"
                            transform="rotate(45 1.08984 0)"
                          ></rect>
                          <rect
                            x="6"
                            y="4.9082"
                            width="6.94106"
                            height="1.54246"
                            transform="rotate(135 6 4.9082)"
                          ></rect>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropdown;
