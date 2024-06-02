import React from "react";
import { useSelector } from "react-redux";
import TrackOrder from "../components/pages/TrackOrder/TrackOrder";
import { controller } from "../src/state/StateController";
import withBuyerPrivate from "../components/hocs/withBuyerPrivate";

interface Props {}

const track_order: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <TrackOrder />;
};

export default withBuyerPrivate(track_order);
