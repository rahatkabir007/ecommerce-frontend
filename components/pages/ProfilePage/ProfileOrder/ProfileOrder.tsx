import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { IOrder } from "../../../../interfaces/models";
import { controller } from "../../../../src/state/StateController";
import { CartHandler } from "../../../../src/utils/CartHandler";
import useWindowDimensions from "../../../shared/hooks/useWindowDimensions";

interface Props {
  orders: IOrder[];
}

const ProfileOrder: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const { height, width } = useWindowDimensions();

  if (props.orders.length === 0) {
    return (
      <div>
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
            Empty! You don't have any{" "}
            <span className="capitalize"> orders </span>
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
  }

  return (
    <div className="relative w-full overflow-x-auto sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr
            className={
              width && width > 640
                ? "text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom "
                : "hidden"
            }
          >
            <td className="py-4 block whitespace-nowrap text-center">Order</td>
            <td className="py-4 whitespace-nowrap text-center">Date</td>
            <td className="py-4 whitespace-nowrap text-center">Amount</td>
            <td className="py-4 whitespace-nowrap text-center">Action</td>
          </tr>
          {props.orders.length !== 0 &&
            props.orders.map((order: IOrder) => (
              <tr
                className={
                  width && width > 640
                    ? "bg-white border-b hover:bg-gray-50"
                    : " relative overflow-hidden h-32 border mb-2"
                }
              >
                <td
                  className={
                    width && width > 640
                      ? "text-center py-4"
                      : "absolute top-[34px] left-2"
                  }
                >
                  <span className="md:hidden">Tracking number: </span>
                  <span className="text-sm md:text-lg text-qblack font-semibold md:font-medium">
                    {order.slug}
                  </span>
                </td>

                <td
                  className={
                    width && width > 640
                      ? "text-center py-4"
                      : "absolute top-2 left-2"
                  }
                >
                  <span className="text-xs md:text-base text-qgray whitespace-nowrap">
                    {order.createdAt && order.createdAt.split("T")[0]}
                  </span>
                </td>

                <td
                  className={
                    width && width > 640
                      ? "text-center py-4 px-2"
                      : "absolute top-[60px] left-2"
                  }
                >
                  <span className="md:hidden">Total Amount: </span>
                  <span className="text-sm md:text-base font-semibold md:font-normal text-qblack whitespace-nowrap px-2 ">
                    ${order.total}
                  </span>
                </td>

                <td
                  className={
                    width && width > 640
                      ? "py-4 flex justify-center"
                      : "absolute top-[88px] left-2"
                  }
                >
                  <div className="flex space-x-2 items-center">
                    <Link
                      href={`/order/${order.slug}`}
                      className="w-[116px] h-7 md:h-[46px] bg-qyellow text-qblack font-bold flex justify-center items-center cursor-pointer"
                    >
                      <span>View Details</span>
                    </Link>
                  </div>
                </td>

                <td
                  className={
                    width && width > 640
                      ? "hidden"
                      : "absolute top-[88px] right-4"
                  }
                >
                  <span className="text-sm md:text-base text-qgray whitespace-nowrap capitalize">
                    {order.order_status}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileOrder;
