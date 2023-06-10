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
          <p>{description}</p>
        </span>
      </div>
    </div>
  );
};

export default SingleClass;
