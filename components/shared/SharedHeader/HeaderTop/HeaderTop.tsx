import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { CartHandler } from "../../../../src/utils/CartHandler";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import styles from "./styles.module.css";
import { EcommerceApi } from "../../../../src/API/EcommerceApi";
import { ICategories } from "../../../../interfaces/models";
import { useRouter } from "next/router";
import { CookiesHandler } from "../../../../src/utils/CookiesHandler";
import { SocialLogin } from "../../../helpers/SocialLogin";

interface Props {}

const user_slug = CookiesHandler.getSlug();
console.log(user_slug);

const HeaderTop: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [sideDropdownOpen, setSideDropdownOpen] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [showTopAllCatgory, setShowTopAllCatgory] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [searchCategory, setSearchCategory] = useState<ICategories | undefined>(
    undefined
  );

  const [searchString, setSearchString] = useState("");

  const router = useRouter();
  const { asPath } = router;

  const sideDropdown = () => {
    // console.log("open");
    setSideDropdownOpen(!sideDropdownOpen);
  };

  const routeSideDropdown = () => {
    // console.log("open2");
    setShowCategory(!showCategory);
  };

  const topAllCategoriesDropdown = () => {
    // console.log("open2");
    setShowTopAllCatgory(!showTopAllCatgory);
  };

  const signOut = async () => {
    await SocialLogin.logOut();
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

  const fetchAllCategories = async () => {
    const { res, err } = await EcommerceApi.getCategories();
    if (res) {
      controller.setCategories(res);
      // console.log(res);
    }
  };

  const fetchAllSubCategories = async () => {
    const { res, err } = await EcommerceApi.getSubCategories();
    if (res) {
      controller.setSubCategories(res);
    }
  };

  const fetchAllBrands = async () => {
    const { res, err } = await EcommerceApi.getBrands();

    if (err) {
    } else {
      controller.setBrands(res);
    }
  };

  const getSingleUser = async () => {
    const { res, err } = await EcommerceApi.getSingleUser(user_slug);

    if (err) {
    } else if (res) {
      console.log(res);
      controller.setUser(res);
    }
  };

  useEffect(() => {
    const getAllCartData = async () => {
      const { res, err } = await EcommerceApi.getAllCartData(user_slug);
      if (res) {
        controller.setAllCartListData(res);
      }
    };

    const getAllWishlistData = async () => {
      const { res, err } = await EcommerceApi.getAllWishlistProducts(user_slug);
      if (res) {
        controller.setAllWishlistData(res);
      }
    };

    getSingleUser();
    getAllWishlistData();
    getAllCartData();
    fetchAllCategories();
    fetchAllSubCategories();
    fetchAllBrands();
    controller.setInitialDataLoading();
  }, []);

  const handleChangeSearch = (e: any) => {
    const input = e.target.value;
    setSearchString(input);
  };

  const handleSearch = () => {
    if (searchString) {
      controller.setSearchString(searchString);
    }

    if (searchCategory) {
      const selectedCategory = states.categories.find(
        (cat) => cat.cat_name === searchCategory.cat_name
      );

      if (selectedCategory) {
        controller.setSearchCategory(selectedCategory.cat_slug, true);
      }
    }

    if (searchCategory || searchString) {
      router.push(
        `/products?${searchString ? `search=${searchString}` : ""}${
          searchCategory
            ? `${searchString ? "&" : ""}category=${searchCategory.cat_name}`
            : ""
        }`
      );
    }
  };

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
      {/* {sideDropdownOpen && ( */}
      <div
        className={`w-[280px] transition-all duration-300 ease-in-out h-screen overflow-y-auto overflow-x-hidden overflow-style-none bg-white fixed left-0 top-0 z-50 ${
          sideDropdownOpen ? "-left-[0px]" : "-left-[280px]"
        } ${styles["sideDropdownScrollStyle"]}`}
      >
        <div className="w-full px-5 mt-5 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-5 items-center">
              <div className="favorite relative">
                <span>
                  <svg
                    width="21"
                    height="18"
                    viewBox="0 0 21 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.97214 0.0251923C3.71435 0.183434 2.6616 0.701674 1.7705 1.60365C0.970091 2.41068 0.489057 3.26519 0.213053 4.37683C-0.275867 6.30342 0.0789948 8.20232 1.25398 9.98649C2.00708 11.1298 2.98097 12.1781 4.76711 13.7764C5.90266 14.7931 9.36848 17.7601 9.53802 17.859C9.69574 17.954 9.75488 17.9658 10.09 17.9658C10.4252 17.9658 10.4843 17.954 10.642 17.859C10.8116 17.7601 14.2853 14.7891 15.413 13.7764C17.207 12.1702 18.173 11.1258 18.9261 9.98649C20.1011 8.20232 20.4559 6.30342 19.967 4.37683C19.691 3.26519 19.21 2.41068 18.4096 1.60365C17.6131 0.800575 16.7614 0.337719 15.6456 0.100357C15.0857 -0.0183239 14.0526 -0.0301933 13.5637 0.0805759C12.1995 0.377279 11.1546 1.06167 10.2004 2.28013L10.09 2.41859L9.98357 2.28013C9.04122 1.08541 8.01212 0.401016 6.69913 0.100357C6.30878 0.00936699 5.4098 -0.0301933 4.97214 0.0251923ZM6.28907 1.23178C7.40885 1.42958 8.37487 2.07837 9.13979 3.15046C9.26991 3.3364 9.43156 3.55793 9.49465 3.64892C9.78643 4.06035 10.3936 4.06035 10.6854 3.64892C10.7485 3.55793 10.9102 3.3364 11.0403 3.15046C12.0851 1.68673 13.5401 0.998377 15.1251 1.21596C16.8837 1.45728 18.2558 2.69156 18.7802 4.50738C19.1942 5.94342 19.0128 7.45067 18.2597 8.80759C17.6289 9.94298 16.5761 11.1337 14.7427 12.7834C13.8555 13.5786 10.1255 16.7988 10.09 16.7988C10.0506 16.7988 6.33638 13.5904 5.4374 12.7834C2.61823 10.2476 1.50633 8.66518 1.23821 6.8098C1.06472 5.61112 1.31312 4.32145 1.91639 3.30475C2.82326 1.77376 4.58968 0.935081 6.28907 1.23178Z"
                      fill="black"
                    ></path>
                  </svg>
                </span>
                <span className="w-[18px] h-[18px] rounded-full bg-qyellow absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                  1
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                sideDropdown();
              }}
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0363 33.9994C7.66923 34.031 0.0436412 26.4423 0.000545718 17.0452C-0.0425497 7.68436 7.54917 0.0479251 16.9447 0.00021656C26.3072 -0.0467224 33.9505 7.54277 33.9998 16.9352C34.0483 26.3153 26.4411 33.9679 17.0363 33.9994Z"
                  fill="black"
                ></path>
                <path
                  d="M17.0363 33.9994C26.4411 33.9679 34.0483 26.3153 33.9998 16.9352C33.9505 7.54277 26.3072 -0.0467224 16.9447 0.00021656C7.54917 0.0479251 -0.0425497 7.68436 0.000545718 17.0452C0.0436412 26.4423 7.66846 34.031 17.0363 33.9994ZM23.4629 21.5945C23.4514 21.8445 23.3321 22.0908 23.1305 22.3039C22.7865 22.6671 22.4479 23.0342 22.1039 23.3966C21.5236 24.0084 21.1458 24.0068 20.5648 23.3889C19.4581 22.2124 18.3492 21.0389 17.2533 19.8523C17.0633 19.6461 16.9686 19.6169 16.7608 19.8431C15.6511 21.0512 14.5222 22.2424 13.3978 23.4366C12.8753 23.9914 12.4697 23.9891 11.9388 23.4312C11.6032 23.0788 11.2715 22.7218 10.9399 22.3647C10.4089 21.7938 10.4081 21.3575 10.9376 20.7927C12.0503 19.6046 13.1593 18.4126 14.2836 17.2361C14.4822 17.0283 14.5037 16.9152 14.2921 16.6943C13.1654 15.5193 12.058 14.3266 10.9452 13.1385C10.4004 12.556 10.4042 12.1259 10.9545 11.5387C11.2785 11.1925 11.6009 10.8447 11.9272 10.5007C12.4821 9.91666 12.8822 9.92358 13.4417 10.5192C14.5468 11.6965 15.6588 12.8677 16.7516 14.0573C16.9671 14.2912 17.071 14.2651 17.271 14.0473C18.3831 12.8415 19.5082 11.6472 20.6363 10.4561C21.1273 9.93743 21.5521 9.94359 22.0469 10.4576C22.3848 10.8085 22.7157 11.1655 23.0474 11.5226C23.6115 12.1289 23.6122 12.5552 23.052 13.1539C21.9477 14.3328 20.8503 15.517 19.7321 16.6828C19.5058 16.9183 19.5382 17.0391 19.7475 17.2584C20.8641 18.4249 21.9623 19.6092 23.0681 20.7865C23.2721 21.002 23.456 21.229 23.4629 21.5945Z"
                  fill="#FE4949"
                ></path>
                <path
                  d="M23.4614 21.5947C23.4545 21.2292 23.2706 21.0022 23.0659 20.7844C21.9608 19.6071 20.8619 18.4228 19.7452 17.2563C19.5359 17.0377 19.5036 16.9169 19.7298 16.6807C20.848 15.5157 21.9454 14.3307 23.0497 13.1518C23.61 12.5539 23.6084 12.1276 23.0451 11.5205C22.7134 11.1635 22.3825 10.8064 22.0447 10.4555C21.5498 9.9415 21.125 9.93611 20.6341 10.454C19.5059 11.6452 18.3808 12.8394 17.2688 14.0452C17.0679 14.263 16.964 14.2891 16.7493 14.0552C15.6565 12.8663 14.5445 11.6952 13.4394 10.5171C12.88 9.92149 12.4798 9.91456 11.9249 10.4986C11.5979 10.8426 11.2762 11.1904 10.9522 11.5367C10.402 12.1238 10.3981 12.5547 10.943 13.1364C12.0558 14.3245 13.1632 15.5172 14.2898 16.6922C14.5014 16.9131 14.4799 17.0254 14.2813 17.234C13.157 18.4113 12.0481 19.6025 10.9353 20.7906C10.4058 21.3561 10.4074 21.7917 10.9376 22.3626C11.2693 22.7197 11.601 23.076 11.9365 23.4291C12.4675 23.987 12.873 23.9893 13.3956 23.4345C14.5207 22.2403 15.6488 21.0491 16.7586 19.841C16.9671 19.614 17.061 19.644 17.2511 19.8502C18.3469 21.0368 19.4559 22.2103 20.5625 23.3868C21.1435 24.0047 21.5214 24.0063 22.1016 23.3945C22.4456 23.0321 22.7842 22.6643 23.1282 22.3018C23.3306 22.091 23.4507 21.8448 23.4614 21.5947Z"
                  fill="white"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full mt-5 px-5">
          <div className="search-bar w-full h-[34px] flex ">
            <div className="flex-1 bg-white h-full border border-r-0 border-[#E9E9E9]">
              <input
                type="text"
                className="w-full text-xs h-full focus:outline-none foucus:ring-0 placeholder:text-qgraytwo pl-2.5 "
                placeholder="Search Product..."
                value=""
              />
            </div>
            <div className="cursor-pointer w-[40px] h-full bg-qyellow flex justify-center items-center">
              <span>
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 8.83158C0.0484783 8.43809 0.0969566 8.04461 0.169674 7.67571C0.484783 5.92962 1.2362 4.42946 2.39968 3.12604C3.75707 1.60128 5.45381 0.592971 7.44142 0.199486C9.76838 -0.267779 11.9741 0.0765214 14.0345 1.33076C16.3614 2.75714 17.84 4.82294 18.3975 7.50356C18.8823 9.7907 18.5187 11.9795 17.4037 14.0453C17.1856 14.4388 17.1856 14.4388 17.5007 14.7585C19.1247 16.4062 20.7487 18.0539 22.3727 19.7016C22.906 20.2427 23.1242 20.8575 22.9302 21.5953C22.5667 22.9971 20.8457 23.5135 19.7549 22.3822C18.8338 21.4231 17.9127 20.5132 16.9674 19.5541C16.216 18.7917 15.4888 18.0539 14.7374 17.2915C14.6889 17.2423 14.6404 17.1932 14.6162 17.1686C14.0345 17.4637 13.5012 17.808 12.9195 18.0539C10.4228 19.1114 7.90196 19.0868 5.42957 17.9555C3.56316 17.0948 2.15728 15.7422 1.16348 13.9469C0.533261 12.791 0.145435 11.5614 0.0484783 10.2334C0.0484783 10.1596 0.0242392 10.0858 0 10.012C0 9.64314 0 9.22507 0 8.83158ZM3.00566 9.4464C3.00566 12.9632 5.84164 15.816 9.30784 15.816C12.774 15.7914 15.5615 12.9632 15.5858 9.4464C15.5858 5.95422 12.7498 3.07685 9.30784 3.07685C5.8174 3.07685 3.00566 5.92962 3.00566 9.4464Z"
                    fill="#1D1D1D"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full mt-5 px-5 flex items-center space-x-3">
          <span
            className="text-base font-semibold  text-qblack"
            onClick={() => {
              routeSideDropdown();
            }}
          >
            Categories
          </span>
          <span className="w-[1px] h-[14px] bg-qgray"></span>
          <span
            className="text-base font-semibold text-qgray "
            onClick={() => {
              routeSideDropdown();
            }}
          >
            Main Menu
          </span>
        </div>

        {showCategory && (
          //Catagory
          <div className="category-item mt-5 w-full">
            <ul className="categories-list">
              {states.categories.map((category: ICategories) => (
                <li key={category.cat_slug} className="category-item">
                  <div className=" flex justify-between items-center px-5 h-12 bg-white hover:bg-qyellow transition-all duration-300 ease-in-out cursor-pointer">
                    <div className="flex items-center space-x-6">
                      <span>
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
                      </span>
                      <span className="text-sm font-normal capitalize">
                        {category.cat_name}
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
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <header className="header-section-wrapper relative ">
        <div className="shop-topbar w-full bg-white h-10 border-b border-qgray-border">
          <div className="container-x mx-auto h-full ">
            <div className="flex justify-between items-center h-full px-4">
              <div className="topbar-nav">
                <ul className="flex space-x-6">
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M10 20h4v-1h-4Zm-3 3q-.825 0-1.412-.587Q5 21.825 5 21V3q0-.825.588-1.413Q6.175 1 7 1h10q.825 0 1.413.587Q19 2.175 19 3v18q0 .825-.587 1.413Q17.825 23 17 23Zm0-5v3h10v-3Zm0-2h10V6H7ZM7 4h10V3H7Zm0 14v3ZM7 4V3v1Z"
                            />
                          </svg>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V8l6.94 4.34c.65.41 1.47.41 2.12 0L20 8v9c0 .55-.45 1-1 1zm-7-7L4 6h16l-8 5z"
                            />
                          </svg>
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
                <Link rel="noopener noreferrer" href="/become-seller">
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
                      <span className={`${styles["spanStyle2"]}`}>
                        <img
                          className={`${styles["imgStyle2"]}`}
                          src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Flogo-2023-01-26-01-30-26-1795.png&w=256&q=75"
                          alt="logo"
                        />
                      </span>

                      <img
                        className={`${styles["imgStyle"]}`}
                        src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Flogo-2023-01-26-01-30-26-1795.png&w=256&q=75"
                        alt="logo"
                      />
                    </span>
                  </Link>
                </div>
                <div className="w-[517px] h-[44px]">
                  <div className="w-full h-full flex items-center  border border-qgray-border bg-white  search-com">
                    <div className="flex-1 bg-red-500 h-full">
                      <div className="h-full">
                        <input
                          onChange={handleChangeSearch}
                          name="searchInput"
                          type="text"
                          className={styles["search-input"]}
                          placeholder="Search Products ..."
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"
                            />
                          </svg>
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
                                  <>
                                    <li
                                      onClick={() => {
                                        topAllCategoriesDropdown();
                                        setSearchCategory(items);
                                      }}
                                    >
                                      <span className="text-qgray text-sm font-400 border-b border-transparent hover:border-qyellow hover:text-qyellow cursor-pointer">
                                        {items.cat_name}
                                      </span>
                                    </li>
                                  </>
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
                        <svg
                          width="21"
                          height="18"
                          viewBox="0 0 21 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.97214 0.0251923C3.71435 0.183434 2.6616 0.701674 1.7705 1.60365C0.970091 2.41068 0.489057 3.26519 0.213053 4.37683C-0.275867 6.30342 0.0789948 8.20232 1.25398 9.98649C2.00708 11.1298 2.98097 12.1781 4.76711 13.7764C5.90266 14.7931 9.36848 17.7601 9.53802 17.859C9.69574 17.954 9.75488 17.9658 10.09 17.9658C10.4252 17.9658 10.4843 17.954 10.642 17.859C10.8116 17.7601 14.2853 14.7891 15.413 13.7764C17.207 12.1702 18.173 11.1258 18.9261 9.98649C20.1011 8.20232 20.4559 6.30342 19.967 4.37683C19.691 3.26519 19.21 2.41068 18.4096 1.60365C17.6131 0.800575 16.7614 0.337719 15.6456 0.100357C15.0857 -0.0183239 14.0526 -0.0301933 13.5637 0.0805759C12.1995 0.377279 11.1546 1.06167 10.2004 2.28013L10.09 2.41859L9.98357 2.28013C9.04122 1.08541 8.01212 0.401016 6.69913 0.100357C6.30878 0.00936699 5.4098 -0.0301933 4.97214 0.0251923ZM6.28907 1.23178C7.40885 1.42958 8.37487 2.07837 9.13979 3.15046C9.26991 3.3364 9.43156 3.55793 9.49465 3.64892C9.78643 4.06035 10.3936 4.06035 10.6854 3.64892C10.7485 3.55793 10.9102 3.3364 11.0403 3.15046C12.0851 1.68673 13.5401 0.998377 15.1251 1.21596C16.8837 1.45728 18.2558 2.69156 18.7802 4.50738C19.1942 5.94342 19.0128 7.45067 18.2597 8.80759C17.6289 9.94298 16.5761 11.1337 14.7427 12.7834C13.8555 13.5786 10.1255 16.7988 10.09 16.7988C10.0506 16.7988 6.33638 13.5904 5.4374 12.7834C2.61823 10.2476 1.50633 8.66518 1.23821 6.8098C1.06472 5.61112 1.31312 4.32145 1.91639 3.30475C2.82326 1.77376 4.58968 0.935081 6.28907 1.23178Z"
                            fill="black"
                          ></path>
                        </svg>
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
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.1568 5.1772C16.0284 4.84626 15.7343 4.81766 14.2887 4.81766H13.0875V4.2947C13.0875 3.48165 12.9716 2.91374 12.6899 2.32949C12.1804 1.2713 11.3272 0.531797 10.2213 0.188601C9.68279 0.0251747 8.87923 -0.0442816 8.39047 0.0292604C7.03602 0.241715 5.88039 1.09562 5.29223 2.31315C5.00642 2.90966 4.89045 3.48165 4.89045 4.2947V4.82175H3.68511C2.23954 4.82175 1.94546 4.85035 1.81705 5.19354C1.75078 5.41008 1.12948 10.0637 0.864385 12.0697C0.632431 13.8184 0.417045 15.469 0.259648 16.711C-0.0137267 18.8519 -0.00544266 18.8846 0.00284141 18.9214V18.9255C0.0401198 19.0644 0.408761 19.428 0.520596 19.5342L1.00521 20H16.9438L17.3041 19.6854C17.4657 19.5424 18 19.0562 18 18.8152C18 18.6517 16.1899 5.27117 16.1568 5.1772ZM16.6911 18.5046C16.687 18.5332 16.6538 18.619 16.5958 18.6803L16.513 18.7702H1.46498L1.2496 18.5414L2.09871 12.2863C2.39694 10.0596 2.66203 8.11888 2.81943 6.95855C2.88984 6.45193 2.92298 6.19453 2.93955 6.06788C3.49872 6.06379 5.94252 6.0597 8.98278 6.0597H15.0302L15.0384 6.10465C15.1047 6.4315 16.6621 18.141 16.6911 18.5046ZM6.1372 4.82175V4.35598C6.1372 4.04139 6.17862 3.6083 6.22418 3.40811C6.46856 2.38669 7.30111 1.5573 8.34076 1.29173C8.77568 1.1855 9.48811 1.22228 9.92303 1.37753H9.92717C10.3828 1.5287 10.7556 1.77384 11.0994 2.14972C11.6544 2.74623 11.8408 3.28145 11.8408 4.27018V4.82175H6.1372Z"
                              fill="black"
                            ></path>
                          </svg>
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
                              <li className="w-full h-full flex justify-between">
                                <div className="flex space-x-[6px] justify-center items-center px-4 my-[20px]">
                                  <div className="w-[65px] h-full relative">
                                    <span
                                      style={{
                                        boxSizing: "border-box",
                                        display: "block",
                                        overflow: "hidden",
                                        width: "initial",
                                        height: "initial",
                                        background: "none",
                                        opacity: "1",
                                        border: "0px",
                                        margin: "0px",
                                        padding: "0px",
                                        position: "absolute",
                                        inset: "0px",
                                      }}
                                    >
                                      <img
                                        alt=""
                                        sizes="100vw"
                                        src={item.imageURL[0]}
                                        // src="/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fcustom-images%2Fapple-watch-pro-2022-09-26-12-04-40-6657.png&amp;w=3840&amp;q=75"
                                        decoding="async"
                                        data-nimg="fill"
                                        className="w-full h-full object-contain"
                                        style={{
                                          position: "absolute",
                                          inset: "0px",
                                          boxSizing: "border-box",
                                          padding: "0px",
                                          border: "none",
                                          margin: "auto",
                                          display: "block",
                                          width: "0px",
                                          height: "0px",
                                          minWidth: "100%",
                                          maxWidth: "100%",
                                          minHeight: "100%",
                                          maxHeight: "100%",
                                        }}
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
                                <span className="mt-[20px] mr-[15px] inline-flex cursor-pointer">
                                  <svg
                                    onClick={() =>
                                      CartHandler.handleDeleteFromCart(
                                        item,
                                        user_slug as string
                                      )
                                    }
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                    className="inline fill-current text-[#AAAAAA] hover:text-qred"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M7.76 0.24C7.44 -0.08 6.96 -0.08 6.64 0.24L4 2.88L1.36 0.24C1.04 -0.08 0.56 -0.08 0.24 0.24C-0.08 0.56 -0.08 1.04 0.24 1.36L2.88 4L0.24 6.64C-0.08 6.96 -0.08 7.44 0.24 7.76C0.56 8.08 1.04 8.08 1.36 7.76L4 5.12L6.64 7.76C6.96 8.08 7.44 8.08 7.76 7.76C8.08 7.44 8.08 6.96 7.76 6.64L5.12 4L7.76 1.36C8.08 1.04 8.08 0.56 7.76 0.24Z"></path>
                                  </svg>
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
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.992 19.729C19.9004 18.043 19.438 16.4886 18.617 15.1176C17.6046 13.4237 16.2096 12.1244 14.4679 11.2475C14.0773 11.0522 13.878 10.9645 13.3878 10.7772L12.9334 10.6138L13.4954 10.1833C14.5476 9.38621 15.3408 8.08689 15.6118 6.70387C15.6955 6.28936 15.7035 5.22918 15.6317 4.78278C15.4643 3.77043 14.9582 2.70227 14.2766 1.92507C13.4356 0.976485 12.2439 0.30291 11.0084 0.079713C10.7971 0.0398565 10.1515 0 9.75289 0C9.60542 0 9.55361 0.00398565 9.53766 0.0079713H9.53368C9.49781 0.011957 9.42607 0.0239139 9.33838 0.0358709H9.32642C9.25468 0.0438422 9.17896 0.0557991 9.10323 0.0677561C8.1666 0.195297 7.01873 0.73336 6.25349 1.41092C5.27302 2.27581 4.59147 3.50339 4.38023 4.78278C4.3045 5.22918 4.31646 6.28936 4.40016 6.70387C4.67118 8.08689 5.46433 9.38621 6.51654 10.1833L7.07852 10.6138L6.62415 10.7772C6.13392 10.9645 5.93464 11.0522 5.54404 11.2475C3.80231 12.1244 2.40335 13.4237 1.39498 15.1176C0.569948 16.4926 0.107613 18.043 0.0159426 19.729L0 20H0.255082H1.1957H18.8123H19.4938H20.008L19.992 19.729ZM5.56397 4.98605C5.73934 3.92188 6.28537 2.95735 7.10642 2.25986C7.91949 1.57035 8.94779 1.19171 10 1.19171C10.2352 1.19171 10.4743 1.21164 10.7094 1.24751C13.1606 1.64607 14.8386 3.95775 14.444 6.39299C14.2686 7.45715 13.7226 8.42168 12.9016 9.11917C12.0885 9.80869 11.0602 10.1873 10.008 10.1873C9.77282 10.1873 9.53368 10.1674 9.29852 10.1315C6.84735 9.72898 5.16939 7.42128 5.56397 4.98605ZM2.54285 15.5281C3.73057 13.7146 5.31287 12.4751 7.25389 11.8414C8.17059 11.5424 9.09526 11.391 10.004 11.391C10.9127 11.391 11.8374 11.5424 12.7541 11.8414C14.6951 12.4751 16.2814 13.7146 17.4651 15.5281C18.047 16.4169 18.5134 17.6963 18.7086 18.8721H1.29932C1.49462 17.6963 1.96094 16.4169 2.54285 15.5281Z"
                          fill="black"
                        ></path>
                      </svg>
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
                                  // <ul>
                                  //   <li>Option 1</li>
                                  //   <li>Option 2</li>
                                  //   <li>Option 3</li>
                                  // </ul>
                                  <div>
                                    <ul className="w-full flex flex-col space-y-7 text-left ">
                                      <li className="text-base text-qgraytwo">
                                        <span>
                                          Hi, Amaya Hendrix
                                          {/* {states.user?.displayName} */}
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
                                      {/* <Link href={"/login"}> */}
                                      <button
                                        onClick={() => signOut()}
                                        type="button"
                                        className="text-qblack text-base font-semibold"
                                      >
                                        Sign Out
                                      </button>
                                      {/* </Link> */}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* <button onClick={toggleDropdown}></button> */}
                        </span>
                      </div>
                    </span>
                  </div>
                  {/* <button
                    className="compaire relative"
                    onClick={toggleDropdown}
                  >
                    <Link rel="noopener noreferrer" href="/profile">
                    </Link>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="quomodo-shop-drawer lg:hidden block w-full h-[60px] bg-white">
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
            <div className="w-[200px] h-full relative">
              <Link rel="noreferrer" href="/">
                <span className={`${styles["spanStyle"]}`}>
                  <span className={`${styles["spanStyle2"]}`}>
                    <img
                      className={`${styles["imgStyle2"]}`}
                      src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27153%27%20height=%2744%27/%3e"
                      alt="logo"
                    />6
                  </span>
                  <img
                    className={`${styles["imgStyle"]}`}
                    src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Flogo-2022-11-22-11-19-02-4634.png&w=256&q=75"
                    alt="logo"
                  />
                </span>
              </Link>
            </div>
            <Link href="/checkout" className="cart relative cursor-pointer">
              <span>
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.1568 5.1772C16.0284 4.84626 15.7343 4.81766 14.2887 4.81766H13.0875V4.2947C13.0875 3.48165 12.9716 2.91374 12.6899 2.32949C12.1804 1.2713 11.3272 0.531797 10.2213 0.188601C9.68279 0.0251747 8.87923 -0.0442816 8.39047 0.0292604C7.03602 0.241715 5.88039 1.09562 5.29223 2.31315C5.00642 2.90966 4.89045 3.48165 4.89045 4.2947V4.82175H3.68511C2.23954 4.82175 1.94546 4.85035 1.81705 5.19354C1.75078 5.41008 1.12948 10.0637 0.864385 12.0697C0.632431 13.8184 0.417045 15.469 0.259648 16.711C-0.0137267 18.8519 -0.00544266 18.8846 0.00284141 18.9214V18.9255C0.0401198 19.0644 0.408761 19.428 0.520596 19.5342L1.00521 20H16.9438L17.3041 19.6854C17.4657 19.5424 18 19.0562 18 18.8152C18 18.6517 16.1899 5.27117 16.1568 5.1772ZM16.6911 18.5046C16.687 18.5332 16.6538 18.619 16.5958 18.6803L16.513 18.7702H1.46498L1.2496 18.5414L2.09871 12.2863C2.39694 10.0596 2.66203 8.11888 2.81943 6.95855C2.88984 6.45193 2.92298 6.19453 2.93955 6.06788C3.49872 6.06379 5.94252 6.0597 8.98278 6.0597H15.0302L15.0384 6.10465C15.1047 6.4315 16.6621 18.141 16.6911 18.5046ZM6.1372 4.82175V4.35598C6.1372 4.04139 6.17862 3.6083 6.22418 3.40811C6.46856 2.38669 7.30111 1.5573 8.34076 1.29173C8.77568 1.1855 9.48811 1.22228 9.92303 1.37753H9.92717C10.3828 1.5287 10.7556 1.77384 11.0994 2.14972C11.6544 2.74623 11.8408 3.28145 11.8408 4.27018V4.82175H6.1372Z"
                    fill="black"
                  ></path>
                </svg>
              </span>
              <span className="w-[18px] h-[18px] rounded-full bg-qyellow absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
                0
              </span>
            </Link>
          </div>
        </div>
        <HeaderDropdown />
      </header>
    </div>
  );
};

export default HeaderTop;
