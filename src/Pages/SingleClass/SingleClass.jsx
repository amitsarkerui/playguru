import React from "react";
import { useLoaderData } from "react-router-dom";
import SectionBanner from "../../Components/SectionBanner";

const SingleClass = () => {
  const loaderClass = useLoaderData();
  const {
    _id,
    className,
    instructor,
    instructor_email,
    schedule,
    duration,
    description,
    requirements,
    capacity,
    enrolledStudents,
    location,
    price,
    image_url,
  } = loaderClass;
  return (
    <div>
      <SectionBanner bannerTitle={"Class Details"}></SectionBanner>
      <div className="container mx-auto grid grid-cols-1 gap-7 md:grid-cols-5 mt-20 mb-8 p-8 rounded-lg border border-gray-300 items-center">
        <img className="col-span-3 rounded-lg" src={image_url} alt="" />
        <span className="col-span-2">
          <h2 className="text-accent text-2xl font-bold mb-2">{className}</h2>
          <p className="mb-5 text-gray-600 font-medium">{description}</p>
          <p className="text-gray-600 font-medium">Instructor: {instructor}</p>
          <p className="text-gray-600 font-medium">
            Instructor Email: {instructor_email}
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 justify-center my-10">
            <p className="text-gray-600 font-medium bg-gray-100 rounded-md p-3">
              Schedule: {schedule}
            </p>
            <p className="text-gray-600 font-medium bg-gray-100 rounded-md p-3">
              Duration: {duration}
            </p>
            <p className="text-gray-600 font-medium bg-gray-100 rounded-md p-3">
              Total Seat: {capacity}
            </p>
            <p className="text-gray-600 font-medium bg-gray-100 rounded-md p-3">
              Total Enrollment: {enrolledStudents}
            </p>
            <p className="text-gray-600 font-medium bg-gray-100 rounded-md p-3">
              Price: ${price}
            </p>
            <p className="text-gray-600 font-medium bg-gray-100 rounded-md p-3">
              Location: {location}
            </p>
          </div>
          <button className="btn btn-primary btn-block text-white">
            Add to cart
          </button>
        </span>
      </div>
    </div>
  );
};

export default SingleClass;
