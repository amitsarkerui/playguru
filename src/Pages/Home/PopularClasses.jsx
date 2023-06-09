import React, { useEffect, useState } from "react";
import SectionHeader from "../../Components/SectionHeader";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);
  console.log(classes);
  useEffect(() => {
    fetch("http://localhost:3030/classes")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);
  const sortedClasses = classes.sort(
    (a, b) => b.enrolledStudents - a.enrolledStudents
  );
  const topClasses = sortedClasses.slice(0, 6);
  console.log(topClasses);
  return (
    <div className="my-14">
      <SectionHeader
        heading={"Popular Classes"}
        subHeading={"Enroll Now"}
      ></SectionHeader>
    </div>
  );
};

export default PopularClasses;
