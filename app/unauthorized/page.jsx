"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center text-red-600 text-4xl font-bold gap-8">
      ⚠️ Unauthorized – Access Denied
      <Link
        href={`/user/${username}`}
        className="underline bg-white text-black px-4 py-2 rounded text-xl"
      >
        Return to your page
      </Link>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-black text-white text-xl rounded hover:bg-red-700 transition"
      >
        Logout & Go Home
      </button>
    </div>
  );
}
