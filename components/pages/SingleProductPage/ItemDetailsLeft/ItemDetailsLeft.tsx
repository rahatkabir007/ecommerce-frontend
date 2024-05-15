import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { IProduct } from "../../../../interfaces/models";
import SingleProduct from "../SingleProduct";

interface Props {
  singleProduct: IProduct | null;
}

const ItemDetailsLeft: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  // const images = [
  //   "https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fcustom-images%2Fasus-zenbook-desktop-2022-09-26-12-33-24-3339.png&w=2048&q=75",
  //   "https://shopo-ecom.vercel.app/_next/image?url=https%3A%2F%2Fapi.websolutionus.com%2Fshopo%2Fuploads%2Fcustom-images%2Fjbl-clip-4-orange-portable-speaker-2022-09-27-03-24-27-9922.png&w=1920&q=75",
  // ];

  const [image, setImage] = useState(props.singleProduct?.imageURL[0]);
  const imageChange = (newImage: string) => {
    setImage(newImage);
  };
  return (
    <div className="w-full">
      <div className="w-full md:h-[600px] h-[350px] border border-qgray-border flex justify-center items-center overflow-hidden mb-3 relative">
        <span
          style={{
            boxSizing: "border-box",
            display: " block",
            overflow: "hidden",
            width: "initial",
            height: "initial",
            background: "none",
            opacity: "1",
            border: "0px",
            margin: "0px",
            padding: "0px",
            position: "absolute",
            inset: "0px",
          }}
        >
          <img
            alt=""
            sizes="100vw"
            src={image ? image : props.singleProduct?.imageURL[0]}
            decoding="async"
            data-nimg="fill"
            className="object-contain transform scale-110"
            style={{
              position: "absolute",
              inset: "0px",
              padding: "0px",
              border: "none",
              margin: "auto",
              display: "block",
              width: " 0px",
              height: "0px",
              minWidth: "100%",
              maxWidth: "100%",
              minHeight: "100%",
              maxHeight: "100%",
              objectFit: "scale-down",
            }}
          ></img>
        </span>
        <div className="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
          <span className="text-tblack">-5%</span>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {props.singleProduct?.imageURL.map((img: any) => (
          <div className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer relative">
            <span
              style={{
                width: "initial",
                height: "initial",
                background: "none",
                inset: "0px",
              }}
              className={`block overflow-hidden ${
                image !== img ? "opacity-80" : ""
              } absolute`}
            >
              <img
                onClick={() => imageChange(img)}
                alt=""
                src={img}
                sizes="100vw"
                decoding="async"
                data-nimg="fill"
                className="w-full h-full object-contain transform scale-110 absolute m-auto block max-w-full min-w-full min-h-full max-h-full "
              ></img>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetailsLeft;
