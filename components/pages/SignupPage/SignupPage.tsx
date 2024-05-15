import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import SharedLoginSignupImage from "../../shared/SharedLoginSignupImage/SharedLoginSignupImage";
import Signup from "./Signup";


interface Props { }

const SignupPage: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="w-full min-h-screen  pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative w-full lg:min-h-[700px]">
            <Signup />
            <SharedLoginSignupImage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
