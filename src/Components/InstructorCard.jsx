import React from "react";

const InstructorCard = ({ instructor }) => {
  const { name, email, classCount, photoURL, enrollmentCount } = instructor;
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
      <button className="btn btn-outline mt-10 hover:bg-primary hover:border-primary w-full">
        View Instructor Details
      </button>
    </div>
  );
};

export default InstructorCard;
