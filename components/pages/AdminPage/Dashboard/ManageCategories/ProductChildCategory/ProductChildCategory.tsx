import React from "react";
import {
  FaEdit,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
  FaTrash,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { controller } from "../../../../../../src/state/StateController";
import { Jsondata } from "../../../../../../src/utils/Jsondata";
import SharedAddNewButton from "../../../../../shared/SharedAddNewButton/SharedAddNewButton";
import DashboardBreadcrumb from "../../../../AdminProfile/DashboardBreadcrumb";
import ToggleButton from "../ToggleButton/ToggleButton";
import styles from "./ProductChildCategory.module.css";

interface Props { }

const ProductChildCategory: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div className="w-full mt-10">
      <DashboardBreadcrumb
        headline="Product Child Category"
        slug="Product Category"
        link="/Product Category"
      ></DashboardBreadcrumb>
      <div className="m-10">
        {/* <div className={`${styles["section-header"]}  justify-between`}>
          <h1 className={`${styles["title"]} `}>Product Child Category</h1>
          <div className={`${styles["section-header-breadcrumb"]} `}> */}

        {/* </div>
        </div> */}
        <div className="section-body">
          <a href="">
            <SharedAddNewButton></SharedAddNewButton>
          </a>
          <div>
            <div style={{ marginTop: "25px", backgroundColor: "white" }}>
              <div className="p-4 rounded w-full">
                <div className="flex items-center justify-between pb-6">
                  <div>
                    <span className="text-xs text-gray-500 px-1">Show </span>
                    <select
                      name="dataTable_length"
                      aria-controls="dataTable"
                      className="custom-select custom-select-sm form-control form-control-sm border border-blue-600 text-gray-500"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    <span className="text-xs text-gray-500  px-1">Entries</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-xs text-gray-500">
                      Search
                    </label>
                    <div className="flex bg-gray-50 items-center ml-3 p-1 rounded">
                      <input
                        className="bg-gray-50 outline-none   "
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-1 overflow-x-auto">
                    <div className="inline-block min-w-full shadow  overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr className="h-16">
                            <th
                              className={`px-3 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase `}
                            >
                              <span className="flex  space-x-0 space-y-0 opacity-80">
                                SN
                                <FaLongArrowAltUp /> <FaLongArrowAltDown />
                              </span>
                            </th>
                            <th
                              className={` px-3 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase `}
                            >
                              <span className="flex  space-x-0 space-y-0  opacity-80">
                                Child Category
                                <FaLongArrowAltUp /> <FaLongArrowAltDown />
                              </span>
                            </th>
                            <th
                              className={`px-3 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase `}
                            >
                              <span className="flex  space-x-0 space-y-0  opacity-80">
                                Slug
                                <FaLongArrowAltUp /> <FaLongArrowAltDown />
                              </span>
                            </th>
                            <th
                              className={` px-3 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase `}
                            >
                              <span className="flex  space-x-0 space-y-0  opacity-80">
                                Sub Category
                                <FaLongArrowAltUp /> <FaLongArrowAltDown />
                              </span>
                            </th>
                            <th
                              className={` px-3 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase `}
                            >
                              <span className="flex  space-x-0 space-y-0  opacity-80">
                                Category
                                <FaLongArrowAltUp /> <FaLongArrowAltDown />
                              </span>
                            </th>
                            <th
                              className={` px-3 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase `}
                            >
                              <span className="flex  space-x-0 space-y-0  opacity-80">
                                Status
                                <FaLongArrowAltUp /> <FaLongArrowAltDown />
                              </span>
                            </th>

                            <th
                              className={` px-3 py-3  bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase`}
                            >
                              <span className="flex  space-x-0 space-y-0 opacity-80">
                                Action
                                <FaLongArrowAltUp /> <FaLongArrowAltDown />
                              </span>
                            </th>
                          </tr>
                        </thead>
                        {/* -----------Plz Attention ,Table body/Row start here -------------- */}
                        <tbody>
                          {Jsondata.childCategoriesTableData.map(
                            (childCategoryTableData, index) => (
                              <tr className="even:bg-gray-50 odd:bg-white">
                                <td className="px-3 py-3    text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {index + 1}
                                  </p>
                                </td>
                                <td className="px-3 py-3  text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap ">
                                    {childCategoryTableData.childCategory}
                                  </p>
                                </td>
                                <td className="px-3 py-3  text-sm  ">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {childCategoryTableData.slug}
                                  </p>
                                </td>
                                <td className="px-0 py-3 text-sm ">
                                  <p className="text-gray-900 whitespace-wrap pl-5 ">
                                    {childCategoryTableData.subCategory}
                                  </p>
                                </td>
                                <td className="px-3 py-3  text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {childCategoryTableData.category}
                                  </p>
                                </td>
                                <td className="px-3 py-3 text-sm">
                                  <ToggleButton />
                                  {/* <span className="text-gray-900 whitespace-no-wrap">
                                  
                                    <ToggleButton />
                                  </span> */}
                                </td>

                                <td className="px-2 py-3  text-sm">
                                  <button>
                                    <span className="relative inline-block px-1 py-1 font-semibold text-green-900 leading-tight">
                                      <span
                                        style={{
                                          boxShadow: "0 2px 6px #acb5f6",
                                        }}
                                        className="h-8 w-8  inset-0 bg-blue-700   rounded  relative text-white flex justify-center items-center"
                                      >
                                        <FaEdit />
                                      </span>
                                    </span>
                                  </button>
                                  <button>
                                    <span className="relative inline-block px-1 py-1 font-semibold text-green-900 leading-tight">
                                      <span
                                        style={{
                                          boxShadow: "0 2px 6px #fd9b96",
                                        }}
                                        className="h-8 w-8  inset-0 bg-red-500   rounded  relative text-white flex justify-center items-center"
                                      >
                                        <FaTrash />
                                      </span>
                                    </span>
                                  </button>
                                  <span className="relative inline-block px-1 py-1 font-semibold text-green-900 leading-tight">
                                    {/* <button>
                                      <span
                                        style={{
                                          boxShadow: "0 2px 6px #ffc473",
                                        }}
                                        className="h-8 w-8  inset-0 bg-orange-400   rounded  relative text-white flex justify-center items-center"
                                      >
                                        <FaTruck />
                                      </span>
                                    </button> */}
                                  </span>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      {/* -------------- */}
                      <div className="px-5 py-5  border-t flex justify-end">
                        <div className="inline-flex mt-2 xs:mt-0">
                          <button className="text-sm text-indigo-500 transition duration-150   font-semibold py-2 px-4 rounded-l">
                            Prev
                          </button>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            aria-current="page"
                            className="relative z-10 inline-flex items-center  bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                          >
                            1
                          </a>
                          {/* <a
                            href="#"
                            className="relative inline-flex items-center  bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-300 focus:z-20"
                          >
                            2
                          </a>
                          <a
                            href="#"
                            className="relative hidden items-center bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-300 focus:z-20 md:inline-flex"
                          >
                            3
                          </a>
                          <a
                            href="#"
                            className="relative hidden items-center  bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-300 focus:z-20 md:inline-flex"
                          >
                            4
                          </a>
                          <a
                            href="#"
                            className="relative inline-flex items-center  bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-300 focus:z-20"
                          >
                            5
                          </a>
                          <a
                            href="#"
                            className="relative inline-flex items-center  bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-indigo-300 focus:z-20"
                          >
                            6
                          </a> */}
                          <button className="ml-3 text-sm text-indigo-500 transition duration-150  font-semibold py-2 px-4 rounded-r">
                            Next
                          </button>
                        </div>
                      </div>

                      {/* ----------------- */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductChildCategory;
