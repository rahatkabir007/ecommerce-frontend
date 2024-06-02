import React from "react";
import { useSelector } from "react-redux";
import { controller } from "./../../../src/state/StateController";
import SharedWishListItem from "./SharedWishListItem";
import { IWishlistProduct } from "../../../interfaces/models";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { toast } from "react-hot-toast";
import useWindowDimensions from "../hooks/useWindowDimensions";

interface Props {}

const SharedWishlistTable: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const user = useSelector(() => controller.states.user);
  const user_slug = user?.slug;

  const { height, width } = useWindowDimensions();

  const deleteWishlistProduct = async (product: IWishlistProduct) => {
    controller.setApiLoading(true);
    if (user_slug) {
      product.user_slug = user_slug;
      const { res, err } = await EcommerceApi.deleteWishlistSingleProduct(
        product.slug,
        product.user_slug
      );
      if (err) {
      } else {
        toast.success("Item Removed From Wishlist");
        controller.setRemoveWishlistSingleProduct(product);
      }
    } else {
      toast.error("Please login first");
    }
    controller.setApiLoading(false);
  };

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <tbody>
        <tr
          className={
            width && width > 640
              ? "text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase"
              : "hidden"
          }
        >
          <td className="py-4 capitalize pl-10 block whitespace-nowrap">
            Product
          </td>
          <td className="py-4 capitalize whitespace-nowrap text-center">
            Price
          </td>
          <td className="py-4 capitalize whitespace-nowrap text-center block">
            Action
          </td>
        </tr>
        {states.wishlistData?.map((item, i) => (
          <SharedWishListItem
          width={width}
            item={item}
            deleteWishlistProduct={deleteWishlistProduct}
            key={i}
          />
        ))}
      </tbody>
    </table>
  );
};

export default SharedWishlistTable;
