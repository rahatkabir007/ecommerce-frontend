import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";

interface Props {
  slug: string;
  imgURL: string;
}

const SharedEmptyCart: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const { slug, imgURL } = props;

  return (
    <div className="mb-16 mt-10">
      <div className="container-x mx-auto hidden md:block">
        <div className="font-400 text-[13px] text-qblack mb-[23px] print:hidden">
          <span>
            <Link href="/">
              <span className="mx-1 capitalize">home</span>
            </Link>
            <span className="seperator">/</span>
          </span>
          <span>
            <Link href="/">
              <span className="mx-1 capitalize">{slug}</span>
            </Link>
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center mb-12">
        <div>
          <img src={imgURL} alt="" />
        </div>
      </div>

      <div className="flex  justify-center">
        <h1 className="sm:text-xl text-base font-semibold text-center mb-5">
          Empty! You don't have any <span className="capitalize">{slug} </span>
          products
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <Link href="/">
          <div className="w-[180px] h-[50px] ">
            <button className="yellow-btn ">Back to Shop</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SharedEmptyCart;
