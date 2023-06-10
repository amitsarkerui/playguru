import React from "react";
import { Link } from "react-router-dom";

const ClassCard = ({ singleClass }) => {
  const {
    _id,
    className,
    instructor,
    duration,
    capacity,
    enrolledStudents,
    price,
    image_url,
  } = singleClass;
  const availableSeat = capacity - enrolledStudents;
  return (
    <div className="relative flex flex-col">
      <img className="h-52 object-cover rounded-lg" src={image_url} alt="" />
      <span className="flex gap-2 absolute top-2 right-2">
        <p className="px-3 py-[1px] rounded-full bg-primary/75 text-white text-sm font-medium">
          {duration}
        </p>
        <p className="px-3 py-[1px] rounded-full bg-primary/75 text-white text-sm font-medium">
          ${price}
        </p>
      </span>
      <h3 className="text-2xl font-bold text-accent my-3">{className}</h3>
      <p className="text-gray-600 font-medium">Instructor: {instructor}</p>
      <p className="text-gray-600 font-medium mb-2 mt-1">
        Available Seat: {availableSeat}
      </p>
      <div className="flex-grow"></div>
      <Link to={`classes/${_id}`}>
        <button className="btn btn-primary btn-block mt-2 text-white">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ClassCard;
