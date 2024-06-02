import React, { useState } from "react";
import { useSelector } from "react-redux";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { controller } from "../../../src/state/StateController";
import PageHeader from "../../shared/SharedPageHeader/PageHeader";
import toast from "react-hot-toast";
import style from "./BecomeSeller.module.css";

interface Props {}

const BecomeSeller: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);
  const [applyButton, setApplyButton] = useState(false);

  const logoChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedLogo(e.target.files[0]);
    }
    setApplyButton(true);
  };
  const coverChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedCover(e.target.files[0]);
    }
    setApplyButton(true);
  };

  const handleSellerAdd = async (e: any) => {
    e.preventDefault();
    controller.setApiLoading(true);

    const logo = e.target.logoUrl.files[0];
    const cover = e.target.coverUrl.files[0];
    const formData1 = new FormData();
    formData1.append("image", logo);
    const formData2 = new FormData();
    formData2.append("image", cover);
    const { res: res1, err } = await EcommerceApi.uploadLogoandCover(formData1);
    if (res1?.data?.url || !res1?.data?.url) {
      let logoUrl;
      logoUrl = res1?.data?.url;
      if (res1?.data?.url === undefined || null) {
        logoUrl = "";
      }
      const { res, err } = await EcommerceApi.uploadLogoandCover(formData2);
      if (res?.data?.url || !res?.data?.url) {
        let coverUrl;
        coverUrl = res?.data?.url;
        if (res?.data?.url === undefined || null) {
          coverUrl = "";
        }
        const email = e.target.email.value;
        const sellerData = {
          user_email: states.user?.email,
          fullName: states.user?.fullName,
          avatar: states.user?.avatar,
          email: e.target.email.value,
          phone: e.target.phone.value,
          shop: {
            shop_name: e.target.shopname.value,
            shop_address: e.target.shopaddress.value,
            shop_logo: logoUrl,
            shop_cover: coverUrl,
          },
          status: "inactive",
          role: "seller",
        };
        const { res: sellerRes, err } = await EcommerceApi.addSeller(
          sellerData
        );
        if (!sellerRes) {
          toast.error("Already exists !");
        } else {
          toast.success("Successfully Applied ! !");
          e.target.reset();
        }
      }
    }
    controller.setApiLoading(false);
  };

  return (
    <>
      <PageHeader
        slug="Become Seller "
        link="/become_seller"
        title="Seller Application"
      />
      <div className="content-wrapper w-full my-10">
        <div className="container-x mx-auto">
          <div className="w-full bg-white sm:p-[30px] p-3">
            <form onSubmit={(e) => handleSellerAdd(e)}>
              <div className="flex xl:flex-row flex-col-reverse xl:space-x-11">
                <div className="xl:w-[824px]">
                  <div className="title w-full mb-4">
                    <h1 className="text-[22px] font-semibold text-qblack mb-1">
                      Seller Information
                    </h1>
                    <p className="text-[15px] text-qgraytwo">
                      Fill the form below or write us We will help you as soon
                      as possible
                    </p>
                  </div>
                  <div className="input-area">
                    <div className="mb-5">
                      <div className="input-com w-full h-full">
                        <label
                          className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                          htmlFor="email">
                          Email Address*
                        </label>
                        <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                          <input
                            required
                            placeholder="Email"
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                            type="email"
                            id="email"
                            name="email"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="input-com w-full h-full">
                        <label
                          className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                          htmlFor="phone">
                          phone no
                        </label>
                        <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                          <input
                            required
                            placeholder="+880 1796-306262"
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                            type="text"
                            id="phone"
                            name="phone"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="title w-full mt-10 mb-4">
                    <h1 className="text-[22px] font-semibold text-qblack mb-1">
                      Shop Information
                    </h1>
                    <p className="text-[15px] text-qgraytwo">
                      Fill the form below or write us We will help you as soon
                      as possible
                    </p>
                  </div>
                  <div className="input-area">
                    <div className="mb-5">
                      <div className="input-com w-full h-full">
                        <label
                          className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                          htmlFor="shopname">
                          Shop Name*
                        </label>
                        <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                          <input
                            required
                            placeholder="Shop Name"
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                            type="text"
                            id="shopname"
                            name="shopname"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-5">
                      <div className="input-com w-full h-full">
                        <label
                          className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                          htmlFor="shopaddress">
                          Address
                        </label>
                        <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                          <input
                            required
                            placeholder="Your address Here"
                            className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                            type="text"
                            id="shopaddress"
                            name="shopaddress"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-[18px] h-[18px] border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                            required
                          />
                        </div>
                        <div className="ml-3 mb-3 text-sm">
                          <label htmlFor="remember" className="text-gray-500">
                            I agree all terms and condition in Rich IT.
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="signin-area mb-3">
                      <div className="flex justify-center">
                        <button
                          disabled={applyButton === false}
                          type="submit"
                          className="black-btn disabled:bg-opacity-50 disabled:cursor-not-allowed text-sm text-white w-[490px] h-[50px] font-semibold flex justify-center bg-purple items-center">
                          <span>Create Seller Account</span>
                        </button>
                      </div>
                    </div>
                    <div className="signup-area flex justify-center">
                      <p className="text-sm text-qgraytwo font-normal">
                        Already have an Account?<a href="/login">Log In</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 mb-10 xl:mb-0">
                  <div className="update-logo w-full mb-9">
                    <h1 className="text-xl tracking-wide font-bold text-qblack mb-2">
                      Update Logo
                    </h1>
                    <p className="text-sm text-qgraytwo mb-5">
                      Profile of at least Size
                      <span className="ml-1 text-qblack">300x300</span>. Gifs
                      work too.<span className="ml-1 text-qblack">Max 5mb</span>
                      .
                    </p>
                    <div className="flex xl:justify-center justify-start">
                      <div className="relative">
                        <div className="sm:w-[198px] sm:h-[198px] w-[199px] h-[199px] rounded-full overflow-hidden relative">
                          <span
                            style={{
                              boxSizing: "border-box",
                              display: "block",
                              overflow: "hidden",
                              width: "initial",
                              height: "initial",
                              background: "none",
                              opacity: "1",
                              border: "0",
                              margin: "0",
                              padding: "0",
                              position: "absolute",
                              inset: "0",
                            }}>
                            {selectedLogo ? (
                              <img
                                alt=""
                                src={URL.createObjectURL(selectedLogo)}
                                decoding="async"
                                data-nimg="fill"
                                style={{
                                  position: "absolute",
                                  inset: " 0",
                                  boxSizing: "border-box",
                                  padding: "0",
                                  border: "none",
                                  margin: "auto",
                                  display: "block",
                                  width: "0",
                                  height: "0",
                                  minWidth: "100%",
                                  maxWidth: "100%",
                                  minHeight: "100%",
                                  maxHeight: "100%",
                                  objectFit: "cover",
                                }}
                                sizes="100vw"
                              />
                            ) : (
                              <img
                                alt=""
                                src="https://i.ibb.co/vzwDVb1/become-seller-avatar-2022-11-17-11-38-55-7934.webp"
                                decoding="async"
                                data-nimg="fill"
                                style={{
                                  position: "absolute",
                                  inset: " 0",
                                  boxSizing: "border-box",
                                  padding: "0",
                                  border: "none",
                                  margin: "auto",
                                  display: "block",
                                  width: "0",
                                  height: "0",
                                  minWidth: "100%",
                                  maxWidth: "100%",
                                  minHeight: "100%",
                                  maxHeight: "100%",
                                  objectFit: "cover",
                                }}
                                sizes="100vw"
                              />
                            )}
                            <noscript></noscript>
                          </span>
                        </div>
                        {/* input field */}

                        <div className="absolute">
                          <input
                            onChange={logoChange}
                            type="file"
                            name="logoUrl"
                            className={`${style["file-logo"]}    absolute`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="update-cover w-full">
                    <h1 className="text-xl tracking-wide font-bold text-qblack mb-2">
                      Update Cover
                    </h1>
                    <p className="text-sm text-qgraytwo mb-5">
                      Cover of at least Size
                      <span className="ml-1 text-qblack">1170x920</span>.
                    </p>

                    {/*cover div */}
                    <div className="flex justify-center">
                      <div className="w-full relative">
                        <div className="w-full h-[120px] rounded-lg overflow-hidden object-cover">
                          <span
                            style={{
                              boxSizing: "border-box",
                              display: " block",
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
                            }}>
                            {selectedCover ? (
                              <img
                                alt=""
                                src={URL.createObjectURL(selectedCover)}
                                decoding="async"
                                data-nimg="fill"
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
                                sizes="100vw"
                              />
                            ) : (
                              <img
                                alt=""
                                src="https://i.ibb.co/bBSrTY1/cover-img.png"
                                decoding="async"
                                data-nimg="fill"
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
                                sizes="100vw"
                              />
                            )}
                            <noscript></noscript>
                          </span>
                        </div>

                        <input
                          type="file"
                          onChange={coverChange}
                          className={`${style["file-cover"]}  `}
                          name="coverUrl"
                        />
                      </div>
                    </div>

                    {/*-------------cover div--------------------- */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeSeller;
