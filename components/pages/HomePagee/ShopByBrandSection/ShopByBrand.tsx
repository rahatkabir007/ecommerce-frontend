import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";

interface Props {}

const ShopByBrand: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="w-full mt-10">
      <div className="container-x mx-auto pb-[60px]">
        <div>
          <h1 className="sm:text-3xl text-xl font-semibold mb-5">
            Shop by Brand
          </h1>
          <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 ">
            {states.brands.map((brand) => (
              <>
                <Link href={`/products?brand=${brand.slug}`}>
                  <div className="grid bg-white border border-primarygray place-items-center border-gray-200 px-5 h-full">
                    <img className="object-contain" src={brand.logo} alt="" />
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByBrand;
