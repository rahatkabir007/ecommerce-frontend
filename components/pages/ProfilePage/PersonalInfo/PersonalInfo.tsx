import React, { useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "./../../../../src/state/StateController";
import { EcommerceApi } from "../../../../src/API/EcommerceApi";
import { SocialLogin } from "../../../helpers/SocialLogin";
import style from "./PersonalInfo.module.css";

import toast from "react-hot-toast";
interface Props {}

// TODO: image upload validation on height and width

const PersonalInfo: React.FC<Props> = (props) => {
  const user = useSelector(() => controller.states.user);
  const [selectedImage, setSelectedImage] = useState(null);

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    controller.setApiLoading(true);

    const avatar = e.target.user_avatar.files[0];
    const formData = new FormData();
    formData.append("image", avatar);

    const { res, err } = await EcommerceApi.uploadImage(formData);

    let imageUrl;
    imageUrl = res?.data?.url;
    if (res?.data?.url === undefined || null) {
      imageUrl = user?.avatar;
    }

    const newProfileData = {
      fullName: e.target.name.value,
      avatar: imageUrl,
    };

    const { res: socialRes, err: socialErr } =
      await SocialLogin.updateLoggedInUserProfile(user?.slug, newProfileData);

    const email = user?.email;
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
        toast("Updated successfully!");
      }
    }

    controller.setApiLoading(false);
  };

  return (
    <form onSubmit={handleUpdateProfile}>
      <div className="flex flex-col-reverse lg:flex-row space-x-8 px-1 md:px-0">
        <div>
          <div className="mb-3 md:mb-8">
            <div className="w-full md:mb-5 sm:mb-0">
              <div className="w-full h-full">
                <label className="capitalize block mb-2 text-qgray text-[13px] font-normal">
                  Name
                </label>
                <div className="border w-full h-full overflow-hidden relative border-qgrayBorder">
                  <input
                    defaultValue={user?.fullName}
                    name="name"
                    placeholder="Name"
                    type="text"
                    maxLength={50}
                    className="placeholder:text-sm text-sm px-3 md:px-6 text-dark-gray font-normal bg-white focus:ring-0 focus:outline-none w-full h-10 md:h-[50px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:flex gap-x-2.5 items-center mb-3 md:mb-8">
            <div className="md:w-1/2 w-full mb-3 md:mb-0">
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
                  value={user?.email}
                  className="border border-yellow-500 w-full text-sm px-3 md:px-6  h-10 md:h-[50px] bg-yellow-50 text-dark-gray flex items-center cursor-not-allowed rounded"
                />
              </div>
            </div>

            <div className="md:w-1/2 w-full">
              <div className="w-full h-full">
                <label className="capitalize block mb-2 text-qgray text-[13px] font-normal">
                  Phone Number
                </label>
                <div className="border  w-full h-full overflow-hidden relative border-qgrayBorder">
                  <input
                    defaultValue={user?.phone}
                    name="phone"
                    placeholder="01834 *******"
                    type="tel"
                    maxLength={50}
                    className="placeholder:text-sm text-sm text-dark-gray font-normal bg-white focus:ring-0 focus:outline-none w-full px-3 md:px-6 h-10 md:h-[50px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 md:mb-8">
            <h1 className="capitalize block mb-2 text-qgray text-[13px] font-normal">
              Country*
            </h1>

            <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
              <input
                defaultValue={user?.address?.country}
                name="country"
                placeholder="country"
                type="text"
                maxLength={50}
                className="input-field placeholder:text-sm text-sm text-dark-gray   font-normal bg-white focus:ring-0 focus:outline-none w-full px-3 md:px-6  h-10 md:h-[50px]"
              />
            </div>
          </div>

          <div className="md:flex gap-x-2.5 items-center mb-3 md:mb-6">
            <div className="md:w-1/2 w-full mb-3 md:mb-0">
              <h1 className="capitalize block mb-2 text-qgray text-[13px] font-normal">
                State*
              </h1>

              <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                <input
                  defaultValue={user?.address?.state}
                  name="state"
                  placeholder="State"
                  type="text"
                  maxLength={50}
                  className="input-field placeholder:text-sm text-sm text-dark-gray   font-normal bg-white focus:ring-0 focus:outline-none w-full px-3 md:px-6  h-10 md:h-[50px]"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h1 className="capitalize block mb-2 text-qgray text-[13px] font-normal">
                City*
              </h1>

              <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                <input
                  defaultValue={user?.address?.city}
                  name="city"
                  placeholder="City"
                  type="text"
                  maxLength={50}
                  className="input-field placeholder:text-sm text-sm text-dark-gray   font-normal bg-white focus:ring-0 focus:outline-none w-full px-3 md:px-6  h-10 md:h-[50px]"
                />
              </div>
            </div>
          </div>

          <div className="mb-3 md:mb-8">
            <div className="w-full">
              <div className="w-full h-full">
                <label className="capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Address
                </label>
                <div className="border  w-full h-full overflow-hidden relative border-qgrayBorder">
                  <input
                    defaultValue={user?.address?.address}
                    name="address"
                    placeholder="Your Address here"
                    type="text"
                    maxLength={200}
                    className="placeholder:text-sm text-sm text-dark-gray  font-normal bg-white focus:ring-0 focus:outline-none w-full px-3 md:px-6  h-10 md:h-[50px]"
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
              className="w-[164px] h-[50px] bg-qyellow rounded text-qblack text-sm font-semibold"
            >
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
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z"
                    fill="#374557"
                    fillOpacity="0.6"
                  ></path>
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
                  <img
                    className="w-full h-full object-contain"
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : user?.avatar
                    }
                    alt="profile"
                  />
                </div>
                <input
                  type="file"
                  className={`${style["file"]} absolute`}
                  id="file"
                  name="user_avatar"
                  onChange={imageChange}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PersonalInfo;
