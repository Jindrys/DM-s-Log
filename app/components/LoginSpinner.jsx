"use client";

import { useState, useEffect } from "react";
import SpinnerHero from "./SpinnerHero";
import Link from "next/link";

const images = [
  "/bgmain-criss.png",
  "/bgmain-narcelia.png",
  "/bgmain-hordur.png",
  "/bgmain-syrien.png",
];

function LoginSpinner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4500);

    return () => clearTimeout(interval);
  }, [currentIndex]);

  return (
    <div className="w-full h-screen border-2 flex items-center px-[100px] relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out z-0"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>

      <Link href="/" className="absolute top-1 left-1 size-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-20 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </Link>

      <div className="min-w-[400px] w-[50%] h-fit flex flex-col justify-center items-center m-3 z-10 ">
        <div className="w-full h-[120px] bg-linear-to-t from-[#978665] from-5% via-[#FBEFD8]  to-[#978665] to-95% rounded-[8px]" />
        <div className="bg-[#FBEFD8] w-[95%] flex flex-col items-center justify-center py-10 gap-10">
          <h1 className="text-6xl text-center font-gambarino underline decoration-2 underline-offset-8">
            Welcome back to <span className="font-aktura">DM's&nbsp;Log</span>
          </h1>
          <form className="w-full px-5 flex flex-col items-center gap-8">
            <div className="w-[90%] border-b-2 border-black/60 px-10">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                className="w-full placeholder-gray-600 text-4xl focus:outline-none"
              />
            </div>

            <div className="w-[90%] border-b-2 border-black/60 px-10">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="placeholder-gray-600 text-4xl focus:outline-none"
              />
            </div>

            <button
              href="/user/xxx"
              type="submit"
              className="w-[90%] uppercase py-3 text-3xl bg-red-500 text-white rounded-[8px]"
            >
              Continue in your journey
            </button>
            <Link href="/user/xxx">muj skip</Link>

            <p className="text-xl uppercase">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="px-2 py-1 underline bg-[#E1E1E1] rounded-[8px]"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
        <div className="w-full h-[120px] bg-linear-to-t from-[#978665] from-5% via-[#FBEFD8]  to-[#978665] to-95% rounded-[8px]" />
      </div>

      <div className="absolute top-[60%] left-3/5 -translate-y-1/2 z-10">
        <SpinnerHero />
      </div>
    </div>
  );
}

export default LoginSpinner;
