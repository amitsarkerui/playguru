import React, { useEffect, useState } from "react";
import SectionHeader from "../../Components/SectionHeader";
import ClassCard from "../../Components/ClassCard";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);
  // console.log(classes);
  useEffect(() => {
    fetch("http://localhost:3030/classes")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);
  const sortedClasses = classes.sort(
    (a, b) => b.enrolledStudents - a.enrolledStudents
  );
  const topClasses = sortedClasses.slice(0, 6);
  // console.log(topClasses);
  return (
    <div className="my-14 container mx-auto">
      <SectionHeader
        heading={"Popular Classes"}
        subHeading={"Enroll Now"}
      ></SectionHeader>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 mt-10">
        {topClasses.map((singleClass) => (
          <ClassCard
            key={singleClass._id}
            singleClass={singleClass}
          ></ClassCard>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
