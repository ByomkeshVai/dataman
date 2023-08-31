import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { saveUser } from "../../api/auth";
import { Helmet } from "react-helmet";
import { ImSpinner2 } from "react-icons/Im";
import { AiOutlineEye } from "react-icons/Ai";
import { imageUpload } from "../../hooks/utlits";
import { Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Form, Alert } from "react-bootstrap";
import VerifyModal from "./VerifyModal";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("buyer");

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  const { user, loading } = useContext(AuthContext);

  // // const { user, loading } = useContext(AuthContext);
  // // console.log(user.phoneNumber);

  const professions = [
    "Electrician",
    "Key Maker",
    "Driver",
    "Plumber",
    "Carpenter",
    "Painter",
  ];

  const locations = [
    "Block A",
    "Block B",
    "Block C",
    "Block D",
    "Block E",
    "Block H",
  ];

  const onSubmit = async (data) => {
    function generateRandomID() {
      const min = 10000; // Minimum 5-digit number (10000)
      const max = 99999; // Maximum 5-digit number (99999)
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // const generateRandomID = () => {
    //   const randomNumber = Math.floor(Math.random() * 99999) + 10000; // Generate a random number between 10000 and 99999
    //   return `se${randomNumber}`; // Add the 'se' prefix to the random number
    // };
    const randomID = generateRandomID();

    const images = data.image[0];
    imageUpload(images).then((datas) => {
      // navigate(from, { replace: true });
      const saveUser = {
        userID: randomID,
        name: data.name,
        profession: data.profession,
        location: data.location,
        email: data.email,
        phone1: user.phoneNumber,
        phone2: data.phone2,
        photo: datas.data.display_url,
        role: selectedOption,
      };

      fetch(`${import.meta.env.VITE_API_URL}/users/${user.phoneNumber}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Signup Successful");
          navigate("/userPanel");
        });
    });
  };

  return (
    <div>
      <div className="">
        <Helmet>
          <title>DataMan - Register</title>
        </Helmet>
        <div>
          <div className="hero-content flex-col lg:flex-row-reverse mx-auto text-center">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <p>I am a: {selectedOption}</p>
                <div className="flex gap-10 text-xl justify-center">
                  <label>
                    <input
                      type="radio"
                      value="buyer"
                      checked={selectedOption === "buyer"}
                      onChange={handleOptionChange}
                      className="mr-3"
                    />
                    Buyer
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="seller"
                      checked={selectedOption === "seller"}
                      onChange={handleOptionChange}
                      className="mr-3"
                    />
                    Seller
                  </label>
                </div>
                {selectedOption === "seller" && (
                  <div className="form-control">
                    <label className="label" htmlFor="professionSelect">
                      Select Profession:
                    </label>
                    <select
                      className="input input-bordered"
                      id="professionSelect"
                      {...register("profession", {
                        required: "Please select a profession",
                      })}
                    >
                      <option value="">-- Select --</option>
                      {professions.map((profession) => (
                        <option
                          key={profession}
                          value={profession}
                          defaultValue={"N/A"}
                        >
                          {profession}
                        </option>
                      ))}
                    </select>
                    {errors.profession && <p>{errors.profession.message}</p>}
                  </div>
                )}
                <div className="form-control">
                  <label className="label" htmlFor="locationSelect">
                    Select Location:
                  </label>
                  <select
                    className="input input-bordered"
                    id="locationSelect"
                    {...register("location", {
                      required: "Please select a location",
                    })}
                  >
                    <option value="">-- Select --</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                  {errors.location && <p>{errors.location.message}</p>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    name="name"
                    placeholder="Name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                </div>
                {/* <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <PhoneInput
                    defaultCountry="BD"
                    value={user.phoneNumber}
                    disabled
                    placeholder="Enter number Number"
                    className="p-5 "
                  />
                </div> */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Secondary Phone</span>
                  </label>
                  <input
                    type="phone"
                    {...register("phone2", { required: false })}
                    name="phone2"
                    placeholder="Secondary Number"
                    className="input input-bordered"
                  />
                  {errors.phone2 && (
                    <span className="text-red-600">
                      Phone Number is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Profile Image</span>
                  </label>
                  <input
                    type="file"
                    {...register("image", { required: "Image is required" })}
                    name="image"
                    placeholder="Profile Image"
                    className="input"
                  />
                  {errors.image && (
                    <span className="text-red-600">Image is required</span>
                  )}
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="bg-blue-900 w-full rounded-md py-3 text-white"
                  >
                    {loading ? (
                      <ImSpinner2 className="m-auto animate-spin" size={24} />
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
