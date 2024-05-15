import React, { useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { SocialLogin } from "../../../helpers/SocialLogin";
import ChangePasswordInput from "./ChangePasswordInput";

interface Props {}

const ChangePassword: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorText, setErrorText] = useState("");

  const handlePassChange = async (e: any) => {
    e.preventDefault();

    const email = states.user?.email as string;

    if (newPass != confirmPass) {
      setErrorText("New passwords did not match.");
      return;
    }

    const { res, err } = await SocialLogin.changePassword(
      email,
      oldPass,
      newPass
    );

    console.log({ res, err });
    if (err) {
      setErrorText(err);
    } else {
      e.target.reset();
      console.log(res);
      alert(res);
      setErrorText("");
    }
  };

  return (
    <div className="item-body dashboard-wrapper w-full">
      <div className="changePasswordTab w-full">
        <div className="w-full flex lg:flex-row space-x-5 lg:items-center">
          {/* <form onSubmit={handlePassChange}>
            <div className="lg:w-[397px] w-full mb-10">
              <ChangePasswordInput label="Old Password" id="old_password" />
              <ChangePasswordInput label="Password" id="new_password" />
              <ChangePasswordInput
                label="Re-Enter Password"
                id="re-enter_password"
              />

              <div className="w-full mt-[30px] flex justify-start">
                <div className="sm:flex sm:space-x-[30px] items-center">
                  <div className="w-[180px] h-[50px] lg:mb-0 mb-5">
                    <button type="button" className="yellow-btn ">
                      <div className="w-full text-sm font-semibold ">
                        Update Password
                      </div>
                    </button>
                  </div>
                  <button type="button">
                    <div className="w-full text-sm font-semibold text-qblack mb-5 sm:mb-0">
                      Cancel
                    </div>
                  </button>
                </div>
              </div>

            </div>
          </form>  */}
          <form onSubmit={handlePassChange} className={``}>
            <div className={``}>
              <div>
                <div className={` w-[380px] `}>
                  <div className="mt-4">
                    <div className="my-4 ">
                      <label
                        className="text-qgray font-semibold mt-4	text-sm"
                        htmlFor="">
                        Old Password
                      </label>
                      <span className="text-red-500 ml-2">*</span>
                    </div>
                    <input
                      onChange={(e) => setOldPass(e.target.value)}
                      className="w-full px-3 py-3 focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc]  rounded-md text-sm"
                      type="password"
                      name="oldPassword"
                      id="oldPassword"
                    />
                  </div>

                  <div className="mt-4">
                    <div className="my-4">
                      <label
                        className="text-qgray font-semibold mt-4	text-sm"
                        htmlFor="">
                        New Password
                      </label>
                      <span className="text-red-500 ml-2">*</span>
                    </div>
                    <input
                      onChange={(e) => setNewPass(e.target.value)}
                      className="w-full px-3 py-3 focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc]  rounded-md text-sm"
                      type="password"
                      name="password"
                      id="password"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="my-4">
                      <label
                        className="text-qgray font-semibold mt-4	text-sm"
                        htmlFor="">
                        Confirm New Password
                      </label>
                      <span className="text-red-500 ml-2">*</span>
                    </div>
                    <input
                      onChange={(e) => setConfirmPass(e.target.value)}
                      className="w-full px-3 py-3 focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc] rounded-md text-sm"
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                    />
                  </div>
                  <div className="w-full mt-[30px] flex justify-start">
                    <div className="sm:flex sm:space-x-[30px] items-center">
                      <div className="w-[180px] h-[50px] lg:mb-0 mb-5">
                        <button type="submit" className="yellow-btn ">
                          <div className="w-full text-sm font-semibold ">
                            Update Password
                          </div>
                        </button>
                      </div>
                      <button type="button">
                        <div className="w-full text-sm font-semibold text-qblack mb-5 sm:mb-0">
                          Cancel
                        </div>
                      </button>
                    </div>
                  </div>

                  {errorText && (
                    <div className="mt-4 text-qred font-semibold">
                      <span>{errorText}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
          <div className="flex-1 sm:flex hidden justify-end">
            <div className="w-[310px] h-[320px] relative">
              <span>
                <img
                  alt="404"
                  sizes="100vw"
                  src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Fchange_password_image-2022-11-17-11-26-36-3416.png&w=1920&q=75"
                  decoding="async"
                  data-nimg="fill"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
