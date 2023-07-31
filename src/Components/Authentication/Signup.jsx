import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
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
  const passwords = watch("password");
  const { loading, setUpRecaptha } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const [selectedOption, setSelectedOption] = useState("Buyer");
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const getOtp = async (e) => {
  //   e.preventDefault();
  //   console.log(number);
  //   setError("");
  //   if (number === "" || number === undefined)
  //     return setError("Please enter a valid phone number!");
  //   try {
  //     const response = await setUpRecaptha(number);
  //     setResult(response);
  //     setFlag(true);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setLoginError("Passwords do not match");
    }
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }

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
        email: data.email,
        phone: number,
        photo: datas.data.display_url,
        role: selectedOption,
      };

      console.log();
      fetch(`${import.meta.env.VITE_API_URL}/users/${number}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Signup Successful");
          }
        });
    });
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
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
                      value="Buyer"
                      checked={selectedOption === "Buyer"}
                      onChange={handleOptionChange}
                      className="mr-3"
                    />
                    Buyer
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Seller"
                      checked={selectedOption === "Seller"}
                      onChange={handleOptionChange}
                      className="mr-3"
                    />
                    Seller
                  </label>
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <PhoneInput
                    defaultCountry="BD"
                    value={number}
                    onChange={setNumber}
                    placeholder="Enter number Number"
                    className="p-5 "
                  />
                  {errors.number && (
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
                  {errors.phone && (
                    <span className="text-red-600">
                      Phone Number is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    placeholder="password"
                    className="input input-bordered"
                  />
                  <AiOutlineEye
                    onClick={togglePassword}
                    className="absolute right-10 bottom-40 top-80 cursor-pointer"
                  ></AiOutlineEye>
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password must be 6 characters
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      Password must be less than 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must have one Uppercase one lower case, one
                      number and one special character.
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="input input-bordered"
                    {...register("confirmPassword", {
                      validate: (value) =>
                        value === passwords || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  {loginError && <p className="text-red-600">{loginError}</p>}
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>

                <div className="form-control mt-6">
                  <button
                    disabled={!!errors.confirmPassword}
                    type="submit"
                    className="bg-blue-900 w-full rounded-md py-3 text-white"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    {loading ? (
                      <ImSpinner2 className="m-auto animate-spin" size={24} />
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </form>
              <div id="recaptcha-container"></div>
              <VerifyModal
                verifyOtp={verifyOtp}
                isOpen={isEditModalOpen}
                closeModal={() => setIsEditModalOpen(false)}
                setIsEditModalOpen={setIsEditModalOpen}
                setOtp={setOtp}
              />
              {/* <Form
                onSubmit={verifyOtp}
                style={{ display: flag ? "block" : "none" }}
              >
                <Form.Group className="mb-3" controlId="formBasicOtp">
                  <Form.Control
                    type="otp"
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Form.Group>
                <div className="button-right">
                  <Link to="/">
                    <Button variant="secondary">Cancel</Button>
                  </Link>
                  &nbsp;
                  <Button type="submit" variant="primary">
                    Verify
                  </Button>
                </div>
              </Form> */}
              <p className="mb-6 text-center">
                <small>
                  Already have an account{" "}
                  <Link to="/login" className="text-blue-900 font-bold">
                    Login
                  </Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
