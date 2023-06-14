import React from "react";
import image from "../../assets/404/acarnet-404.gif";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/Logo.png";

const Page404 = () => {
  return (
    <div className="container mx-auto flex items-center justify-center h-[950px]">
      <div>
        <img src={image} alt="" />
        <div className="flex items-center justify-center mt-6 mb-10">
          <Link to={"/"} className="btn btn-primary mx-auto">
            Back To Home
          </Link>
        </div>
        <p className="text-center btn btn-link text-xl font-medium">
          Follow us on Facebook
        </p>
        <p className="text-center btn btn-link text-xl font-medium">
          Follow us on Twitter
        </p>
      </div>
    </div>
  );
};

export default Page404;
