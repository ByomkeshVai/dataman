import React from "react";
import Lottie, { useLottie } from "lottie-react";
import thanks from "../../assets/thanks.json";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const UserPanel = () => {
  const { logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut();
    navigate("/");
  };
  return (
    <div className="max-w-2xl hero h-screen mx-auto">
      <div className="imgarea">
        <Lottie animationData={thanks} loop={true} />
        <h2 className="text-center mt-5">
          <Link to="/" onClick={handleLogOut}>
            Create a New User
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default UserPanel;
