import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { controller } from "./../../../../src/state/StateController";
import Select, { components, MenuProps } from "react-select";
import { useState } from "react";
import { EcommerceApi } from "../../../../src/API/EcommerceApi";
import { IUser } from "../../../../interfaces/models";
import { updateProfile } from "firebase/auth";
import { SocialLogin } from "../../../helpers/SocialLogin";
import style from "./PersonalInfo.module.css";

interface Props {
  user: IUser | null;
}

const PersonalInfo: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  // console.log(props.user);
  // const [selectedOption, setSelectedOption] = useState(null);

  // const style = {
  //   control: (base: any) => ({
  //     ...base,
  //     border: "1px solid rgb(239 239 239)",
  //     height: "50px",
  //     width: "100%",
  //     margin: "0",
  //     paddingLeft: "12px",
  //     paddingRight: "12px",
  //     fontSize: "13px",
  //     borderRadius: 0,
  //     // This line disable the blue border
  //     boxShadow: "none",
  //     cursor: "pointer",
  //     "&:hover": {
  //       border: "1px solid rgb(239 239 239)",
  //     },
  //   }),
  // };

  // const countryOptions = [
  //   { value: "bangladesh", label: "Bangladesh" },
  //   { value: "india", label: "India" },
  //   { value: "qatar", label: "Qatar" },
  // ];

  // const handleChange = (selectedOption: any) => {
  //   setSelectedOption(selectedOption);
  // };

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    const avatar = e.target.user_avatar.files[0];
    const formData = new FormData();
    formData.append("image", avatar);

    const { res, err } = await EcommerceApi.uploadImage(formData);
    if (res?.data?.url || !res?.data?.url) {
      let imageUrl;
      imageUrl = res?.data?.url;
      if (res?.data?.url === undefined || null) {
        imageUrl = states.user?.avatar;
      }

      const newProfileData = {
        fullName: e.target.name.value,
        avatar: imageUrl,
      };
      console.log(newProfileData);

      const { res: socialRes, err } =
        await SocialLogin.updateLoggedInUserProfile(
          states.user?.slug,
          newProfileData
        );
      console.log("res social", socialRes);
      const email = states.user?.email;
      const address = {
        name: e.target.name.value,
        avatar: newProfileData.avatar,
        phone: e.target.phone.value,
        country: e.target.country.value,
        state: e.target.state.value,
        city: e.target.city.value,
        address: e.target.address.value,
      };

      if (socialRes === "Profile updated") {
        const { res: dbRes, err } = await EcommerceApi.updateUserInfo(
          email,
          address
        );
        if (dbRes) {
          controller.setUser(dbRes);
          alert("Updated successfully !");
          // console.log("address", address);
          // console.log("db res", dbRes);
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={handleUpdateProfile}>
        <div className="flex flex-col-reverse lg:flex-row space-x-8">
          <div className="">
            <div className="mb-8">
              <div className="w-full mb-5 sm:mb-0">
                <div className="w-full h-full">
                  <label className="capitalize block  mb-2 text-qgray text-[13px] font-normal">
                    Name
                  </label>
                  <div className="border  w-full h-full overflow-hidden relative border-qgrayBorder">
                    <input
                      defaultValue={props.user?.fullName}
                      name="name"
                      placeholder="Name"
                      type="text"
                      maxLength={50}
                      className="placeholder:text-sm text-sm px-6 text-dark-gray font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-x-2.5 items-center mb-8">
              <div className="sm:w-1/2 w-full">
                <div className="w-full h-full">
                  <label className="capitalize block  mb-2 text-qgray text-[13px] font-normal">
                    Email
                    <span className="text-yellow-500 text-xs ml-1">
                      (Read Only)
                    </span>
                  </label>
                  <input
                    readOnly
                    name="email"
                    value={props.user?.email}
                    className="border border-yellow-500 px-6 w-full h-[50px] bg-yellow-50 text-dark-gray flex items-center cursor-not-allowed rounded"
                  />
                </div>
              </div>
              <div className="sm:w-1/2 w-full">
                <div className="w-full h-full">
                  <label className="capitalize block  mb-2 text-qgray text-[13px] font-normal">
                    Phone Number
                  </label>
                  <div className="border  w-full h-full overflow-hidden relative border-qgrayBorder">
                    <input
                      defaultValue={props?.user?.phone}
                      name="phone"
                      placeholder="01834 *******"
                      type="tel"
                      maxLength={50}
                      className="placeholder:text-sm text-sm px-6 text-dark-gray font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h1 className="capitalize block mb-2 text-qgray text-[13px] font-normal">
                Country*
              </h1>

              <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                <input
                  defaultValue={props.user?.address?.country}
                  name="country"
                  placeholder="country"
                  type="text"
                  maxLength={50}
                  className="input-field placeholder:text-sm text-sm px-6 text-dark-gray   font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                />
              </div>
            </div>
            <div className="flex space-x-5 items-center mb-6">
              <div className="w-1/2">
                <h1 className="capitalize block mb-2 text-qgray text-[13px] font-normal">
                  State*
                </h1>

                <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                  <input
                    defaultValue={props.user?.address?.state}
                    name="state"
                    placeholder="State"
                    type="text"
                    maxLength={50}
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray   font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <h1 className="capitalize block mb-2 text-qgray text-[13px] font-normal">
                  City*
                </h1>

                <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                  <input
                    defaultValue={props.user?.address?.city}
                    name="city"
                    placeholder="City"
                    type="text"
                    maxLength={50}
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray   font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                  />
                </div>
              </div>
            </div>
            <div className="mb-8">
              <div className="w-full">
                <div className="w-full h-full">
                  <label className="capitalize block  mb-2 text-qgray text-[13px] font-normal">
                    Address
                  </label>
                  <div className="border  w-full h-full overflow-hidden relative border-qgrayBorder">
                    <input
                      defaultValue={props.user?.address?.address}
                      name="address"
                      placeholder="Your Address here"
                      type="text"
                      maxLength={200}
                      className="placeholder:text-sm text-sm px-6 text-dark-gray  font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-x-4 items-center">
              <button type="button" className="text-sm text-qred font-semibold">
                Cancel
              </button>
              <button
                type="submit"
                className="w-[164px] h-[50px] bg-qyellow rounded text-qblack text-sm">
                Update Profile
              </button>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full mb-9">
              <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
                Update Profile
                <span className="ml-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z"
                      fill="#374557"
                      fill-opacity="0.6"></path>
                  </svg>
                </span>
              </h1>
              <p className="text-sm text-qgraytwo mb-5 ">
                Profile of at least Size
                <span className="ml-1 text-qblack">300x300</span>
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
                        border: "0px",
                        margin: "0px",
                        padding: "0px",
                        position: "absolute",
                        inset: "0px",
                      }}>
                      {/* <img
                    alt=""
                    src={states?.user?.avatar}
                    decoding="async"
                    data-nimg="fill"
                    className="object-cover w-full h-full"
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
                      maxWidth: "100",
                      minHeight: "100",
                      maxHeight: "100",
                    }}
                    sizes="100vw"
                  /> */}
                      <img src={states.user?.avatar} alt="profile" />
                    </span>
                  </div>
                  <input
                    type="file"
                    className={`${style["file"]}   `}
                    id="file"
                    name="user_avatar"
                  />
                  <div className="w-[32px] h-[32px] z-index bottom-8 right-0 bg-qyellow rounded-full cursor-pointer">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                        fill="white"></path>
                      <path
                        d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                        fill="white"></path>
                    </svg>
                  </div>
                </div>
                {/* <div className="sm:w-[198px] sm:h-[198px] w-[199px] h-[199px] rounded-full overflow-hidden relative">
              <img src={states.user?.avatar} alt="profile" />
            </div> */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PersonalInfo;
