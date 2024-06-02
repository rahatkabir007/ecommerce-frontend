import React from "react";
import { useSelector } from "react-redux";
import SellerProducts from "../components/pages/AllSellerPage/SellerProducts";
import { controller } from "../src/state/StateController";
import { EcommerceApi } from "../src/API/EcommerceApi";
import { IProduct, ISeller } from "../interfaces/models";
import SharedHead from "../components/shared/SharedHead/SharedHead";

interface Props {
  sellerData: ISeller;
  filteredProducts: IProduct[];
  count: number;
}

const seller_products: React.FC<Props> = ({
  sellerData,
  filteredProducts,
  count,
}) => {
  const states = useSelector(() => controller.states);

  return (
    <>
      <SharedHead title={sellerData?.shop?.shop_name} />
      <SellerProducts
        sellerData={sellerData}
        filteredProducts={filteredProducts}
        count={count}
      />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const query = context.query;

  const seller = query.seller || "";
  const search = query.search || "";
  const categories = query.category || "";
  const subCategory = query.sub_category || "";
  const brands = query.brand || "";
  const highlight = "";
  const min = query.min || 0;
  const max = query.max || 15000;

  const { res, err } = await EcommerceApi.getFilteredProductsBySeller(
    seller,
    search,
    categories,
    subCategory,
    brands,
    highlight,
    min,
    max
  );

  return {
    props: {
      sellerData: res.sellerData,
      filteredProducts: res.filteredProducts,
      count: res.count,
      fallback: false,
    },
  };
}

export default seller_products;
