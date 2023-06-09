import React from "react";

const SectionHeader = ({ subHeading, heading }) => {
  return (
    <div className="text-center mx-auto">
      <p className="bg-primary px-4 py-1 rounded-full inline-block text-white font-semibold">
        {subHeading}
      </p>
      <h3 className="text-4xl font-bold text-accent mt-2">{heading}</h3>
    </div>
  );
};

export default SectionHeader;
