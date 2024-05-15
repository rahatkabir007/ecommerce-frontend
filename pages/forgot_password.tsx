import React from "react";
import { useSelector } from "react-redux";
import ForgetPassword from "../components/pages/ForgetPassword/ForgetPassword";
import { controller } from "../src/state/StateController";

interface Props {}

const forgot_password: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <ForgetPassword />;
};

export default forgot_password;
