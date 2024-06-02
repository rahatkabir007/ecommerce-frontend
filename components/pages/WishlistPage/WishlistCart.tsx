import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import Styles from "./WishlistCart.module.css";
import SharedWishlistTable from "./../../shared/SharedWishlistTable/SharedWishlistTable";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { CookiesHandler } from "../../../src/utils/CookiesHandler";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface Props {}

const user_slug = CookiesHandler.getSlug();

const WishlistCart: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const setClearWishlist = async () => {
    controller.setApiLoading(true);
    if (user_slug) {
      const { res, err } = await EcommerceApi.deleteAllWishlistProduct(
        user_slug
      );
      if (err) {
        console.log(err);
      } else {
        toast.success("Wishlish Cleared");
        controller.setClearWishlist();
      }
    }
    controller.setApiLoading(false);
  };

  return (
    <div className="md:bg-white mt-1 md:mt-0 pt-0 pb-4 md:py-6">
      <div className="w-full">
        <div className="container-x mx-auto">
          <div className="w-full mb-[30px]">
            <div className="relative w-full overflow-x-auto md:border border-[#EDEDED]">
              <SharedWishlistTable />
            </div>
            <div className="w-full mt-[30px] flex justify-end">
              <div className="sm:flex sm:space-x-[30px] items-center">
                <button type="button" onClick={setClearWishlist}>
                  <span className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
                    Clean Wishlist
                  </span>
                </button>
                <Link
                  href="/cart"
                  className={`${Styles["yellow-btn"]}  w-[180px] h-[50px] justify-center items-center cursor-pointer hidden md:flex`}
                >
                  <span className="w-full text-sm font-semibold text-center">
                    View Cart
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCart;
