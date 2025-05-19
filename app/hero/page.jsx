"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function page() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="bg-black py-10 flex flex-col items-center h-fit">
      <div className="w-[95%] h-fit flex flex-col items-center bg-[#F6EEE3] gap-10">
        <nav className="flex w-full h-fit mt-5 items-center justify-between border-b-2 pb-4 px-[80px]">
          <Link
            href="/user"
            className="text-6xl uppercase underline font-gambarino"
          >
            username
          </Link>
          <div className="underline text-2xl uppercase">invites {"(0)"}</div>
          <div className="underline text-2xl uppercase">create campaign</div>
          <Link href="/notes" className="underline text-2xl uppercase">
            notes
          </Link>
          <div className="underline text-xl uppercase bg-red-500/50 px-4 py-2 rounded">
            log out
          </div>
        </nav>

        <div className="flex w-[90%] h-screen justify-between">
          <div className="relative flex flex-col items-center border-4 h-fit bg-black/50 rounded-2xl p-5">
            <Image
              src="/hordur.png"
              alt="Map image"
              width={500}
              height={500}
              className={`w-fit max-h-[450px] min-h-[450px] transition-all duration-1000 ease-out ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            />
            <h1 className="font-gambarino absolute bottom-9 left-3 text-7xl text-red-500/50">
              Hordur
            </h1>
            <h1 className="font-gambarino absolute bottom-10 left-2.5 text-7xl text-white">
              Hordur
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
