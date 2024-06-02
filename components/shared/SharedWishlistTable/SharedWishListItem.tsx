import React from "react";
import { useSelector } from "react-redux";
import { IProduct } from "../../../interfaces/models";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import { controller } from "./../../../src/state/StateController";
interface Props {
  width: null | number;
  item: IProduct;
  deleteWishlistProduct: Function;
}

const SharedWishListItem: React.FC<Props> = ({
  width,
  item,
  deleteWishlistProduct,
}) => {
  const states = useSelector(() => controller.states);

  return (
    <tr
      key={item.slug}
      className={
        width && width > 640
          ? "border-b"
          : "flex mb-2 border" +
            " bg-white hover:bg-gray-50 relative overflow-hidden"
      }
    >
      <td
        width="60%"
        className={
          width && width > 640
            ? "pl-10 py-4 w-[380px]"
            : "w-full p-2" + " capitalize"
        }
      >
        <div className="flex gap-x-4 md:gap-x-6 md:items-center">
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
            <p className="font-semibold md:font-medium text-[15px] text-qblack hover:text-blue-500 cursor-pointer capitalize mt-4 line-clamp-1">
              {item.productName}
            </p>
          </div>
        </div>
      </td>

      <td
        width={150}
        className={
          width && width > 640
            ? "text-center py-4 capitalize px-2"
            : "absolute left-[103px] top-[47px] text-qred"
        }
      >
        <div className="md:flex space-x-1 items-center justify-center">
          <span className="text-sm md:text-[15px] font-semibold md:font-normal">
            $ {item.offerPrice ? item.offerPrice : item.price}
          </span>
        </div>
      </td>

      <td
        width={60}
        className={
          width && width > 640
            ? "text-right py-4 capitalize"
            : "absolute -right-[13px] top-[10px]"
        }
      >
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
