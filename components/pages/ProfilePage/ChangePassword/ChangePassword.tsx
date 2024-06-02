import React, { useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { SocialLogin } from "../../../helpers/SocialLogin";
import ChangePasswordInput from "./ChangePasswordInput";
import { toast } from "react-hot-toast";

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

    if (err) {
      setErrorText(err);
    } else {
      e.target.reset();
      toast.success("Successfully updated !");
      setErrorText("");
    }
  };

  return (
    <div className="w-full flex lg:flex-row space-x-5 lg:items-center">
      <form onSubmit={handlePassChange} className="w-full px-1 md:px-0">
        <div className="lg:w-[397px] w-full mb-10">
          <ChangePasswordInput
            label="Old Password"
            id="old_password"
            pass={setOldPass}
          />
          <ChangePasswordInput
            label="Password"
            id="new_password"
            pass={setNewPass}
          />
          <ChangePasswordInput
            label="Re-Enter Password"
            id="re-enter_password"
            pass={setConfirmPass}
          />

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
        </div>
      </form>

      <div className="flex-1 md:flex hidden justify-end">
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
  );
};

export default ChangePassword;
