import React from "react";
import HeroArea from "./HeroArea";
import PopularClasses from "./PopularClasses";
import PopularInstructor from "./PopularInstructor";
import News from "./News";

const Home = () => {
  return (
    <div>
      <HeroArea></HeroArea>
      <PopularClasses></PopularClasses>
      <PopularInstructor></PopularInstructor>
      <News></News>
    </div>
  );
};

export default Home;
