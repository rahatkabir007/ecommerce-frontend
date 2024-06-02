import React, { useEffect, useState } from "react";
import ItemDetailsLeft from "./ItemDetailsLeft/ItemDetailsLeft";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import ProductDetails from "./ProductDetails";
import Breadcrumb from "../../shared/SharedBreadcrumb/Breadcrumb";
import ReportedItemModal from "./ReportedItemModal/ReportedItemModal";
import { useRouter } from "next/router";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { IProduct } from "../../../interfaces/models";
import { CookiesHandler } from "../../../src/utils/CookiesHandler";
import SharedHead from "../../shared/SharedHead/SharedHead";

interface Props {}

const SingleProduct: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const router = useRouter();
  const { asPath, query } = router;

  // const [title, setTitle] = useState("")
  const [singleProduct, setSingleProduct] = useState<IProduct | null>(null);
  const [reportModalSlug, setReportModalSlug] = useState<any | string>("");

  const user_slug = CookiesHandler.getSlug();

  useEffect(() => {
    if (!router.isReady) return;

    let productSlug = query.slug;

    const fetchProductData = async () => {
      const { res, err } = await EcommerceApi.getSingleProduct(
        productSlug as string
      );
      if (res) {
        setSingleProduct(res);
      }

      if (err) {
        router.replace("/404");
      }
    };

    if (!states.initialDataLoading && router.isReady) {
      fetchProductData();
    }
  }, [router.isReady, query.slug, states.initialDataLoading]);

  const handleReport = (e: any) => {
    e.preventDefault();
    controller.setApiLoading(true);

    const reportedItem = {
      product_slug: asPath.split("=")[1],
      user_slug: user_slug,
      title: e.target.title.value,
      note: e.target.note.value,
    };
    EcommerceApi.addReportedItem(reportedItem);
    setReportModalSlug("");

    controller.setApiLoading(false);
  };

  return (
    <>
      <SharedHead
        title={singleProduct?.productName}
        keyword={singleProduct?.seoTitle}
        desc={singleProduct?.seoDescription}
      />
      <div className="w-full min-h-screen pt-0 pb-0">
        <div className="product-view-main-wrapper bg-white px-2 md:px-0 pt-[30px] w-full">
          <div className="w-full bg-white pb-[60px] ">
            <div className="container-x mx-auto ">
              <Breadcrumb
                slug={`${singleProduct?.productName}`}
                link={`/single_product?slug=${singleProduct?.slug}`}
              ></Breadcrumb>
              <div className="lg:flex justify-between">
                <div className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]">
                  <ItemDetailsLeft
                    singleProduct={singleProduct}
                  ></ItemDetailsLeft>
                </div>
                <div className="flex-1">
                  <ProductDetails
                    setReportModalSlug={setReportModalSlug}
                    singleProduct={singleProduct}
                  ></ProductDetails>
                </div>
              </div>
              <ReportedItemModal
                setReportModalSlug={setReportModalSlug}
                handleReport={handleReport}
                reportModalSlug={reportModalSlug}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
