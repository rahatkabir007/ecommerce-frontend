import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { controller } from "../../../../src/state/StateController";
import { Jsondata } from "../../../../src/utils/Jsondata";
import ProductCard from "../../../shared/SharedProductCard/ProductCard";
import SectionHeader from "../SectionHeader";
import { IFeaturedCategories } from "../../../../interfaces/models";
import { EcommerceApi } from "../../../../src/API/EcommerceApi";

interface Props {}

const FeaturedCategory: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [featuredCategoriesData, setFeaturedCategoriesData] = useState<
    IFeaturedCategories[]
  >([]);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const fetchAllPopularCategoriesData = async () => {
      const { res, err } = await EcommerceApi.allFeaturedCategories();
      if (err) {
        console.log(err);
      } else {
        setSlug(res[0]?.cat_slug);
        setFeaturedCategoriesData(res);

        // console.log(res);
      }
    };
    fetchAllPopularCategoriesData();
  }, []);

  return (
    <div>
      <div className="section-wrapper w-full md:mb-[60px] mb-[30px]">
        <div className="container-x mx-auto">
          <SectionHeader
            title="Featured Category"
            link="/products?highlight=featured_product"
          />
          <div className="section-content">
            <div className="products-section w-full">
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
                <div className="category-card hidden xl:block w-full">
                  <div
                    className="category-card-wrappwer w-full h-[445px] p-[30px]"
                    style={{
                      background:
                        "url(https://api.websolutionus.com/shopo/uploads/website-images/featured-cat-banner-2022-09-21-02-43-49-4710.jpg) 0% 0% / cover no-repeat",
                    }}
                  >
                    <div>
                      <h1 className="text-base font-semibold tracking-wide mb-2">
                        Featured Category
                      </h1>
                      <div className="brands-list mb-[7px]">
                        <ul>
                          {featuredCategoriesData.map((singlePop) => (
                            <>
                              <li>
                                <span
                                  onClick={() => setSlug(singlePop?.cat_slug)}
                                  className="text-sm text-qgray hober:text-qBlack border-b border-transparent hover:border-qblack hover:text-qblack capitalize cursor-pointer"
                                >
                                  {singlePop.cat_name}
                                </span>
                              </li>
                            </>
                          ))}
                          {/* <li>
                            <span
                              onClick={() => setSlug("mobile_slug")}
                              className="text-sm text-qgray hober:text-qBlack border-b border-transparent hover:border-qblack hover:text-qblack capitalize cursor-pointer"
                            >
                              Mobile
                            </span>
                          </li> */}
                          {/* <li>
                            <span
                              onClick={() => setSlug("electronics_slug")}
                              className="text-sm text-qgray hober:text-qBlack border-b border-transparent hover:border-qblack hover:text-qblack capitalize cursor-pointer">
                              Electronics
                            </span>
                          </li>
                          <li>
                            <span
                              onClick={() => setSlug("game_slug")}
                              className="text-sm text-qgray hober:text-qBlack border-b border-transparent hover:border-qblack hover:text-qblack capitalize cursor-pointer">
                              Game
                            </span>
                          </li> */}
                        </ul>
                      </div>
                      <div className="flex space-x-2 items-center">
                        <span className=" text-qblack font-semibold text-sm">
                          Shop Now
                        </span>
                        <span>
                          <svg
                            width="7"
                            height="11"
                            viewBox="0 0 7 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="2.08984"
                              y="0.636719"
                              width="6.94219"
                              height="1.54271"
                              transform="rotate(45 2.08984 0.636719)"
                              fill="#1D1D1D"
                            ></rect>
                            <rect
                              x="7"
                              y="5.54492"
                              width="6.94219"
                              height="1.54271"
                              transform="rotate(135 7 5.54492)"
                              fill="#1D1D1D"
                            ></rect>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {states.allProducts
                  .filter((product) => product.catSlug === slug)
                  .slice(0, 3)
                  .map((pro) => (
                    <ProductCard product={pro}></ProductCard>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategory;
