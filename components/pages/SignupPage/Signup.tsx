import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import Styles from "./signup.module.css";
import Link from "next/link";
import { SocialLogin } from "../../helpers/SocialLogin";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { IUser } from "../../../interfaces/models";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
interface Props {}

const Signup: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [sendVerifyText, setSendVerifyText] = useState(false);

  if (sendVerifyText) {
    toast.success("Signed up & Verification sent");
  }

  useEffect(() => {
    SocialLogin.initFirebase();
  }, []);

  const handleEmailPasswordSignUp = async (e: any) => {
    e.preventDefault();

    const password = e.target.password.value;
    const firstName = e.target.fname.value;
    const lastName = e.target.lname.value;
    const displayName = firstName.concat(" ", lastName);
    const email = e.target.email.value;

    if (e.target.password.value.length < 6) {
      setError(true);
      toast.error("password must be 6 characters minimum");
      
    } else {
      const { res, err } = await SocialLogin.signUpWithEmailPassword(
        displayName,
        email,
        password
      );
      if (err) {
        setError(true);
        toast.error(err);
        
      } else {
        const token = res?.user?.accessToken;
        const user = res.user;
        
        if (token && user?.email) {
          const { email } = user;
          const data: Partial<IUser> = {
            token: token,
            tokenType: "email",
            email: email,
            avatar: "https://tinyurl.com/382e6w5t",
            fullName: displayName,
            role: "buyer",
          };

          const { res, err } = await EcommerceApi.login(data);
          if (err) {
            setError(true);
            toast.error("Database Server Error");
            SocialLogin.loginWithEmailPasswordAfterServerError();
          
          } else {
            SocialLogin.sendEmail();
            setSendVerifyText(true);
            setError(false);
            router.push("/login");
          }
        }
      }
    }
  };

  return (
    <div className="lg:w-[572px] w-full lg:h-auto bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
      <div className="w-full">
        <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
          <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
            Create Account
          </h1>
          <div className="shape -mt-6">
            <svg
              width="354"
              height="30"
              viewBox="0 0 354 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                stroke="#FFBB38"
                stroke-width="2"
                stroke-linecap="round"
              ></path>
            </svg>
          </div>
        </div>
        <form
          className="input-area"
          onSubmit={(e) => handleEmailPasswordSignUp(e)}
        >
          <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
            <div className="h-full">
              <div className="input-com w-full h-full">
                <label
                  className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                  htmlFor="fname"
                >
                  First Name*
                </label>
                <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                  <input
                    name="fname"
                    placeholder="Name"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                    type="text"
                    id="fname"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="h-full">
              <div className="input-com w-full h-full">
                <label
                  className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                  htmlFor="lname"
                >
                  Last Name*
                </label>
                <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                  <input
                    name="lname"
                    placeholder="Name"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                    type="text"
                    id="lname"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="input-item mb-5">
            <div className="input-com w-full h-full">
              <label
                className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                htmlFor="email"
              >
                Email Address*
              </label>
              <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                <input
                  name="email"
                  placeholder="Email"
                  className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                  type="email"
                  id="email"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
            <div className="h-full">
              <div className="input-com w-full h-full">
                <label
                  className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                  htmlFor="password"
                >
                  Password*
                </label>
                <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                  <input
                    name="password"
                    placeholder="* * * * * *"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                    type="password"
                    id="password"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="h-full">
              <div className="input-com w-full h-full">
                <label
                  className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal"
                  htmlFor="confirm_password"
                >
                  Confirm Password*
                </label>
                <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                  <input
                    name="rePassword"
                    placeholder="* * * * * *"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full  font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                    type="password"
                    id="confirm_password"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="forgot-password-area mb-7">
            <div className="remember-checkbox flex items-center space-x-2.5">
              <input
                onChange={() => setChecked(!checked)}
                type="checkbox"
                checked={checked}
                className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                required
              />
              <Link
                href="/seller_terms_condition"
                className="text-base text-black cursor-pointer"
              >
                I agree all terms and condition in ecoShop
              </Link>
            </div>
          </div>
          <div className="signin-area mb-3">
            <div className="flex justify-center">
              <button
                disabled={!checked}
                type="submit"
                className={`${Styles["black-btn"]} disabled:bg-opacity-50 disabled:cursor-not-allowed w-full h-[50px] font-semibold flex justify-center bg-purple items-center`}
              >
                <span className="text-sm text-white block">Create Account</span>
              </button>
            </div>
          </div>
          <div className="signup-area flex justify-center">
            <p className={`text-base ${Styles["text-qgraytwo"]} font-normal`}>
              Already have an Account?
              <Link href="/login" className="ml-2 text-qblack cursor-pointer ">
                Log In
              </Link>
            </p>
          </div>
        </form>
        {error && <div style={{ color: "red" }}>{errorText}</div>}
        {/* {sendVerifyText && <div>Signed up & Verification sent </div>} */}
      </div>
    </div>
  );
};

export default Signup;
