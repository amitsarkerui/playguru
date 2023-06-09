import React from "react";
import HeroArea from "./HeroArea";
import PopularClasses from "./PopularClasses";
import PopularInstructor from "./PopularInstructor";

const Home = () => {
  return (
    <div>
      <HeroArea></HeroArea>
      <PopularClasses></PopularClasses>
      <PopularInstructor></PopularInstructor>
    </div>
  );
};

export default Home;
