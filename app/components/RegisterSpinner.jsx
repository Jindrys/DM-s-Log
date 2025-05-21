"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SpinnerHero from "./SpinnerHero";

const images = [
  "/bgmain-criss.png",
  "/bgmain-narcelia.png",
  "/bgmain-hordur.png",
  "/bgmain-syrien.png",
];

function RegisterSpinner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      router.push(`/user/${savedUsername}`);
    }

    const interval = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4500);

    return () => clearTimeout(interval);
  }, [currentIndex]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registrace selhala");
      }

      localStorage.setItem("username", formData.username);
      router.push(`/user/${formData.username}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full h-screen border-2 flex flex-row-reverse items-center px-[100px] relative overflow-hidden">
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
        <div className="w-full h-[120px] bg-gradient-to-t from-[#978665] via-[#FBEFD8] to-[#978665] rounded-[8px]" />
        <div className="bg-[#FBEFD8] w-[95%] flex flex-col items-center justify-center py-10 gap-10">
          <h1 className="text-6xl text-center font-gambarino underline decoration-2 underline-offset-8">
            Welcome to <span className="font-aktura">DM's&nbsp;Log</span>
          </h1>

          <form
            className="w-full px-5 flex flex-col items-center gap-10"
            onSubmit={handleSubmit}
          >
            <div className="w-[90%] border-b-2 border-black/60 px-10">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full placeholder-gray-600 text-4xl focus:outline-none"
              />
            </div>

            <div className="w-[90%] border-b-2 border-black/60 px-10">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full placeholder-gray-600 text-4xl focus:outline-none"
              />
            </div>

            <div className="w-[90%] border-b-2 border-black/60 px-10">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="placeholder-gray-600 text-4xl focus:outline-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-center text-xl font-bold">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-[90%] uppercase py-3 text-3xl bg-red-500 text-white rounded-[8px]"
            >
              Start your journey
            </button>

            <p className="text-xl uppercase gap-1 flex items-center">
              Already have an account?
              <Link
                href="/login"
                className="px-2 py-1 underline bg-[#E1E1E1] rounded-[8px]"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
        <div className="w-full h-[120px] bg-gradient-to-t from-[#978665] via-[#FBEFD8] to-[#978665] rounded-[8px]" />
      </div>

      <div className="absolute top-[60%] right-3/5 -translate-y-1/2 z-10">
        <SpinnerHero flipped />
      </div>
    </div>
  );
}

export default RegisterSpinner;
