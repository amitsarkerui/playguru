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
      <h3>{name}</h3>
      <p>{email}</p>
      <span>
        <p>Total Class : {classCount}</p>
        <p>Total Student: {enrollmentCount}</p>
      </span>
    </div>
  );
};

export default InstructorCard;
