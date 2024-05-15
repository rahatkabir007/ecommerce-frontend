import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";

interface Props {}

const SharedLoginSignupImage: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100 xl:justify-center">
      <div
        className="absolute xl:-right-20 -right-[138px]"
        style={{ top: "calc(50% - 258px)" }}
      >
        <span
          style={{
            boxSizing: "border-box",
            display: "inline-block",
            overflow: "hidden",
            width: "initial",
            height: "initial",
            background: "none",
            opacity: "1",
            border: " 0px",
            margin: " 0px",
            padding: "0px",
            position: "relative",
            maxWidth: "100%",
          }}
        >
          <span
            style={{
              boxSizing: "border-box",
              display: "block",
              width: "initial",
              height: "initial",
              background: "none",
              opacity: "1",
              border: "0px",
              margin: "0px",
              padding: " 0px",
              maxWidth: "100%",
            }}
          >
            <img
              alt=""
              aria-hidden="true"
              src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27608%27%20height=%27480%27/%3e"
              style={{
                display: "block",
                maxWidth: "100%",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: " 1",
                border: "0px",
                margin: "0px",
                padding: "0px",
              }}
            />
          </span>
          <img
            style={{
              position: "absolute",
              inset: "0px",
              boxSizing: "border-box",
              padding: "0px",
              border: " none",
              margin: " auto",
              display: " block",
            }}
            alt="login"
            src="https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fwebsite-images%2Flogin_image-2022-11-17-11-07-21-2774.png&w=640&q=75"
            decoding="async"
            data-nimg="intrinsic"
          />
        </span>
      </div>
    </div>
  );
};

export default SharedLoginSignupImage;
