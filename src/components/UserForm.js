import React, { useEffect, useState, useRef } from "react";
import { useForm, useController } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import UserCard from "./UserCard";

const animatedComponents = makeAnimated();

const UserForm = (index = "") => {
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState([]);
  const [dialCode, setDialCode] = useState([]);

  const existingData =
    localStorage.getItem("userData") != null
      ? JSON.parse(localStorage.getItem("userData"))
      : [];
  const cardsData = useRef(existingData);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        setCountry(
          data.data.map((co) => ({ name: co.country, label: co.country }))
        )
      );
  }, []);

  const changeHandler = (options) => {
    setValue("country", options.name);
    fetch(
      `https://countriesnow.space/api/v0.1/countries/states/q?country=${options.name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "appl132ication/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) =>
        setStates(
          data.data.states.map((state) => ({
            name: state.name,
            label: state.name,
          }))
        )
      );
  };

  useEffect(() => {
    fetch(`https://countriesnow.space/api/v0.1/countries/codes`, {
      method: "GET",
      headers: {
        "Content-Type": "appllication/json",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setDialCode(
          data.data.map((code) => ({
            name: code.dial_code,
            label: code.dial_code,
          }))
        )
      );
  }, []);

  const [editData, setEditData] = useState(null);

  const handleEditClick = (data) => {
    console.log(data);
    setEditData({ ...data, index: data.index });
  };

  const defaultValue = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dial: "",
    address1: "",
    address2: "",
    state: "",
    country: "",
    zip: "",
  };

  const editedData = {
    firstName: editData?.firstName || "",
    lastName: editData?.lastName || "",
    email: editData?.email || "",
    phoneNumber: editData?.phoneNumber || "",
    dial: editData?.dial || "",
    address1: editData?.address1 || "",
    address2: editData?.address2 || "",
    state: editData?.state || "",
    country: editData?.country || "",
    zip: editData?.zip || "",
  };

  const { handleSubmit, register, reset, control, setValue } =
    useForm(defaultValue);

  const {
    field: { ...restDialField },
  } = useController({ name: "dial", required: true, control });

  const {
    field: { ...restCountryField },
  } = useController({ name: "country", required: true, control });
  const {
    field: { ...restStateField },
  } = useController({ name: "state", required: true, control });

  useEffect(() => {
    if (editData) {
      reset(editedData);
      setValue("dial", editData.dial);
      setValue("state", editData.state);
      setValue("country", editData.country);
    }
  }, [editData, reset]);

  const onSubmit = (data) => {
    console.log(data);

    const newData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      dial: data.dial,
      address1: data.address1,
      address2: data.address2,
      state: data.state,
      country: data.country,
      zip: data.zip,
    };

    if (editData) {
      const updatedData = existingData.map((item, index) =>
        index === editData.index ? newData : item
      );
      localStorage.setItem("userData", JSON.stringify(updatedData));
      cardsData.current = updatedData;
      setEditData(null);
    } else {
      localStorage.setItem(
        "userData",
        JSON.stringify([...existingData, newData])
      );
      cardsData.current = JSON.parse(localStorage.getItem("userData"));
    }

    reset(defaultValue);
    alert("Data Saved Successfully!");
  };

  return (
    <div className="flex">
      <form className="w-full mt-5 max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap px-3 -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="First name..."
              {...register("firstName", { required: true })}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Last name..."
              {...register("lastName", { required: true })}
            />
          </div>
        </div>
        <div className="mx-3 mb-6">
          <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="text"
                placeholder="Email..."
                {...register("email", {
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
            </div>
          </div>
          <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-phone-number"
              >
                Phone Number<span className="text-red-500">*</span>
              </label>
              <div className="flex mx-3 mb-6">
                <Select
                  className="flex flex-wrap md:w-1/3 mr-2 mt-2 mb-2"
                  options={dialCode}
                  {...restDialField}
                />
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-phone-number"
                  type="text"
                  placeholder="phone number"
                  {...register("phoneNumber", { required: true })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap px-3 -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-address-1"
            >
              Address 1<span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-address-1"
              type="text"
              placeholder="Enter address..."
              {...register("address1", { required: true })}
            />
          </div>
        </div>
        <div className="flex flex-wrap px-3 -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-address-2"
            >
              Address 2
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-address-2"
              type="text"
              placeholder="Enter address..."
              {...register("address2", { required: false })}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Country<span className="text-red-500">*</span>
            </label>
            <Select
              className="appearance-none block w-full text-gray-700 border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-country"
              components={animatedComponents}
              // defaultValue={"Select country"}
              // isMulti
              options={country}
              {...restCountryField}
              onChange={(selectedOption) => {
                changeHandler(selectedOption);
                restCountryField.onChange(selectedOption);
              }}
            />
          </div>
          <div className="flex flex-wrap px-3 -mx-3 mb-6">
            <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                State<span className="text-red-500">*</span>
              </label>
              <Select
                className="appearance-none block w-full text-gray-700 border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                components={animatedComponents}
                // defaultValue={Select}
                // isMulti
                options={states}
                {...restStateField}
              />
            </div>
          </div>
          <div className="flex flex-wrap px-3 -mx-3 mb-6">
            <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Zip<span className="text-red-500">*</span>
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                placeholder="00000"
                {...register("zip", { required: true })}
              />
            </div>
          </div>
        </div>
        <button>Submit</button>
      </form>
      <UserCard data={cardsData.current} onEditClick={handleEditClick} />
    </div>
  );
};

export default UserForm;
