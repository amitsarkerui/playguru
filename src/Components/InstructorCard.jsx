import React from "react";
import { Link } from "react-router-dom";

const InstructorCard = ({ instructor }) => {
  const { _id, name, email, classCount, photoURL, enrollmentCount } =
    instructor;
  return (
    <div className="p-8 border border-gray-300 rounded-lg">
      <img
        className="rounded-md h-72 w-full object-cover"
        src={photoURL}
        alt=""
      />
      <h3 className="mt-4 text-2xl font-bold text-accent">{name}</h3>
      <p className="text-gray-600 mb-4 font-medium">{email}</p>
      <span className="flex gap-5">
        <p className="bg-primary px-3 py-[2px] rounded-full text-white">
          Total Class : {classCount}
        </p>
        <p className="bg-primary px-3 py-[2px] rounded-full text-white">
          Total Student: {enrollmentCount}
        </p>
      </span>
      <Link to={`users/${_id}`}>
        <button className="btn  btn-primary text-white mt-10 hover:bg-primary hover:border-primary w-full">
          View Instructor Details
        </button>
      </Link>
    </div>
  );
};

export default InstructorCard;
