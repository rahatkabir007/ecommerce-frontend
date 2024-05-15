import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { IProduct } from "../../../../interfaces/models";
import ProductCardVertical from "../../../shared/SharedProductCard/ProductCardVertical";
interface Props {
  product: IProduct;
}

const TopRatedProduct: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <ProductCardVertical product={props.product} />
};

export default TopRatedProduct;
