import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../src/state/StateController";
import Link from "next/link";
import SharedHead from "../components/shared/SharedHead/SharedHead";

interface Props {}

const ErrorPage: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <>
      <SharedHead title="Page Not Found" />
      <div className="mb-16 mt-10 min-h-[70vh] grid place-items-center">
        <div>
          <h1 className="text-5xl text-center font-extrabold text-qred">404</h1>

          <div className="flex justify-center items-center mb-12">
            <div>
              <img
                src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2F%2Fuploads%2Fwebsite-images%2Fempty_cart-2022-11-17-11-10-20-7795.png&w=1920&q=75"
                alt=""
              />
            </div>
          </div>

          <div className="flex  justify-center">
            <h1 className="sm:text-xl text-base font-semibold text-center mb-5">
              Sorry, Page Not Found!!!
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <Link href="/">
              <div className="w-[120px] md:w-[180px] h-[36px] md:h-[50px] ">
                <button className="yellow-btn ">Back to Shop</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
