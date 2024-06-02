import React, { useState, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import Select from "react-select";
import { EcommerceApi } from "../../../src/API/EcommerceApi";
import { useRouter } from "next/router";
import { CookiesHandler } from "../../../src/utils/CookiesHandler";
import toast from "react-hot-toast";
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
  // ----------
  const [division, setDivision] = useState<string>("");

  const [district, setDistrict] = useState<string>("");

  const [thana, setThana] = useState<string>("");

  const [districts, setDistricts] = useState<any>([]);

  const [thanas, setThanas] = useState<string[]>([]);
  // ----------
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
    controller.setApiLoading(true);
    if (user_slug) {
      e.preventDefault();

      const addresses = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        country: e.target.country.value,
        division: division,
        district: district,
        thana: thana,
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
        toast.success("Successfullt updated !");
      }
      e.target.reset();
    } else {
      toast.error("Please Login First");
    }
    controller.setApiLoading(false);
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

  // -------
  const wholeAddress: any = [
    {
      divisionName: "Dhaka division",
      district: [
        {
          districtName: "Dhaka ",
          thanas: [
            "Adabar Thana",
            "Badda Thana",
            "Bangsal Thana",
            "Bimanbandar Thana ",
            "Cantonment Thana",
            "Chowkbazar Thana",
            "Darus Salam Thana",
            "Demra Thana",
            "Dhakshinkhan Thana",
            "Dhamrai Upazila",
            "Dhanmondi Thana",
            "Dohar Upazila",
            "Gendaria Thana",
            "Gulshan Thana",
            "Hazaribagh Thana",
            "Jatrabari Thana",
            "Kadamtali Thana",
            "Kafrul Thana",
            "Kalabagan",
            "Kamrangirchar Thana",
            "Keraniganj Upazila",
            "Khilgaon Thana",
            "Khilkhet Thana",
            "Kotwali Thana (Dhaka)",
            "Lalbagh Thana",
            "Mirpur Model Thana",
            "Mohammadpur Thana",
            "Motijheel Thana",
            "Nawabganj Upazila",
            "New Market Thana",
            "Pallabi Thana",
            "Paltan",
            "Panthapath",
            "Ramna Thana",
            "Rampura Thana",
            "Sabujbagh Thana",
            "Savar Upazila",
            "Shah Ali Thana",
            "Shahbag",
            "Sher-e-Bangla Nagar",
            "Shyampur Thana",
            "Sutrapur Thana",
            "Tejgaon Industrial Area Thana",
            "Tejgaon Thana",
            "Turag Thana",
            "Uttar Khan Thana",
            "Vatara Thana",
            "Wari Thana",
          ],
        },
        {
          districtName: "Faridpur",
          thanas: [
            "Alfadanga Upazila",
            "Bhanga Upazila",
            "Boalmari Upazila",
            "Charbhadrasan Upazila",
            "Faridpur Sadar Upazila",
            "Madhukhali Upazila",
            "Nagarkanda Upazila",
            "Sadarpur Upazila",
            "Saltha Upazila",
          ],
        },
        {
          districtName: "Gazipur",
          thanas: [
            "Gazipur Sadar Upazila",
            "Kaliakair Upazila",
            "Kaliganj Upazila",
            "Kapasia Upazila",
            "Sreepur Upazila",
          ],
        },
      ],
    },
    {
      divisionName: "Chattogram division",
      district: [
        {
          districtName: "Chattogram",
          thanas: [
            "Akbarshah Thana",
            "Bakoliya Thanaa ",
            " Bandar Thana",
            "Bayazid Thana",
            "Bhujpur Thana",
            "Chandgaon Thana",
            "Double Mooring Thana",
            "EPZ Thana",
            "Halishahar Thana",
            "Karnaphuli Upazila",
            "Khulshi Thana",
            "Kotwali Thana (Chittagong)",
            "Pahartali Thana",
            "Panchlaish Thana",
            "Patenga Thana",
          ],
        },
        {
          districtName: "Cox's bazar",
          thanas: [
            " Chakaria Upazila",
            "Cox's Bazar Sadar ",
            "Eidgaon Upazila",
            "Jaliadwip Upazila",
            "Kutubdia Upazila",
            "Moheshkhali Upazila",
            "Pekua Upazila",
            "Ramu Upazila",
            "Teknaf Upazila",
            "Ukhia Upazila",
          ],
        },
        {
          districtName: "Cumilla",
          thanas: [
            "Barura Upazila",
            "Brahmanpara Upazila",
            "Burichang Upazila",
            "Chandina Upazila",
            "Chapitala Union Parishad",
            "Chauddagram Upazila",
            "Comilla Adarsha Sadar Upazila",
            "Comilla Sadar Dakshin Upazila",
            "Daudkandi Upazila",
            "Debidwar Upazila",
            "Homna Upazila",
            "Laksam Upazila",
            "Lalmai Upazila",
            "Meghna Upazila",
            "Monohorgonj Upazila",
            "Muradnagar Upazila",
            "Nangalkot Upazila",
            "Titas Upazila",
          ],
        },
      ],
    },
  ];
  // -------

  const changeDivision = (event: any) => {
    event.preventDefault();
    setDivision(event.target.value);
    setDistricts(
      wholeAddress.find((divi: any) => divi.divisionName === event.target.value)
        .district
    );
    setThanas([]);
  };

  const changeDistrict = (event: any) => {
    event.preventDefault();
    setDistrict(event.target.value);
    setThanas(
      districts.find((dis: any) => dis.districtName === event.target.value)
        .thanas
    );
  };

  const changeThana = (event: any) => {
    event.preventDefault();
    setThana(event.target.value);
  };

  // -----

  // const countryOptions = [
  //   { value: "bangladesh", label: "Bangladesh" },
  //   // { value: "india", label: "India" },
  //   // { value: "qatar", label: "Qatar" },
  // ];
  // const districtOptions = [
  //   { value: "Chattogram", label: "Chattogram" },
  //   // { value: "Delhi", label: "Delhi" },
  //   // { value: "Dubai", label: "Dubai" },
  // ];
  // const upazilaOptions = [
  //   { value: " Karnaphuli", label: " Karnaphuli" },
  //   { value: "Lohagara", label: "Lohagara" },
  //   { value: "Palm", label: "Palm" },
  // ];

  // const handleChange = (selectedOption: any) => {
  //   setSelectedOption(selectedOption);
  // };

  return (
    <div data-aos="zoom-in" className="w-full aos-init aos-animate">
      <div className="flex justify-between items-center">
        <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
          Add New Shipping Address
        </h1>
        <span
          onClick={() => setForm(false)}
          className="text-qyellow cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"></path>
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
              Country *
            </h1>
            <div className="w-full h-[50px]  flex justify-between items-center rounded border-[#CBECD9] mb-2 ">
              <div className="my-select-box w-full">
                <div className="my-select-box-section ">
                  {/* <Select
                    defaultValue={{
                      label: singleAddressData?.country,
                      value: singleAddressData?.country,
                    }}
                    name="country"
                    value={selectedOption}
                    // value="Bangladesh"
                    onChange={handleChange}
                    options={countryOptions}
                    styles={style}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  /> */}
                  <select
                    name="country"
                    style={{
                      padding: "11px",
                      border: "1px solid rgb(239 239 239)",
                      width: "100%",
                      height: "50px",
                      margin: "0",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      fontSize: "15px",
                      borderRadius: 0,
                      boxShadow: "none",
                      cursor: "pointer",
                    }}>
                    <option value="Bangladesh">Bangladesh</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h1 className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal">
              Division *
            </h1>
            <div className="w-full h-[50px]  flex justify-between items-center rounded border-[#CBECD9] mb-2 ">
              <div className="my-select-box w-full">
                <div className="my-select-box-section ">
                  {/* <Select
                    defaultValue={{
                      label: singleAddressData?.country,
                      value: singleAddressData?.country,
                    }}
                    name="country"
                    value={selectedOption}
                    // value="Bangladesh"
                    onChange={handleChange}
                    options={countryOptions}
                    styles={style}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  /> */}
                  <select
                    value={division}
                    onChange={changeDivision}
                    style={{
                      padding: "11px",
                      border: "1px solid rgb(239 239 239)",
                      width: "100%",
                      height: "50px",
                      margin: "0",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      fontSize: "15px",
                      borderRadius: 0,
                      boxShadow: "none",
                      cursor: "pointer",
                    }}>
                    <option>Select divisions</option>
                    {wholeAddress.map((divi: any, i: any) => (
                      <option key={i} value={divi.divisionName}>
                        {divi.divisionName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-5 items-center mb-6">
            <div className="w-1/2">
              <h1 className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal">
                District*
              </h1>
              <div className="w-full h-[50px] flex justify-between items-center rounded border-[#CBECD9] mb-2 ">
                <div className="my-select-box w-full">
                  <div className="my-select-box-section ">
                    {/* <Select
                      defaultValue={{
                        label: singleAddressData?.state,
                        value: singleAddressData?.state,
                      }}
                      name="state"
                      options={districtOptions}
                      styles={style}
                      components={{
                        IndicatorSeparator: () => null,
                      }}></Select> */}
                    <select
                      value={district}
                      onChange={changeDistrict}
                      style={{
                        padding: "11px",
                        border: "1px solid rgb(239 239 239)",
                        width: "100%",
                        height: "50px",
                        margin: "0",
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        fontSize: "15px",
                        borderRadius: 0,
                        boxShadow: "none",
                        cursor: "pointer",
                      }}>
                      <option>Select District</option>
                      {districts.map((dis: any, i: any) => (
                        <option key={i} value={dis.districtName}>
                          {dis.districtName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <h1 className="input-label capitalize block mb-2 text-qgray text-[13px] font-normal">
                Thana / Upazila*
              </h1>
              <div className="w-full h-[50px] flex justify-between items-center rounded border-[#CBECD9] mb-2 ">
                <div className="my-select-box w-full">
                  <div className="my-select-box-section ">
                    {/* <Select
                      defaultValue={{
                        label: singleAddressData?.city,
                        value: singleAddressData?.city,
                      }}
                      name="city"
                      options={upazilaOptions}
                      styles={style}
                      components={{
                        IndicatorSeparator: () => null,
                      }}></Select> */}
                    <select
                      value={thana}
                      onChange={changeThana}
                      style={{
                        padding: "11px",
                        border: "1px solid rgb(239 239 239)",
                        width: "100%",
                        height: "50px",
                        margin: "0",
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        fontSize: "15px",
                        borderRadius: 0,
                        boxShadow: "none",
                        cursor: "pointer",
                      }}>
                      <option>Select Thana</option>
                      {thanas.map((thana: string, i: any) => (
                        <option key={i} value={thana}>
                          {thana}
                        </option>
                      ))}
                    </select>
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
                className="text-qblack text-[15px] select-none capitalize">
                home
              </label>
            </div>
            <div className="flex space-x-2 items-center mb-10">
              <div>
                <input type="checkbox" name="office" id="office" />
              </div>
              <label
                htmlFor="office"
                className="text-qblack text-[15px] select-none">
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
