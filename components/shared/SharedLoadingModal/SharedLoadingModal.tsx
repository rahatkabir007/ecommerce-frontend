import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import styled from "./SharedLoadingModal.module.css";

interface Props { }

const SharedLoadingModal: React.FC<Props> = (props) => {
  const loading = useSelector(() => controller.states.apiLoading);

  return (
    <>
      {loading && (
        <></>
      )}
    </>
  );
};

export default SharedLoadingModal;
