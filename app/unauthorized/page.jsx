"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UnauthorizedPage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center text-red-600 text-4xl font-bold gap-8">
      ⚠️ Unauthorized – Access Denied
      <Link
        href={`/user/${username}`}
        className="underline bg-white text-black px-4 py-2 rounded text-xl"
      >
        Return to your page
      </Link>
    </div>
  );
}
