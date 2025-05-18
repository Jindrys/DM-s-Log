"use client";

import { useState, useEffect } from "react";
import SpinnerHero from "./SpinnerHero";

const images = [
  "/bgmain-criss.png",
  "/bgmain-narcelia.png",
  "/bgmain-hordur.png",
  "/bgmain-syrien.png",
];

function MainSpinner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4500);

    return () => clearTimeout(interval);
  }, [currentIndex]);

  return (
    <div className="w-full h-[90vh] border-2 flex items-center px-[100px] relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out z-0"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      <div className="relative w-fit h-[350px] flex justify-center items-center">
        <div
          className="absolute blur-[150px] z-0 bg-black
         size-full"
        />
        <div className="relative text-7xl text-white z-10 font-bold font-poppins text-nowrap">
          WELCOME TO <br />
          YOUR ULTIMATE <br />
          ADVENTURE <br />
          TRACKER
        </div>
      </div>

      <div className="absolute top-[60%] left-3/5 -translate-y-1/2 z-10">
        <SpinnerHero />
      </div>
    </div>
  );
}

export default MainSpinner;
