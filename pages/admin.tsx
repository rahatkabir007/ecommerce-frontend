import React from "react";
import { useSelector } from "react-redux";
import AdminPage from "../components/pages/AdminPage/AdminPage";
import { controller } from "../src/state/StateController";

interface Props {}

const admin: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <AdminPage />;
};

export default admin;
