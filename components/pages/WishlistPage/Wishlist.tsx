import { set } from "immer/dist/internal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { controller } from "../../../src/state/StateController";
import SharedEmptyCart from "../../shared/SharedEmptyCart/SharedEmptyCart";
import PageHeader from "../../shared/SharedPageHeader/PageHeader";
import WishlistCart from "./WishlistCart";

interface Props {}

const WishList: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="w-full min-h-screen pb-[5px]">
      {states.wishlistData?.length === 0 ? (
        <>
          <SharedEmptyCart
            slug="wishlist"
            imgURL="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Fempty_wishlist-2022-11-17-11-23-16-9350.png&w=1920&q=75"
          />
        </>
      ) : (
        <>
          <PageHeader slug="Wishlist" link="/wishlist" title="Wishlist" />
          <WishlistCart></WishlistCart>
        </>
      )}
    </div>
  );
};

export default WishList;
