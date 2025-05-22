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

function LoginSpinner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const normalizedUsername = username
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: normalizedUsername,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Přihlášení selhalo");
      }

      localStorage.setItem("username", normalizedUsername);
      router.push(`/user/${normalizedUsername}`);
    } catch (err) {
      setError(err.message);
    }
  };

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
        <div className="w-full h-[120px] bg-gradient-to-t from-[#978665] via-[#FBEFD8] to-[#978665] rounded-[8px]" />
        <div className="bg-[#FBEFD8] w-[95%] flex flex-col items-center justify-center py-10 gap-10">
          <h1 className="text-6xl text-center font-gambarino underline decoration-2 underline-offset-8">
            Welcome back to <span className="font-aktura">DM's&nbsp;Log</span>
          </h1>
          <form
            onSubmit={handleLogin}
            className="w-full px-5 flex flex-col items-center gap-8"
          >
            <div className="w-[90%] border-b-2 border-black/60 px-10">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="w-full placeholder-gray-600 text-4xl focus:outline-none"
              />
            </div>

            <div className="w-[90%] border-b-2 border-black/60 px-10">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="placeholder-gray-600 text-4xl focus:outline-none"
              />
            </div>

            {error && <p className="text-red-600 text-xl font-bold">{error}</p>}

            <button
              type="submit"
              className="w-[90%] uppercase py-3 text-3xl bg-red-500 text-white rounded-[8px]"
            >
              Continue in your journey
            </button>

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
        <div className="w-full h-[120px] bg-gradient-to-t from-[#978665] via-[#FBEFD8] to-[#978665] rounded-[8px]" />
      </div>

      <div className="absolute top-[60%] left-3/5 -translate-y-1/2 z-10">
        <SpinnerHero />
      </div>
    </div>
  );
}

export default LoginSpinner;
