import React from "react";
import SectionBanner from "../../Components/SectionBanner";
import { useQuery } from "@tanstack/react-query";
import ClassCard from "../../Components/ClassCard";

const AllClasses = () => {
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("https://play-guru-server.vercel.app/classes");
      return res.json();
    },
  });
  return (
    <div>
      <SectionBanner bannerTitle={"All Classes"}></SectionBanner>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-24 container mx-auto mb-24">
        {classes.map((singleClass) => (
          <ClassCard
            key={singleClass._id}
            singleClass={singleClass}
          ></ClassCard>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
