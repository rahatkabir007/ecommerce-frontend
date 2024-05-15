import React from "react";
import { useSelector } from "react-redux";
import { IProduct, IWishlistProduct } from "../../../interfaces/models";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { CookiesHandler } from "../../../src/utils/CookiesHandler";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import { controller } from "./../../../src/state/StateController";

interface Props {
  item: IProduct;
}

const user_slug = CookiesHandler.getSlug();

const SharedWishListItem: React.FC<Props> = ({ item }) => {
  const states = useSelector(() => controller.states);

  const deleteWishlistProduct = async (product: IWishlistProduct) => {
    if (user_slug) {
      product.user_slug = user_slug;
      const { res, err } = await EcommerceApi.deleteWishlistSingleProduct(
        product.slug,
        product.user_slug
      );
      if (err) {
      } else {
        controller.setRemoveWishlistSingleProduct(product);
      }
    } else {
      alert("Please login first");
    }
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="pl-10 py-4 capitalize w-[380px] ">
        <div className="flex space-x-6 rtl:space-x-reverse items-center">
          <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED] relative">
            <span
              style={{
                boxSizing: "border-box",
                display: "block",
                overflow: "hidden",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: 1,
                border: 0,
                margin: 0,
                padding: 0,
                position: "absolute",
                inset: 0,
              }}
            >
              <picture>
                {item && item?.imageURL?.length > 0 && (
                  <img
                    alt="product"
                    src={item?.imageURL[0]}
                    decoding="async"
                    data-nimg="fill"
                    className="w-full h-full object-contain"
                    style={{
                      position: "absolute",
                      inset: 0,
                      boxSizing: "border-box",
                      padding: 0,
                      border: "none",
                      margin: "auto",
                      display: "block",
                      width: 0,
                      height: 0,
                      minWidth: "100%",
                      maxWidth: "100%",
                      minHeight: "100%",
                      maxHeight: "100%",
                    }}
                    sizes="100vw"
                  />
                )}
              </picture>
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <p className="font-medium text-[15px] text-qblack hover:text-blue-500 cursor-pointer capitalize">
              {item.productName}
            </p>
          </div>
        </div>
      </td>
      <td className="text-center py-4 capitalize px-2">
        <div className="flex space-x-1 items-center justify-center">
          <span className="text-[15px] font-normal">
            $ {item.offerPrice ? item.offerPrice : item.price}
          </span>
        </div>
      </td>
      <td className="text-right py-4 capitalize">
        <div
          className="flex space-x-1 items-center justify-center"
          onClick={() => deleteWishlistProduct(item)}
        >
          <span className="cursor-pointer">
            <SvgIconRenderer
              width="12"
              height="12"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
              path={SvgPaths.xrossIcon}
              pathFill="#AAAAAA"
            />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default SharedWishListItem;
