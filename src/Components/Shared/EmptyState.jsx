import React from "react";
import { Link } from "react-router-dom";

const EmptyState = ({ message, address, label }) => {
  return (
    <div className="min-screen gap-5 flex flex-col justify-center items-center mt-36 pt-24 ">
      <p className="text-gray-600 text-xl lg:text-3xl">{message}</p>
      <p className="text-red-600 text-md lg:text-md">
        Go Back to{" "}
        <Link to="/" className="text-red-600 font-bold underline">
          Home
        </Link>
      </p>
    </div>
  );
};

export default EmptyState;
