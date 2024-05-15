import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "./../../../src/state/StateController";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { SocialLogin } from "../../helpers/SocialLogin";
import { CookiesHandler } from "../../../src/utils/CookiesHandler";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { useRouter } from "next/router";
import { IUser } from "../../../interfaces/models";

interface Props {}

const LoginForm: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorTextLogin, setErrorTextLogin] = useState("");
  const [successLogin, setSuccessLogin] = useState(false);
  const [successTextLogin, setSuccessTextLogin] = useState("");
  const [loggedinSendVerify, setLoggedinSendVerify] = useState(false);
  const [loggedinSendVerifyText, setLoggedinSendVerifyText] = useState("");

  const router = useRouter();

  useEffect(() => {
    SocialLogin.initFirebase();
  }, []);

  const sendEmailVerify = async () => {
    SocialLogin.sendEmail();
    setErrorLogin(false);
    setSuccessLogin(false);
    setLoggedinSendVerifyText("Verification sent");
  };

  const handleGoogleSignUp = async () => {
    // actions.setDialogLoading(true)
    const { token, user } = await SocialLogin.loginWithGoogle();
    if (token && user?.email && user?.displayName && user?.photoURL) {
      const { email, displayName, photoURL } = user;
      // window.smartlook('identify', email);
      const data: Partial<IUser> = {
        token: token,
        tokenType: "google",
        email: email,
        avatar: photoURL,
        fullName: displayName,
        role: "buyer",
      };
      const { res, err } = await EcommerceApi.login(data);
      if (err) {
        console.log("Login error");
      } else {
        if (res.role == "admin") {
          setErrorLogin(true);
          setErrorTextLogin("Already registered as Admin");
        } else if (res.role == "seller") {
          setErrorLogin(true);
          setErrorTextLogin("Already registered as Seller");
        } else if (res.slug && res.access_token) {
          controller.setUser(res);
          setErrorLogin(false);
          setSuccessLogin(true);
          CookiesHandler.setAccessToken(res.access_token);
          CookiesHandler.setSlug(res.slug as string);
          setSuccessTextLogin("SignIn Success");
          router.push("/profile");
        }
      }
    }
  };

  const handleEmailPasswordLogin = async (e: any) => {
    e.preventDefault();
    const loginPassword = e.target.password.value;
    const loginEmail = e.target.email.value;

    const { res, err } = await SocialLogin.loginWithEmailPassword(
      loginEmail,
      loginPassword
    );
    if (err) {
      setErrorLogin(true);
      setSuccessLogin(false);
      setErrorTextLogin(err);
    } else {
      console.log("resss", res);
      setErrorLogin(false);
      if (!res.user.emailVerified) {
        console.log("kkk");
        setLoggedinSendVerify(true);
        setLoggedinSendVerifyText("verify first and login again");
      } else {
        setLoggedinSendVerify(false);
        console.log("resooooo", res);
        const token = res?.user?.accessToken;
        const user = res.user;
        console.log("use,tok", user?.email);
        console.log("dis", user?.displayName);
        if (token && user?.email) {
          console.log("enter");
          const { email, displayName } = user;
          const data: Partial<IUser> = {
            token: token,
            tokenType: "email",
            email: email,
            avatar: "https://tinyurl.com/382e6w5t",
            fullName: displayName,
            // role: 'buyer'
          };
          const { res, err } = await EcommerceApi.login(data);
          if (err) {
            setErrorLogin(true);
            setSuccessLogin(false);
            setErrorTextLogin("Server Error");
          } else {
            if (res.role == "admin") {
              setErrorLogin(true);
              setErrorTextLogin("Already registered as Admin");
            } else if (res.role == "seller") {
              setErrorLogin(true);
              setErrorTextLogin("Already registered as Seller");
            } else if (res.slug && res.access_token) {
              controller.setUser(res);
              setErrorLogin(false);
              setSuccessLogin(true);
              CookiesHandler.setAccessToken(res.access_token);
              CookiesHandler.setSlug(res.slug as string);
              setSuccessTextLogin("SignIn Success");
              router.push("/");
            }
          }
        }
      }
    }
  };

  return (
    <div className="lg:w-[572px] w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
      <div className="w-full">
        <div className="flex flex-col justify-center items-center relative text-center mb-7">
          <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
            Log In
          </h1>
          <div className="-mt-6">
            <svg
              width="172"
              height="29"
              viewBox="0 0 172 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                stroke="#FFBB38"></path>
            </svg>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            handleEmailPasswordLogin(e);
          }}>
          <div className="mb-5">
            <div className="w-full h-full">
              <label
                className="capitalize block  mb-2 text-qgray text-[13px] font-normal"
                htmlFor="email">
                Email Address*
              </label>
              <div className="border  w-full h-full overflow-hidden relative border-qgray-border">
                <input
                  placeholder="Email Address"
                  className="placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <div className="w-full h-full">
              <label
                className="capitalize block  mb-2 text-qgray text-[13px] font-normal"
                htmlFor="password">
                Password
              </label>
              <div className="border  w-full h-full overflow-hidden relative border-qgray-border">
                <input
                  placeholder="* * * * * *"
                  className="placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
                  type="password"
                  id="password"
                  name="password"
                  required
                />
              </div>
            </div>
          </div>
          <div className="forgot-password-area flex justify-between items-center mb-7">
            <div className="remember-checkbox flex items-center space-x-2.5">
              <input
                type="checkbox"
                className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                name="remember"
              />
              <span className="text-base text-black">Remember Me</span>
            </div>
            <Link href="/forgot_password" className="hover:underline">
              Forgot password
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="bg-[rgb(34,34,34)] text-white mb-3 text-sm w-full h-[50px] font-semibold flex justify-center bg-purple items-center">
              Login
            </button>
            <button
              onClick={() => {
                handleGoogleSignUp();
              }}
              type="button"
              className="bg-[#4285F4] text-white mb-6 text-sm w-full h-[50px] font-semibold flex gap-x-2 justify-center bg-purple items-center">
              <FaGoogle className="w-6 h-6" />
              Sign In With Google
            </button>
          </div>
          <div className="flex justify-center">
            <p className="text-base text-qgraytwo font-normal">
              Dont't have an account ?
              <Link
                href="/signup"
                className="ml-2 text-qblack cursor-pointer capitalize">
                sign up free
              </Link>
            </p>
          </div>
        </form>
        {errorLogin && <div style={{ color: "red" }}>{errorTextLogin}</div>}
        {successLogin && (
          <div style={{ color: "black" }}>{successTextLogin}</div>
        )}
        {loggedinSendVerify && (
          <button
            type="submit"
            style={{
              backgroundColor: "blue",
              borderRadius: "10px",
              margin: "10px 0",
              width: "300px",
              color: "white",
            }}
            onClick={() => {
              sendEmailVerify();
            }}>
            {loggedinSendVerifyText}
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
