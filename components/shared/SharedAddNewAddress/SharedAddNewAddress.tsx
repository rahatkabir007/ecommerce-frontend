import React, { useState, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import Select from "react-select";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { useRouter } from "next/router";
import { CookiesHandler } from "../../../src/utils/CookiesHandler";

interface Props {
  selectedOption: any;
  setSelectedOption: any;
  setForm: any;
  form: any;
  singleAddressData: any;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

const user_slug = CookiesHandler.getSlug();

const SharedAddNewAddress: React.FC<Props> = (props) => {
  const user_slug = CookiesHandler.getSlug();

  const states = useSelector(() => controller.states);
  const router = useRouter();
  // const [form, setForm] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(null);
  const {
    selectedOption,
    setSelectedOption,
    setForm,
    form,
    setRefresh,
    refresh,
    singleAddressData,
  } = props;

  const handleSubmit = async (e: any) => {
    if (user_slug) {
      e.preventDefault();

      const addresses = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        country: e.target.country.value,
        state: e.target.state.value,
        city: e.target.city.value,
        address: e.target.address.value,
        user_slug: user_slug,
      };
      const { res, err } = await EcommerceApi.updateAddress(
        addresses,
        singleAddressData?.slug
      );
      setRefresh(!refresh);
      if (res) {
        setForm(false);
      }
      e.target.reset();
    } else {
      alert("Please Login First");
    }
  };

  const style = {
    control: (base: any) => ({
      ...base,
      border: "1px solid rgb(239 239 239)",
      height: "50px",
      width: "100%",
      margin: "0",
      paddingLeft: "12px",
      paddingRight: "12px",
      fontSize: "13px",
      borderRadius: 0,
      // This line disable the blue border
      boxShadow: "none",
      cursor: "pointer",
      "&:hover": {
        border: "1px solid rgb(239 239 239)",
      },
    }),
  };

  const countryOptions = [
    { value: "bangladesh", label: "Bangladesh" },
    { value: "india", label: "India" },
    { value: "qatar", label: "Qatar" },
  ];
  const stateOptions = [
    { value: "Dhaka", label: "Dhaka" },
    { value: "Delhi", label: "Delhi" },
    { value: "Dubai", label: "Dubai" },
  ];
  const cityOptions = [
    { value: "Bashundhora", label: "Bashundhora" },
    { value: "Calcutta", label: "Calcutta" },
    { value: "Palm", label: "Palm" },
  ];
  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div data-aos="zoom-in" className="w-full aos-init aos-animate">
      <div className="flex justify-between items-center">
        <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
          Add New Address
        </h1>
        <span
          onClick={() => setForm(false)}
          className="text-qyellow cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
      <div className="form-area">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="w-full mb-5 sm:mb-0">
              <div className="input-com w-full h-full">
                <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Name*
                </label>
                <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                  <input
                    defaultValue={singleAddressData?.name}
                    name="name"
                    placeholder="Name"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray   font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-5 items-center mb-6">
            <div className="sm:w-1/2 w-full">
              <div className="input-com w-full h-full">
                <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Email*
                </label>
                <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                  <input
                    readOnly
                    defaultValue={states.user?.email}
                    name="email"
                    placeholder="Email"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray  font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                  />
                </div>
              </div>
            </div>
            <div className="sm:w-1/2 w-full">
              <div className="input-com w-full h-full">
                <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Phone Number*
                </label>
                <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                  <input
                    defaultValue={singleAddressData?.phone}
                    name="phone"
                    placeholder="012 3 *******"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray   font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h1 className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal">
              Country*
            </h1>
            <div className="w-full h-[50px]  flex justify-between items-center rounded border-[#CBECD9] mb-2 ">
              <div className="my-select-box w-full">
                <div className="my-select-box-section ">
                  <Select
                    defaultValue={{
                      label: singleAddressData?.country,
                      value: singleAddressData?.country,
                    }}
                    name="country"
                    value={selectedOption}
                    onChange={handleChange}
                    options={countryOptions}
                    styles={style}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-5 items-center mb-6">
            <div className="w-1/2">
              <h1 className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal">
                State*
              </h1>
              <div className="w-full h-[50px] flex justify-between items-center rounded border-[#CBECD9] mb-2 ">
                <div className="my-select-box w-full">
                  <div className="my-select-box-section ">
                    <Select
                      defaultValue={{
                        label: singleAddressData?.state,
                        value: singleAddressData?.state,
                      }}
                      name="state"
                      options={stateOptions}
                      styles={style}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                    ></Select>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <h1 className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal">
                City*
              </h1>
              <div className="w-full h-[50px] flex justify-between items-center rounded border-[#CBECD9] mb-2 ">
                <div className="my-select-box w-full">
                  <div className="my-select-box-section ">
                    <Select
                      defaultValue={{
                        label: singleAddressData?.city,
                        value: singleAddressData?.city,
                      }}
                      name="city"
                      options={cityOptions}
                      styles={style}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                    ></Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" mb-6">
            <div className="w-full">
              <div className="input-com w-full h-full">
                <label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Address
                </label>
                <div className="input-wrapper border  w-full h-full overflow-hidden relative border-qgray-border">
                  <input
                    defaultValue={singleAddressData?.address}
                    name="address"
                    placeholder="Your Address here"
                    className="input-field placeholder:text-sm text-sm px-6 text-dark-gray  font-normal bg-white focus:ring-0 focus:outline-none w-full h-[50px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-5 items-center ">
            <div className="flex space-x-2 items-center mb-10">
              <div>
                <input type="checkbox" name="home" id="home" />
              </div>
              <label
                htmlFor="home"
                className="text-qblack text-[15px] select-none capitalize"
              >
                home
              </label>
            </div>
            <div className="flex space-x-2 items-center mb-10">
              <div>
                <input type="checkbox" name="office" id="office" />
              </div>
              <label
                htmlFor="office"
                className="text-qblack text-[15px] select-none"
              >
                Office
              </label>
            </div>
          </div>
          <button className="w-full h-[50px]">
            <span className="yellow-btn rounded text-sm text-qblack">
              Save Address
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SharedAddNewAddress;
