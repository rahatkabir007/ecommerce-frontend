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

interface Props {}

const ProfileDashboardRenderer: React.FC<Props> = (props) => {
  const loggedInUser = useSelector(() => controller.states.user);
  const [allOrders, setAllOrders] = useState<IOrder[]>([]);
  const [allCompletedOrdersLength, setAllCompletedOrdersLength] = useState(0);
  const [newOrdersLength, setNewOrdersLength] = useState(0);

  const { asPath } = useRouter();

  const hash = asPath.split("#")[1];

  useEffect(() => {
    const getAllOrders = async () => {
      if (loggedInUser) {
        const { res, err } = await EcommerceApi.allOrders(loggedInUser.slug);
        if (res) {
          setAllOrders(res.data);

          const completedOrders = res.data.filter(
            (dt) => dt.order_status === "completed"
          );
          setAllCompletedOrdersLength(completedOrders.length);

          const newOrders = res.data.filter((ord) => {
            const ordDate =
              new Date(ord.createdAt as string).getTime() +
              2 * 24 * 60 * 60 * 1000;

            const todayDate = new Date().getTime();

            if (todayDate <= ordDate) {
              return ord;
            }
          });

          setNewOrdersLength(newOrders.length);
        }
      }
    };

    getAllOrders();
  }, [loggedInUser]);

  switch (hash) {
    case "dashboard": {
      return (
        <ProfileDashboard
          user={loggedInUser}
          allCompletedOrdersLength={allCompletedOrdersLength}
          newOrdersLength={newOrdersLength}
          allOrders={allOrders}
        />
      );
    }
    case "personal_info": {
      return <PersonalInfo />;
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
          allCompletedOrdersLength={allCompletedOrdersLength}
          newOrdersLength={newOrdersLength}
          allOrders={allOrders}
        />
      );
    }
  }
};

export default ProfileDashboardRenderer;
