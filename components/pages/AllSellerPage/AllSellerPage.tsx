import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ISeller } from "../../../interfaces/models";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { controller } from "../../../src/state/StateController";
import PageHeader from "../../shared/SharedPageHeader/PageHeader";
import SellerCard from "./SellerCard";

interface Props {}

const AllSellerPage: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const [sellersData, setSellersData] = useState<ISeller[]>([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const fetchAllSeller = async () => {
      const { res, err } = await EcommerceApi.getAllSeller(
        `sortBy=${sortBy}&sortType=${sortType}&search=${searchString}&status=active`
      );
      if (err) {
        console.log(err);
      } else {
        setSellersData(res);
      }
    };
    fetchAllSeller();
  }, [searchString, sortBy, sortType]);

  return (
    <div className="w-full min-h-screen  pt-0 pb-0 ">
      <div>
        <PageHeader slug="All Seller" link="/allseller" title="All Seller" />
      </div>
      <div className="container-x mx-auto w-full mt-[40px] mb-[60px]">
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[20px] gap-5">
          {sellersData.map((seller, index) => (
            <SellerCard key={index} seller={seller}></SellerCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllSellerPage;
