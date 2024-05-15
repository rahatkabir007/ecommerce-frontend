import React, { useState } from "react";
import { useSelector } from "react-redux";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { controller } from "../../../src/state/StateController";
import PageHeader from "../../shared/SharedPageHeader/PageHeader";

interface Props {}

const BecomeSeller: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);

  const logoChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedLogo(e.target.files[0]);
    }
  };
  const coverChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedCover(e.target.files[0]);
    }
  };

  const handleSellerAdd = async (e: any) => {
    e.preventDefault();
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
          console.log(sellerRes);
          alert("Already exists !");
        } else {
          alert("Successfully Applied ! !");
          // console.log(err);
        }

        console.log(sellerData, email);
        // e.target.reset();
      }
    }
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
                          htmlFor="email"
                        >
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
                          htmlFor="phone"
                        >
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
                          htmlFor="shopname"
                        >
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
                          htmlFor="shopaddress"
                        >
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
                          // disabled={disabled}
                          type="submit"
                          className="black-btn disabled:bg-opacity-50 disabled:cursor-not-allowed text-sm text-white w-[490px] h-[50px] font-semibold flex justify-center bg-purple items-center"
                        >
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
                                src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Fbecome_seller_avatar-2022-11-17-11-38-55-7934.png&w=1920&q=75"
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
                        <input
                          onChange={logoChange}
                          type="file"
                          className=""
                          name="logoUrl"
                        />

                        <div className="w-[32px] h-[32px] absolute bottom-7 sm:right-0 right-[105px] hover:bg-[#F539F8] bg-[#F539F8] rounded-full cursor-pointer">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                              fill="white"></path>
                          </svg>
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
                                src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Fbecome_seller_banner-2022-11-17-11-41-53-5886.png&w=1920&q=75"
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
                        {/* <input type="file" className="hidden" name="coverUrl" /> */}
                        <div className="w-[32px] h-[32px] absolute -bottom-4 right-4 bg-[#F539F8] hover:bg-[#F539F8] rounded-full cursor-pointer">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                              fill="white"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <input
                      onChange={coverChange}
                      type="file"
                      className=""
                      name="coverUrl"
                    />
                    {/*cover div */}
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
