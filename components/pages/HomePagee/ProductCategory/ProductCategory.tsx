import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import styles from "./ProductCategory.module.css";
import SharedSlider from "../../../shared/SharedSlider/SharedSlider";
import { SplideSlide } from "@splidejs/react-splide";
import { ICategories } from "../../../../interfaces/models";
interface Props {}

const ProductCategory: React.FC<Props> = (props) => {
  const categoriesData = useSelector(() => controller.states.categories);

  return (
    <div className="category-section-wrapper w-full hidden md:block">
      <div className="container-x mx-auto pb-[50px]">
        <div>
          
          <SharedSlider items={6}>

            {categoriesData.map((item: ICategories, index) => {
              return (
                <SplideSlide>
                  <div
                    key={item.cat_slug}
                    className="item w-full cursor-pointer group"
                  >
                    <Link
                      href={`products?category=%2B${item?.cat_slug}`}
                      rel="noopener noreferrer"
                    >
                      <div className="w-full h-[120px] relative rounded bg-white flex justify-center items-center">
                        <div className="w-full h-full relative transform scale-100 group-hover:scale-110 transition duration-300 ease-in-out">
                          <span className={styles["h"]}>
                            <img className="!min-w-[80px] !min-h-[80px] object-cover" src={item.cat_image} alt={item.cat_name} />
                          </span>
                        </div>
                      </div>
                      <p className="text-base text-qgray text-center mt-5 group-hover:text-qgreen transition duration-300 ease-in-out">
                        {item.cat_name}
                      </p>
                    </Link>
                  </div>
                </SplideSlide>

              );
            })}
          </SharedSlider>
         
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
