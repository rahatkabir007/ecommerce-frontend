import React from "react";
import CategoryPage from "../components/pages/CategoryProductPage/CategoryPage";
import { EcommerceApi } from "../src/API/EcommerceApi";
import { IProduct } from "../interfaces/models";
import SharedHead from "../components/shared/SharedHead/SharedHead";

interface Props {
  filteredProducts: IProduct[];
  count: number;
}

const highlightArr = [
  {
    highlight: "popular_category",
    query: "isPopular",
  },
  {
    highlight: "top_product",
    query: "isTopProduct",
  },
  {
    highlight: "best_product",
    query: "isBestProduct",
  },
  {
    highlight: "new_arrival",
    query: "isNewArrival",
  },
  {
    highlight: "featured_product",
    query: "isFeatured",
  },
];

const products: React.FC<Props> = (props) => {
  return (
    <>
      <SharedHead title="Search Products" />
      <CategoryPage
        filteredProducts={props.filteredProducts}
        count={props.count}
      />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const query = context.query;

  const search = query.search || "";
  const categories = query.category || "";
  const subCategory = query.sub_category || "";
  const brands = query.brand || "";
  const highlight =
    highlightArr.find((high) => high.highlight === query.highlight)?.query ||
    "";
  const min = query.min || 0;
  const max = query.max || 15000;

  const { res, err } = await EcommerceApi.getFilteredProducts(
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
      filteredProducts: res.filteredProducts,
      count: res.count,
      fallback: false,
    },
  };
}

export default products;
