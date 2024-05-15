import React from "react";
import { useSelector } from "react-redux";
import ViewOrderDetails from "../../components/pages/ViewOrderDetails/ViewOrderDetails";
import { controller } from "../../src/state/StateController";

interface Props {}

const ViewOrder: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <ViewOrderDetails />;
};

export default ViewOrder;
