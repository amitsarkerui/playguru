import { useQuery } from "@tanstack/react-query";
import React from "react";
import useInstructor from "../../hooks/useInstructor";
import SectionHeader from "../../Components/SectionHeader";
import InstructorCard from "../../Components/instructorCard";

const PopularInstructor = () => {
  const [instructors] = useInstructor();
  const topInstructors = instructors.slice(0, 6);
  //   console.log(topInstructors);
  return (
    <div className="container mx-auto">
      <SectionHeader
        heading={"Top Instructor"}
        subHeading={"Diamond"}
      ></SectionHeader>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-10">
        {topInstructors.map((instructor) => (
          <InstructorCard
            key={instructor._id}
            instructor={instructor}
          ></InstructorCard>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
