import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLoaderData } from "react-router-dom";
import SectionBanner from "../../Components/SectionBanner";
import ClassCard from "../../Components/ClassCard";

const SingleInstructor = () => {
  const loadedUser = useLoaderData();
  const { _id, name, email, photoURL } = loadedUser;
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3030/classes");
      return res.json();
    },
  });
  const filteredClasses = classes.filter((cls) => cls.status !== "pending");
  const instructorClasses = filteredClasses.filter(
    (singleClass) => singleClass.instructor_email === email
  );

  const totalEnrollment = classes.reduce((count, currentClass) => {
    if (currentClass.instructor_email === email) {
      return count + currentClass.enrolledStudents;
    }
    return count;
  }, 0);

  return (
    <div>
      <SectionBanner bannerTitle={"Instructor Details"}></SectionBanner>
      <div className="container mx-auto my-20">
        <span className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 p-10 border border-gray-300 rounded-lg">
          <img className="w-full rounded-lg" src={photoURL} alt="" />
          <span>
            <h3 className="text-2xl font-bold text-accent">{name}</h3>
            <p className="text-lg text-gray-600 font-medium">{email}</p>
            <span className="flex gap-5 mt-6">
              <p className="bg-primary px-4 py-1 rounded-full text-white font-medium">
                Total Classes : {instructorClasses.length}
              </p>
              <p className="bg-primary px-4 py-1 rounded-full text-white font-medium">
                Total Enrollment : {totalEnrollment}
              </p>
            </span>
          </span>
        </span>
        <h3 className="mt-24 text-2xl font-bold">Instructor Classes:</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-10">
          {instructorClasses.map((singleClass) => (
            <ClassCard
              key={singleClass._id}
              singleClass={singleClass}
            ></ClassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleInstructor;
