import React from "react";
import { useSelector } from "react-redux";
import PrivacyPolicy from "../components/pages/PrivacyPolicyPage/PrivacyPolicy";
import { controller } from "../src/state/StateController";

interface Props {}

const privacy_policy: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <PrivacyPolicy />;
};

export default privacy_policy;
