import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import Breadcrumb from "../../shared/SharedBreadcrumb/Breadcrumb";
import Link from "next/link";
import ProfileDashboardRenderer from "./ProfileDashboardRenderer";
import { SocialLogin } from "../../helpers/SocialLogin";
import {
  AddressIcon,
  ChangePassIcon,
  DashboardIcon,
  LogOutIcon,
  OrderIcon,
  PersonalInfoIcon,
  ReviewIcon,
  WishlistIcon,
} from "../../../src/utils/SvgReturn";

interface Props {}

const ProfilePage: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const signOut = async () => {
    await SocialLogin.logOut();
    controller.setAllCartListData([]);
    controller.setAllWishlistData([]);
    controller.setUser(null);
  };

  return (
    <div className="min-h-screen container-x mx-auto">
      <div className="my-2 md:my-10">
        <div className="font-normal text-[13px] text-qblack mb-[23px] hidden md:block">
          <Breadcrumb slug="Profile" link="/profile" />
        </div>

        <div className="bg-white xl:p-10 p-2 md:p-5">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-lg md:text-[22px] font-bold text-qblack">
              Your Dashboard
            </h1>
          </div>

          <div className="w-full mt-4 md:mt-8 xl:flex xl:gap-x-10">
            <div className="xl:w-[236px] xl:min-h-[600px] xl:border-r border-[rgba(0, 0, 0, 0.1)] mb-7 md:mb-10 xl:mb-0">
              <div className="flex xl:flex-col flex-row xl:space-y-10 flex-wrap gap-3 xl:gap-0">
                <div className="group">
                  <Link
                    href="/profile#dashboard"
                    className="flex gap-x-3 items-center text-qgray hover:text-qblack capitalize"
                  >
                    <DashboardIcon />
                    <span className="font-normal text-sm md:text-base capitalize cursor-pointer">
                      Dashboard
                    </span>
                  </Link>
                </div>
                <div className="group">
                  <Link
                    href="/profile#personal_info"
                    className="flex gap-x-3 items-center text-qgray hover:text-qblack capitalize"
                  >
                    <PersonalInfoIcon />
                    <span className="font-normal text-sm md:text-base capitalize cursor-pointer">
                      Personal Info
                    </span>
                  </Link>
                </div>
                <div className="group">
                  <Link
                    href="/profile#order"
                    className="flex gap-x-3 items-center text-qgray hover:text-qblack capitalize"
                  >
                    <OrderIcon />
                    <span className="font-normal text-sm md:text-base capitalize cursor-pointer">
                      Order
                    </span>
                  </Link>
                </div>
                <div className="group">
                  <Link
                    href="/profile#wishlist"
                    className="flex gap-x-3 items-center text-qgray hover:text-qblack capitalize"
                  >
                    <WishlistIcon />
                    <span className="font-normal text-sm md:text-base capitalize cursor-pointer">
                      Wishlist
                    </span>
                  </Link>
                </div>
                <div className="group">
                  <Link
                    href="/profile#address"
                    className="flex gap-x-3 items-center text-qgray hover:text-qblack capitalize"
                  >
                    <AddressIcon />
                    <span className="font-normal text-sm md:text-base capitalize cursor-pointer">
                      Address
                    </span>
                  </Link>
                </div>
                <div className="group">
                  <Link
                    href="/profile#reviews"
                    className="flex gap-x-3 items-center text-qgray hover:text-qblack capitalize"
                  >
                    <ReviewIcon />
                    <span className="font-normal text-sm md:text-base capitalize cursor-pointer">
                      Reviews
                    </span>
                  </Link>
                </div>
                <div className="group">
                  <Link
                    href="/profile#change_password"
                    className="flex gap-x-3 items-center text-qgray hover:text-qblack capitalize"
                  >
                    <ChangePassIcon />
                    <span className="font-normal text-sm md:text-base capitalize cursor-pointer">
                      Change Password
                    </span>
                  </Link>
                </div>

                <div className="group">
                  <div
                    onClick={() => signOut()}
                    className="flex gap-x-3 items-center text-qgray hover:text-qblack capitalize  cursor-pointer"
                  >
                    <span>
                      <LogOutIcon />
                    </span>
                    <span className="font-normal text-sm md:text-base capitalize">
                      Logout
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <ProfileDashboardRenderer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
