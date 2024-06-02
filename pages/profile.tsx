import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { controller } from "../src/state/StateController";
import ProfilePage from "../components/pages/ProfilePage/ProfilePage";
import withBuyerPrivate from "../components/hocs/withBuyerPrivate";
import { NextPage } from "next";
import SharedLoadingModal from "../components/shared/SharedLoadingModal/SharedLoadingModal";

interface Props {}

const Profile: NextPage<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      
    } else {
      setMounted(true);
    }
  }, [isMounted]);

  if (!isMounted) return <SharedLoadingModal />;

  return <ProfilePage />;
};

export default withBuyerPrivate(Profile);
