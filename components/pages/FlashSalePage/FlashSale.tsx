import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import ProductCard from "../../shared/SharedProductCard/ProductCard";
import { IFlashSale, IFlashSaleProducts } from "../../../interfaces/models";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import CountDown from "./CountDown";
interface Props {}

const FlashSale: React.FC<Props> = (props) => {
  // const states = useSelector(() => controller.states);
  const [saleData, setSaleData] = useState<IFlashSale>();
  const [flashSaleData, setFlashSaleData] = useState<IFlashSaleProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [outputTime, setOutputTime] = useState("");

  useEffect(() => {
    const fetchAllflashData = async () => {
      const { res, err } = await EcommerceApi.getFlashSaleContent(
        "flashcontnet"
      );
      if (err) {
        console.log(err);
      } else {
        setSaleData(res);
        const date = new Date(res.time);
        const outputDate = date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        setOutputTime(outputDate);
        setLoading(false);
      }
    };
    fetchAllflashData();
  }, [flashSaleData]);

  useEffect(() => {
    const fetchAllFlashSalesData = async () => {
      const { res, err } = await EcommerceApi.getFlashSaleProductsData();
      if (err) {
        console.log(err);
      } else {
        setFlashSaleData(res);
      }
    };
    fetchAllFlashSalesData();
  }, []);

  return (
    <div className="w-full min-h-screen mt-1 md:mt-10 pt-0 pb-0">
      <div className="container-x mx-auto">
        <div
          style={{
            backgroundImage: `url(${saleData?.imageFlash})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="flash-ad w-full h-[400px] flex sm:justify-end justify-center items-center mb-3 md:mb-10 aos-init aos-animate"
        >
          {!loading && outputTime && <CountDown outputTime={outputTime} />}
        </div>
        <div className="section-content mb-10">
          <div className="products-section w-full">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 xl:gap-[30px] md:gap-5 gap-2">
              {flashSaleData.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product.productsData}
                  grid={true}
                ></ProductCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
