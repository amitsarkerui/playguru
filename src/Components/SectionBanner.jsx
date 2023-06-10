import React from "react";

const SectionBanner = ({ bannerTitle }) => {
  return (
    <div>
      <nav
        className="relative flex bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1461784121038-f088ca1e7714?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')`,
          height: "300px",
        }}
        aria-label="Breadcrumb"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex justify-center items-center w-full h-full z-20">
          <h2 className="text-4xl font-bold text-white text-center">
            {bannerTitle}
          </h2>
        </div>
      </nav>
    </div>
  );
};

export default SectionBanner;
