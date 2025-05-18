"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = ["/criss.png", "/narcelia.png", "/hordur.png", "/syrien.png"];
const characterNames = ["Criss", "Narcelia", "Hordur", "Syrien"];

function SpinnerHero({ flipped = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState(
    "translate-x-[-100%] opacity-0"
  );

  useEffect(() => {
    setAnimationClass("translate-x-0 opacity-100");

    const interval = setTimeout(() => {
      setAnimationClass("translate-x-[100%] opacity-0");

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setAnimationClass("translate-x-[-100%] opacity-0");
      }, 500);
    }, 4000);

    return () => clearTimeout(interval);
  }, [currentIndex]);

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center overflow-hidden">
      {/* Animovaný obrázek */}
      <div
        className={`transition-all duration-1000 ease-in-out ${animationClass}`}
      >
        <Image
          src={images[currentIndex]}
          alt={characterNames[currentIndex]}
          layout="intrinsic"
          width={500}
          height={300}
          className={flipped ? "scale-x-[-1]" : ""}
        />
      </div>

      <div
        className={`relative mt-4 transition-all duration-1000 ease-in-out ${animationClass}`}
      >
        <div className="absolute top-1 left-1 text-shadow-md text-[4rem] font-bold text-gray-500">
          {characterNames[currentIndex]}
        </div>
        <div className="relative text-shadow-md text-[4rem] font-bold text-white">
          {characterNames[currentIndex]}
        </div>
      </div>
    </div>
  );
}

export default SpinnerHero;
