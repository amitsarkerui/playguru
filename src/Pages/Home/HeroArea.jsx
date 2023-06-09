import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const HeroArea = () => {
  return (
    <div className="h-[700px] rounded-2xl">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        stopOnHover={true}
        showArrows={true}
        interval={4000}
        showThumbs={false}
        className="container mx-auto"
      >
        {/* -------------slider 1 ------------------ */}
        <div className="h-[700px] py-60 rounded-2xl bg-[url('https://i.ibb.co/bgNqhtd/banner-1.png')] bg-cover bg-center">
          <h1 className="text-5xl text-white font-bold text-center leading-normal">
            Discover the Joy of Music at PlayGuru. <br /> Learn, Play, and Grow
          </h1>
          <p className="max-w-4xl my-5 text-white mx-auto">
            PlayGuru is your gateway to the enchanting world of music. Our music
            school is committed to providing top-notch instruction, personalized
            guidance, and a nurturing learning environment. Whether you're
            interested in piano, guitar, vocals, or any other instrument, our
            dedicated team of instructors will guide you on your path to musical
            mastery.
          </p>
          <button className="btn btn-primary text-white">Contact Now</button>
        </div>
        {/* -------------slider 2 ------------------ */}
        <div className=" pl-16 h-[700px] py-60 rounded-2xl bg-[url('https://i.ibb.co/YW0p1Ts/banner-2.jpg')] bg-cover bg-center">
          <h1 className="text-5xl text-white font-bold text-left leading-normal">
            Elevate your skills with
            <br /> professional music lessons
          </h1>
          <p className="max-w-lg my-7 text-white text-left">
            Discover the power of music at PlayGuru. Our holistic approach
            nurtures creativity, self-expression, and a deep appreciation for
            the art. Join us for a fulfilling musical journey that enriches your
            life.
          </p>
          <div className="flex justify-start">
            <button className="btn btn-primary text-white text-left ">
              Contact Now
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroArea;
