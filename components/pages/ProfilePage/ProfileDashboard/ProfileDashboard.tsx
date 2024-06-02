import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { IOrder, ISeller, IUser } from "../../../../interfaces/models";
import { EcommerceApi } from "../../../../src/API/EcommerceApi";
import {
  DeliveryTruckIcon,
  NewOrdersIcon,
  TotalOrdersIcon,
} from "../../../../src/utils/SvgReturn";

interface Props {
  allOrders: IOrder[];
  allCompletedOrdersLength: number;
  newOrdersLength: number;
  user: IUser | null;
}

const ProfileDashboard: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [sellerData, setSellerData] = useState<ISeller>();

  const getSellerData = async () => {
    if (states.user?.email) {
      const { res, err } = await EcommerceApi.getSellerByUser(
        states.user?.email
      );

      if (err) {
      } else if (res) {
        setSellerData(res);
      }
    }
  };

  useEffect(() => {
    getSellerData();
  }, [states.user?.email]);

  return (
    <div className="item-body dashboard-wrapper w-full">
      <div className="welcome-msg w-full">
        <div>
          <p className="text-qblack md:text-lg">
            Hello, {props.user?.fullName}
          </p>
          <h1 className="font-bold text-lg md:text-[24px] text-qblack">
            Welcome to your Profile
          </h1>
        </div>
      </div>
      <div className="quick-view-grid w-full lg:flex justify-between lg:space-x-2 xl:space-x-0 items-center mt-3 ">
        <div className="qv-item xl:w-[252px] xl:h-[208px] lg:w-1/2 w-full mb-2 md:mb-5 xl:mb-0 bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-2 md:p-6 flex lg:block gap-4">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <NewOrdersIcon />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base md:text-xl text-white group-hover:text-qblacktext mt-1 lg:mt-5">
              New Orders
            </p>
            <span className="text-base md:text-[40px] text-white group-hover:text-qblacktext font-bold leading-none md:mt-1 block">
              {props.newOrdersLength}
            </span>
          </div>
        </div>

        <div className="qv-item xl:w-[252px] xl:h-[208px] lg:w-1/2 w-full mb-2 md:mb-5 xl:mb-0 bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-2 md:p-6 flex lg:block gap-4">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <DeliveryTruckIcon />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base md:text-xl text-white group-hover:text-qblacktext mt-1 lg:mt-5">
              Delivery Completed
            </p>
            <span className="text-base md:text-[40px] text-white group-hover:text-qblacktext font-bold leading-none md:mt-1 block">
              {props.allCompletedOrdersLength}
            </span>
          </div>
        </div>

        <div className="qv-item xl:w-[252px] xl:h-[208px] lg:w-1/2 w-full mb-2 md:mb-5 xl:mb-0 bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-2 md:p-6 flex lg:block gap-4">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <TotalOrdersIcon />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base md:text-xl text-white group-hover:text-qblacktext mt-1 lg:mt-5">
              Total Orders
            </p>
            <span className="text-base md:text-[40px] text-white group-hover:text-qblacktext font-bold leading-none md:mt-1 block">
              {props.allOrders.length}
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard-info mt-6 md:mt-8 xl:flex justify-between justify-items-start bg-primarygray xl:p-7 p-3">
        <div className="mb-4 md:mb-10 xl:mb-0">
          <p className="title md:text-[22px] font-semibold">
            Personal Information
          </p>
          <div className="mt-2 md:mt-5">
            <table>
              <tbody>
                <tr className="flex mb-2 md:mb-5">
                  <td className="text-sm md:text-base text-qgraytwo w-[75px] block capitalize">
                    <p>Name:</p>
                  </td>
                  <td className="text-sm md:text-base text-qblack font-medium">
                    {props.user?.fullName}
                  </td>
                </tr>
                <tr className="flex mb-2 md:mb-5">
                  <td className="text-sm md:text-base text-qgraytwo w-[75px] block capitalize">
                    <p>Email:</p>
                  </td>
                  <td className="text-sm md:text-base text-qblack font-medium">
                    {props.user?.email}
                  </td>
                </tr>
                <tr className="flex mb-2 md:mb-5">
                  <td className="text-sm md:text-base text-qgraytwo w-[75px] block capitalize">
                    <p>phone:</p>
                  </td>
                  <td className="text-sm md:text-base text-qblack font-medium">
                    {props.user?.phone}
                  </td>
                </tr>
                <tr className="flex mb-2 md:mb-5">
                  <td className="text-sm md:text-base text-qgraytwo w-[75px] block capitalize">
                    <p>Address:</p>
                  </td>
                  <td className="text-sm md:text-base text-qblack font-medium">
                    {props.user?.address?.address}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {sellerData && (
          <>
            <div className="w-[1px] h-0 lg:h-[164px] bg-[#E4E4E4]"></div>
            <div className="ml-0 md:ml-6">
              <p className="title md:text-[22px] font-semibold">
                Shop Information
              </p>
              <div className="mt-2 md:mt-5">
                <table>
                  <tbody>
                    <tr className="flex mb-2 md:mb-5">
                      <td className="text-sm md:text-base text-qgraytwo w-[75px] block capitalize">
                        <p>Name:</p>
                      </td>
                      <td className="text-sm md:text-base text-qblack font-medium">
                        {sellerData.shop?.shop_name}
                      </td>
                    </tr>
                    <tr className="flex mb-2 md:mb-5">
                      <td className="text-sm md:text-base text-qgraytwo w-[75px] block capitalize">
                        <p>Email:</p>
                      </td>
                      <td className="text-sm md:text-base text-qblack font-medium">
                        {sellerData.email}
                      </td>
                    </tr>
                    <tr className="flex mb-2 md:mb-5">
                      <td className="text-sm md:text-base text-qgraytwo w-[75px] block capitalize">
                        <p>phone:</p>
                      </td>
                      <td className="text-sm md:text-base text-qblack font-medium">
                        {sellerData.phone}
                      </td>
                    </tr>
                    <tr className="flex mb-2 md:mb-5">
                      <td className="text-sm md:text-base text-qgraytwo w-[75px] block capitalize">
                        <p>Address:</p>
                      </td>
                      <td className="text-sm md:text-base text-qblack font-medium max-w-[170px]">
                        {sellerData.shop?.shop_address}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;
