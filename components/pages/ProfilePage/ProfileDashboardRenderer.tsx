import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import ChangePassword from "./ChangePassword/ChangePassword";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import ProfileAddress from "./ProfileAddress/ProfileAddress";
import ProfileDashboard from "./ProfileDashboard/ProfileDashboard";
import ProfileOrder from "./ProfileOrder/ProfileOrder";
import ProfileReviews from "./ProfileReviews/ProfileReviews";
import ProfileWishlist from "./ProfileWishlist/ProfileWishlist";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { IOrder } from "../../../interfaces/models";
import { CookiesHandler } from "../../../src/utils/CookiesHandler";

interface Props {}

const ProfileDashboardRenderer: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [allOrders, setAllOrders] = useState<IOrder[]>([]);
  const [allCompletedOrders, setAllCompletedOrders] = useState<IOrder[]>([]);

  const { asPath } = useRouter();
  const user_slug = CookiesHandler.getSlug();
  const hash = asPath.split("#")[1];
  const loggedInUser = states.user;
  
  useEffect(() => {
    const getAllOrders = async () => {
      const { res, err } = await EcommerceApi.allOrders(user_slug);
      console.log(res);
      console.log(err);
      if (res) {
        setAllOrders(res.data);
        const completedOrders = res.data.filter(
          (dt) => dt.order_status === "completed"
        );
        setAllCompletedOrders(completedOrders);
      }
    };

    getAllOrders();
  }, []);
  switch (hash) {
    case "dashboard": {
      return (
        <ProfileDashboard
          user={loggedInUser}
          allCompletedOrders={allCompletedOrders}
          allOrders={allOrders}
        />
      );
    }
    case "personal_info": {
      return <PersonalInfo user={loggedInUser} />;
    }
    case "order": {
      return <ProfileOrder orders={allOrders} />;
    }
    case "wishlist": {
      return <ProfileWishlist />;
    }
    case "address": {
      return <ProfileAddress />;
    }
    case "reviews": {
      return <ProfileReviews />;
    }
    case "change_password": {
      return <ChangePassword />;
    }
    default: {
      return (
        <ProfileDashboard
          user={loggedInUser}
          allCompletedOrders={allCompletedOrders}
          allOrders={allOrders}
        />
      );
    }
  }
};

export default ProfileDashboardRenderer;
