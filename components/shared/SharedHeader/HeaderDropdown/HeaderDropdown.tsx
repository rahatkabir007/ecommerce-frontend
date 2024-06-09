import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ICategories, IMegaCategory } from "../../../../interfaces/models";
import { EcommerceApi } from "../../../../src/API/EcommerceApi";
import { controller } from "../../../../src/state/StateController";
import styles from "./styles.module.css";
import { AllCategoriesIcon, AnchorIcon, ArrowIcon, DownArrowIcon } from "../../../../src/utils/SvgReturn";
import { useRouter } from "next/router";

interface Props {}

const HeaderDropdown: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [megaMenuData, setMegaMenuData] = useState<IMegaCategory[]>([]);
const router = useRouter()
  const openCategoryDropDown = () => {
    setOpenDropdown(!openDropdown);
  };

  useEffect(() => {
    const fetchAllMegaMenuCategoriesData = async () => {
      const { res, err } = await EcommerceApi.getMegaMenuCategories();
      if (err) {
        console.log(err);
      } else {
        setMegaMenuData(res);
      }
    };
    fetchAllMegaMenuCategoriesData();
  }, []);

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
                        <AllCategoriesIcon />
                      </span>
                      <span onClick={() => {
                        if (!router.asPath.includes("/products?category=&min=0&max=15000")) {
                          router.push("/products?category=&min=0&max=15000")
                        }
                      }} className="text-sm font-semibold text-qblacktext">
                        All Categories
                      </span>
                    </div>
                    <div>
                      <DownArrowIcon />
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
                        <li
                          key={single.cat_slug}
                          className={`${styles["category-item"]}`}
                        >
                          <Link
                            rel="noopener noreferrer"
                            href={`/products?category=%2B${single.cat_slug}`}
                          >
                            <div className=" flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer">
                              <div className="flex items-center space-x-6">
                                <img className="w-[15px] h-[15px]" src={single?.cat_image} alt={single?.cat_name} />
                                <span className="text-xs font-normal">
                                  {single?.cat_name}
                                </span>
                              </div>
                              <div>
                                <span>
                                  <DownArrowIcon />
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
                                  <li
                                    key={s.slug}
                                    className={`${styles["category-item"]}`}
                                  >
                                    <Link
                                      rel="noopener noreferrer"
                                      href={`/products?sub_category=${s.slug}`}
                                    >
                                      <div className=" flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer">
                                        <div>
                                          <span className="text-xs font-normal">
                                            {s?.subcat_name}
                                          </span>
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </li>
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
                          <DownArrowIcon />
                        </span>
                      </span>
                      <div
                        className={`${styles["sub-menu"]} w-full absolute left-0 top-[60px]`}
                      >
                        <div
                          className={`${styles["boxHeight"]} mega-menu-wrapper w-full bg-white p-[30px] flex justify-between items-center`}
                        >
                          <div className="categories-wrapper flex-1 h-full flex justify-around -ml-[70px]">
                            {megaMenuData.map((data, idx) => (
                              <div
                                key={data.categoriesData.cat_slug}
                                className="category"
                              >
                                <h1 className="text-[13px] font-bold text-qblack uppercase mb-[13px]">
                                  {data?.categoriesData?.cat_name}
                                </h1>
                                <div className="category-items">
                                  <ul className="flex flex-col space-y-2">
                                    {data.sub_cat_list.map((subcat) => (
                                      <li key={subcat.slug}>
                                        <Link
                                          rel="noopener noreferrer"
                                          href={`/products?sub_category=${subcat.slug}`}
                                        >
                                          <span className="text-qgray text-sm font-normal border-b border-transparent hover:border-qyellow hover:text-qyellow cursor-pointer">
                                            {subcat.subcat_name}
                                          </span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
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
                                  href={`/products?category=%2Belectronics_slug_333`}
                                >
                                  <div className="cursor-pointer w-full relative ">
                                    <div className="inline-flex space-x-1.5 items-center relative z-20">
                                      <span className="text-sm text-qblack font-medium leading-[30px]">
                                        Shop Now
                                      </span>
                                      <span className="leading-[30px]">
                                        <ArrowIcon />
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
                          <DownArrowIcon />
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
                        <ArrowIcon fillColor={"white"} />
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
