import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { CartHandler } from "../../../../src/utils/CartHandler";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import styles from "./styles.module.css";
import { EcommerceApi } from "../../../../src/API/EcommerceApi";
import { ICartProduct, ICategories } from "../../../../interfaces/models";
import { useRouter } from "next/router";
import { SocialLogin } from "../../../helpers/SocialLogin";
import { toast } from "react-hot-toast";
import {
  AnchorIcon,
  ArrowIcon,
  CartIcon,
  CrossIcon,
  DownArrowIcon,
  EmailIcon,
  HeartIcon,
  PhoneIcon,
  ProfileIcon,
  RedCrossIcon,
  SearchIcon,
} from "../../../../src/utils/SvgReturn";
import { BiArrowBack } from "react-icons/bi";
import { CookiesHandler } from "../../../../src/utils/CookiesHandler";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { FaHome, FaUser } from "react-icons/fa";
import { LogOutIcon } from "../../../../src/utils/SvgReturn";

interface Props {}

const HeaderTop: React.FC<Props> = (props) => {
  const user_slug = CookiesHandler.getSlug();
  const states = useSelector(() => controller.states);
  const user = useSelector(() => controller.states.user);

  const [sideDropdownOpen, setSideDropdownOpen] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [showTopAllCatgory, setShowTopAllCatgory] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState<ICategories | undefined>(
    undefined
  );

  const searchRef = useRef<HTMLInputElement>(null);
  const mobSearchRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { asPath, route } = router;

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (route !== "/products" && searchRef.current && mobSearchRef.current) {
      searchRef.current.value = "";
      mobSearchRef.current.value = "";
      setSearchCategory(undefined);
    }
  }, [route]);

  const sideDropdown = () => {
    setSideDropdownOpen(!sideDropdownOpen);
  };

  const topAllCategoriesDropdown = () => {
    setShowTopAllCatgory(!showTopAllCatgory);
  };

  const signOut = async () => {
    await SocialLogin.logOut();
    controller.setAllCartListData([]);
    controller.setAllWishlistData([]);
    controller.setUser(null);
  };

  const handleProfileDropdown = () => {
    if (states.user) {
      toggleDropdown();
    } else {
      router.push("/login");
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const dataLoading = async () => {
      if (user_slug) {
        const { res, err } = await EcommerceApi.getSiteDataWithUser(user_slug);
        if (res) {
          controller.setCategories(res.categories);
          controller.setBrands(res.brands);
          controller.setSubCategories(res.subCategories);
          controller.setUser(res.user);
          controller.setAllWishlistData(res.wishlist);
          controller.setAllCartListData(res.cart);
        }
      } else {
        const { res, err } = await EcommerceApi.getSiteDataWoUser();

        if (res) {
          controller.setCategories(res.categories);
          controller.setBrands(res.brands);
          controller.setSubCategories(res.subCategories);
          controller.setUser(null);
          controller.setAllWishlistData([]);
          controller.setAllCartListData([]);
        }
      }
    };

    dataLoading();

    controller.setInitialDataLoading();
  }, [user_slug]);

  const handleSearch = () => {

    if (searchRef.current?.value && !searchCategory) {
      router.push({
        pathname: "products",
        query: {
          search: searchRef.current?.value,
          min: 0,
          max: 15000,
        },
      });
    }

    if (searchCategory && !searchRef.current?.value) {
      router.push({
        pathname: "products",
        query: {
          category: "+" + searchCategory.cat_slug,
          min: 0,
          max: 15000,
        },
      });
    }

    if (searchCategory && searchRef.current?.value) {
      router.push({
        pathname: "products",
        query: {
          search: searchRef.current?.value,
          category: "+" + searchCategory.cat_slug,
          min: 0,
          max: 15000,
        },
      });
    }
  };

  const handleSearchMobile = () => {
    if (mobSearchRef.current?.value) {
      router.push({
        pathname: "products",
        query: {
          search: mobSearchRef.current?.value,
          min: 0,
          max: 15000,
        },
      });
    }
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

  if (asPath !== "/" && width && width <= 640) {
    return (
      <header className="print:hidden w-full bg-white h-12 px-4 py-1 flex justify-between items-center">
        <BiArrowBack
          className="w-7 h-7 p-1 bg-qyellow rounded-full"
          onClick={() => router.back()}
        />
        <FaHome
          className="w-7 h-7 fill-qyellow"
          onClick={() => router.push("/")}
        />
      </header>
    );
  }

  return (
    <div className="print:hidden">
      {sideDropdownOpen && (
        <div
          onClick={() => {
            sideDropdown();
          }}
          className="w-full h-screen bg-black bg-opacity-40 z-40 left-0 top-0 fixed"
        ></div>
      )}
      <div
        className={`w-[280px] transition-all duration-300 ease-in-out h-screen overflow-y-auto overflow-x-hidden overflow-style-none bg-white fixed left-0 top-0 z-50 ${
          sideDropdownOpen ? "-left-[0px]" : "-left-[280px]"
        } ${styles["sideDropdownScrollStyle"]}`}
      >
        <div className="w-full px-5 mt-5 mb-4">
          <div className="flex justify-between items-center">
            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/profile#dashboard"
                  className="flex gap-3 items-center p-1"
                >
                  <FaUser className="w-[18px] h-[18px] fill-qblack" />
                  <span className="line-clamp-1 text-sm font-medium capitalize  cursor-pointer">
                    {user?.fullName}
                  </span>
                </Link>
                <div
                  onClick={() => signOut()}
                  className="flex gap-x-3 items-center text-qblack text-sm font-medium capitalize  cursor-pointer bg-qyellow p-1 rounded-md"
                >
                  <span className="ml-[2px]">
                    <LogOutIcon />
                  </span>
                  <span className="capitalize">Logout</span>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex gap-x-3 items-center text-qblack text-sm font-medium capitalize  cursor-pointer bg-qyellow py-1 px-3 rounded-md"
              >
                Log in
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                sideDropdown();
              }}
            >
              <RedCrossIcon />
            </button>
          </div>
        </div>

        <div className="w-full mt-5 px-5 flex items-center space-x-3">
          <span
            className={
              (showCategory ? "text-qblack" : "text-qgray") +
              " text-base font-semibold"
            }
            onClick={() => setShowCategory(true)}
          >
            Categories
          </span>
          <span className="w-[1px] h-[14px] bg-qgray"></span>
          <span
            className={
              (showCategory ? "text-qgray" : "text-qblack") +
              " text-base font-semibold"
            }
            onClick={() => setShowCategory(false)}
          >
            Main Menu
          </span>
        </div>

        {showCategory ? (
          <div className="category-item mt-5 w-full">
            <ul className="categories-list">
              {states.categories.map((category: ICategories) => (
                <li key={category.cat_slug} className="category-item">
                  <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qyellow transition-all duration-300 ease-in-out cursor-pointer">
                    <div className="flex items-center space-x-6">
                      <span>
                        <span>
                          <AnchorIcon />
                        </span>
                      </span>
                      <span
                        className="text-sm font-normal capitalize"
                        onClick={() =>
                          router.push({
                            pathname: "products",
                            query: {
                              category: "+" + category.cat_slug,
                              min: 0,
                              max: 15000,
                            },
                          })
                        }
                      >
                        {category.cat_name}
                      </span>
                    </div>
                    <div
                      onClick={() => setExpandedCategory(category.cat_slug)}
                      className={
                        (expandedCategory === category.cat_slug
                          ? "rotate-90"
                          : "") + " ease-in p-2"
                      }
                    >
                      <ArrowIcon />
                    </div>
                  </div>
                  <ul
                    className={
                      expandedCategory === category.cat_slug ? "" : "hidden"
                    }
                  >
                    {states.subCategories
                      .filter((subCat) => subCat.cat_slug === category.cat_slug)
                      .map((s) => (
                        <li
                          key={s.slug}
                          className="pl-20 h-10 text-sm flex justify-between items-center cursor-pointer"
                        >
                          <span
                            onClick={() =>
                              router.push({
                                pathname: "products",
                                query: {
                                  sub_category: s.slug,
                                  min: 0,
                                  max: 15000,
                                },
                              })
                            }
                          >
                            {s.subcat_name}
                          </span>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="menu-item mt-5 w-full">
            <ul className="categories-list">
              <li className="category-item">
                <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qyellow transition-all duration-300 ease-in-out cursor-pointer">
                  <div className="flex items-center space-x-6">
                    <span className="text-sm font-normal capitalize">
                      Pages
                    </span>
                  </div>
                  <ArrowIcon />
                </div>
                <ul className="submenu-list ml-5">
                  <Link className="category-item" href="/privacy_policy">
                    <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qyellow transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-normal capitalize">
                          Privacy Policy
                        </span>
                      </div>
                      <ArrowIcon />
                    </div>
                  </Link>
                  <Link className="category-item" href="/faq">
                    <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qyellow transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-normal capitalize">
                          FAQ
                        </span>
                      </div>
                      <ArrowIcon />
                    </div>
                  </Link>
                  <Link className="category-item" href="/terms_condition">
                    <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qyellow transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-normal capitalize">
                          Terms and Conditions
                        </span>
                      </div>
                      <ArrowIcon />
                    </div>
                  </Link>
                  <Link
                    className="category-item"
                    href="/seller_terms_condition"
                  >
                    <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-qyellow transition-all duration-300 ease-in-out cursor-pointer">
                      <div className="flex items-center space-x-6">
                        <span className="text-sm font-normal capitalize">
                          Seller terms and conditions
                        </span>
                      </div>
                      <ArrowIcon />
                    </div>
                  </Link>
                </ul>
              </li>
              <Link className="category-item" href="/about">
                <div className="flex justify-between items-center px-5 h-10 bg-white hover:bg-qyellow transition-all duration-300 ease-in-out cursor-pointer">
                  <div className="flex items-center space-x-6">
                    <span className="text-sm font-normal capitalize">
                      About
                    </span>
                  </div>
                  <ArrowIcon />
                </div>
              </Link>
              <Link className="category-item" href="blogs">
                <div className="flex justify-between items-center px-5 h-10 bg-white hover:bg-qyellow transition-all duration-300 ease-in-out cursor-pointer">
                  <div className="flex items-center space-x-6">
                    <span className="text-sm font-normal capitalize">
                      blogs
                    </span>
                  </div>
                  <ArrowIcon />
                </div>
              </Link>
              <Link className="category-item" href="contact">
                <div className="flex justify-between items-center px-5 h-10 bg-white hover:bg-qyellow transition-all duration-300 ease-in-out cursor-pointer">
                  <div className="flex items-center space-x-6">
                    <span className="text-sm font-normal capitalize">
                      Contact
                    </span>
                  </div>
                  <ArrowIcon />
                </div>
              </Link>
            </ul>
          </div>
        )}
      </div>

      <header className="header-section-wrapper relative ">
        <div className="shop-topbar w-full bg-white h-10 border-b border-qgray-border hidden md:block">
          <div className="container-x mx-auto h-full ">
            <div className="flex justify-between items-center h-full px-4 md:px-0">
              <div className="topbar-nav">
                <ul className="flex space-x-6">
                  {states.user && (
                    <>
                      <li>
                        <Link rel="noopener noreferrer" href="/profile">
                          <span className="text-xs leading-6 text-qblack font-semibold cursor-pointer">
                            Account
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link rel="noopener noreferrer" href="/track_order">
                          <span className="text-xs leading-6 text-qblack font-semibold cursor-pointer">
                            Track Order
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link rel="noopener noreferrer" href="/faq">
                      <span className="text-xs leading-6 text-qblack font-semibold cursor-pointer">
                        Support
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="topbar-dropdowns lg:block hidden">
                <div className="flex space-x-6 items-center">
                  <div className="flex space-x-2 items-center">
                    {states.user?.phone && (
                      <>
                        <span>
                          <PhoneIcon />
                        </span>
                        <span className="text-xs text-qblack font-medium leading-none">
                          {states.user.phone}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex space-x-2 items-center">
                    {states.user && (
                      <>
                        <span>
                          <EmailIcon />
                        </span>
                        <span className="text-xs text-qblack font-medium leading-none">
                          {states.user.email}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="block lg:hidden">
                <Link rel="noopener noreferrer" href="/become_seller">
                  <span className="text-xs leading-6 text-qblack px-3 py-1 bg-qyellow font-medium cursor-pointer">
                    Become seller
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[86px] bg-white lg:block hidden">
          <div className="container-x mx-auto h-full ">
            <div className="relative h-full">
              <div className="flex justify-between items-center h-full">
                <div className="relative">
                  <Link rel="noreferrer" href="/">
                    <span className={`${styles["spanStyle"]}`}>
                      <span className={`${styles["spanStyle2"]} font-bold text-xl`}>
                          <span className="text-qyellow">Shop</span> <span>Holic</span>
                        {/* <img
                          className={`${styles["imgStyle2"]}`}
                          src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Flogo-2022-11-22-11-19-02-4634.png&w=256&q=75"
                          alt="logo"
                        /> */}
                      </span>

                      {/* <img
                        className={`${styles["imgStyle"]}`}
                        src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Flogo-2022-11-22-11-19-02-4634.png&w=256&q=75"
                        alt="logo"
                      /> */}
                    </span>
                  </Link>
                </div>
                <div className="w-[517px] h-[44px]">
                  <div className="w-full h-full flex items-center  border border-qgray-border bg-white search-com">
                    <div className="flex-1 bg-red-500 h-full">
                      <div className="h-full">
                        <input
                          name="searchInput"
                          type="text"
                          className={styles["search-input"]}
                          placeholder="Search Product..."
                          ref={searchRef}
                        />
                      </div>
                    </div>
                    <div className="w-[1px] h-[22px] bg-qgrayLite"></div>
                    <div className="flex-1 flex items-center px-4 relative">
                      <button
                        className="w-full text-xs font-medium text-qgray flex justify-between items-center"
                        onClick={() => {
                          topAllCategoriesDropdown();
                        }}
                      >
                        <span className={styles["line-clamp-1"]}>
                          {searchCategory
                            ? searchCategory.cat_name
                            : "All Categories"}
                        </span>
                        <span>
                          <DownArrowIcon />
                        </span>
                      </button>

                      {/* all categories div */}
                      {showTopAllCatgory && (
                        <div>
                          <div
                            className="w-full h-full fixed left-0 top-0 z-50"
                            onClick={() => {
                              topAllCategoriesDropdown();
                            }}
                          ></div>
                          <div
                            className="w-[227px] h-auto absolute bg-white left-0 top-[29px] z-50 p-5"
                            style={{
                              boxShadow:
                                "rgba(0, 0, 0, 0.14) 0px 15px 50px 0px",
                            }}
                          >
                            <ul className="flex flex-col space-y-2">
                              {states.categories.map(
                                (items: ICategories, index) => (
                                  <li
                                    key={items.cat_slug}
                                    onClick={() => {
                                      topAllCategoriesDropdown();
                                      setSearchCategory(items);
                                    }}
                                  >
                                    <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow cursor-pointer">
                                      {items.cat_name}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleSearch()}
                      className="search-btn w-[93px] bg-qyellow h-full text-sm font-semibold"
                    >
                      Search
                    </button>
                  </div>
                </div>

                <div className="flex space-x-6 items-center relative">
                  <div className="favorite relative">
                    <Link rel="noopener noreferrer" href="/wishlist">
                      <span className="cursor-pointer">
                        <HeartIcon />
                      </span>
                    </Link>
                    <span className="w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-qyellow">
                      {states.wishlistData.length}
                    </span>
                  </div>
                  <div className="cart-wrapper group relative py-4">
                    <div className="cart relative cursor-pointer">
                      <Link rel="noopener noreferrer" href="/cart">
                        <span className="cursor-pointer">
                          <CartIcon />
                        </span>
                      </Link>
                      <span className="w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-qyellow">
                        {states.cartlistData.length}
                      </span>
                    </div>
                    <div
                      className={`${styles["cart-wrappwer"]} w-[300px] bg-white border-t-[3px] absolute -right-[45px] top-11 z-50 hidden group-hover:block`}
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.14) 0px 15px 50px 0px",
                      }}
                    >
                      <div className="w-full h-full">
                        <div
                          className={`${styles["productItems"]} h-[310px] overflow-y-scroll`}
                        >
                          {states.cartlistData.length === 0 && (
                            <p className="text-sm text-gray-400 mt-10 text-center">
                              No items found
                            </p>
                          )}
                          <ul>
                            {states.cartlistData.map((item, idx) => (
                              <li
                                key={item.cart_slug}
                                className="w-full h-full flex justify-between"
                              >
                                <div className="flex space-x-[6px] justify-center items-center px-4 my-[20px]">
                                  <div className="w-[65px] h-full relative">
                                    <span>
                                      <img
                                        alt=""
                                        sizes="100vw"
                                        src={item.imageURL[0]}
                                        decoding="async"
                                        data-nimg="fill"
                                        className="w-full h-full object-contain"
                                      />
                                    </span>
                                  </div>
                                  <div className="flex-1 h-full flex flex-col justify-center ">
                                    <Link
                                      href={"single_product?slug=" + item.slug}
                                      className="title mb-2 text-[13px] font-semibold text-qblack leading-4 line-clamp-2 hover:text-blue-600 cursor-pointer"
                                    >
                                      {item.productName}
                                    </Link>
                                    <p className="price">
                                      <span className="offer-price text-qred font-semibold text-[15px] ml-2">
                                        <span className="text-qblack font-semibold">
                                          {item.quantity} &#10005;
                                        </span>{" "}
                                        $
                                        {item.offerPrice
                                          ? item.offerPrice
                                          : item.price}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <span
                                  className="mt-[20px] mr-[15px] inline-flex cursor-pointer"
                                  onClick={() =>
                                    handleDeleteFromCart(
                                      item,
                                      user_slug as string
                                    )
                                  }
                                >
                                  <CrossIcon />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="w-full px-4 mt-[20px] mb-[12px]">
                          <div className="h-[1px] bg-[#F0F1F3]"></div>
                        </div>
                        <div className="product-actions px-4 mb-[30px]">
                          <div className="total-equation flex justify-between items-center mb-[28px]">
                            <span className="text-[15px] font-medium text-qblack">
                              Subtotal
                            </span>
                            <span className="text-[15px] font-medium text-qred ">
                              ${CartHandler.cartSubTotal(states.cartlistData)}
                            </span>
                          </div>
                          <div className=" product-action-btn">
                            <Link href="/cart">
                              <div
                                className={`${styles["gray-btn"]} w-full h-[50px] mb-[10px] cursor-pointer`}
                              >
                                <span>View Cart</span>
                              </div>
                            </Link>
                            <div className="w-full h-[50px] cursor-pointer">
                              <Link href="/checkout">
                                <div className="yellow-btn">
                                  <span className="text-sm">Checkout Now</span>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="w-full px-4 mt-[20px]">
                          <div className="h-[1px] bg-[#F0F1F3]"></div>
                        </div>
                        <div className="flex justify-center py-[15px]">
                          <p className="text-[13px] font-medium text-qgray">
                            Get Return within 30 days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={handleProfileDropdown}
                    className="cart-wrapper group relative py-4"
                  >
                    <div className="cart relative cursor-pointer"></div>
                    <span className="cursor-pointer">
                      <ProfileIcon />
                      <div className="dropdown">
                        <span className="w-[18px] h-[18px] rounded-full absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ">
                          <div
                            className={`${
                              styles["cart-wrappwer"]
                            } w-[200px] bg-white mt-2 border-t-[3px] absolute -right-[45px] top-11 z-50 hidden ${
                              isOpen ? "group-hover:block" : ""
                            }`}
                            style={{
                              boxShadow:
                                "rgba(0, 0, 0, 0.14) 0px 15px 50px 0px",
                            }}
                          >
                            <div className="w-full h-full">
                              <div
                                className={`${styles["productItems"]} h-[250px] overflow-y-scroll p-5`}
                              >
                                {isOpen && (
                                  <div>
                                    <ul className="w-full flex flex-col space-y-5 text-left ">
                                      <li className="text-base text-qgraytwo">
                                        <span>
                                          Hi,{" "}
                                          {states.user?.displayName
                                            ? states.user?.displayName
                                            : states.user?.fullName}
                                        </span>
                                      </li>
                                      <li className="text-base text-qgraytwo cursor-pointer hover:text-qblack hover:font-semibold">
                                        <Link
                                          rel="noopener noreferrer"
                                          href="/profile#dashboard"
                                        >
                                          <span className="capitalize">
                                            profile
                                          </span>
                                        </Link>
                                      </li>
                                      <li className="text-base text-qgraytwo cursor-pointer hover:text-qblack hover:font-semibold">
                                        <Link
                                          rel="noopener noreferrer"
                                          href="/contact"
                                        >
                                          <span className="capitalize">
                                            Support
                                          </span>
                                        </Link>
                                      </li>
                                      <li className="text-base text-qgraytwo cursor-pointer hover:text-qblack hover:font-semibold">
                                        <Link
                                          rel="noopener noreferrer"
                                          href="/faq"
                                        >
                                          <span className="capitalize">
                                            FAQ
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                    <div className="w-full flex justify-center items-center border-t border-qgray-border">
                                      <button
                                        onClick={() => signOut()}
                                        type="button"
                                        className="text-qblack text-base font-semibold pt-2"
                                      >
                                        Sign Out
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </span>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="quomodo-shop-drawer lg:hidden block w-full bg-white">
          <div>
            <div className="w-full h-full flex justify-between items-center px-5">
              <div
                onClick={() => {
                  sideDropdown();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h7"
                  ></path>
                </svg>
              </div>
              <div className="w-[200px] h-full relative flex justify-center items-center">
                <Link
                  rel="noreferrer"
                  href="/"
                  className="h-full flex justify-center items-center"
                >
                  <span className={`${styles["spanStyle"]}`}>
                    <span className={`${styles["spanStyle2"]}`}>
                      <img
                        className={`${styles["imgStyle2"]}`}
                        src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27153%27%20height=%2744%27/%3e"
                        alt="logo"
                      />
                    </span>
                    <img
                      className={`${styles["imgStyle"]}`}
                      src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Flogo-2022-11-22-11-19-02-4634.png&w=256&q=75"
                      alt="logo"
                    />
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-5">
                <Link href="/wishlist" className="favorite relative">
                  <HeartIcon />
                  <span className="w-[18px] h-[18px] rounded-full bg-qyellow absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                    {states.wishlistData.length}
                  </span>
                </Link>
                <Link href="/cart" className="cart relative cursor-pointer">
                  <span>
                    <CartIcon />
                  </span>
                  <span className="w-[18px] h-[18px] rounded-full bg-qyellow absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                    {states.cartlistData.length}
                  </span>
                </Link>
              </div>
            </div>

            <div className="w-full mt-3 px-5 flex justify-center">
              <div className="search-bar w-full h-[34px] flex max-w-[480px] mb-3">
                <div className="flex-1 bg-white h-full border border-r-0 border-[#E9E9E9]">
                  <input
                    className="w-full text-xs h-full focus:outline-none focus:ring-0 placeholder:text-qgraytwo pl-2.5 "
                    placeholder="Search Product..."
                    ref={mobSearchRef}
                  />
                </div>
                <div
                  className="cursor-pointer w-[40px] h-full bg-qyellow flex justify-center items-center"
                  onClick={() => handleSearchMobile()}
                >
                  <span>
                    <SearchIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HeaderDropdown />
      </header>
    </div>
  );
};

export default HeaderTop;
