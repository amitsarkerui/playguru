import React from "react";
import SectionBanner from "../../Components/SectionBanner";
import useInstructor from "../../hooks/useInstructor";
import InstructorCard from "../../Components/instructorCard";

const Instructor = () => {
  const [instructors] = useInstructor();
  //   console.log(instructor);
  return (
    <div>
      <SectionBanner bannerTitle={"Instructors"}></SectionBanner>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-10 container mx-auto">
        {instructors.map((instructor) => (
          <InstructorCard
            key={instructor._id}
            instructor={instructor}
          ></InstructorCard>
        ))}
      </div>
    </div>
  );
};

export default Instructor;
