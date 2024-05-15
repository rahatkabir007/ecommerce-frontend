import React from "react";
import { useSelector } from "react-redux";
import TrackOrder from "../components/pages/TrackOrder/TrackOrder";
import { controller } from "../src/state/StateController";

interface Props {}

const track_order: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <TrackOrder />;
};

export default track_order;
