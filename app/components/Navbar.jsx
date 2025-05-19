import React from "react";
import Link from "next/link";

function Navbar({ login = true }) {
  return (
    <div className="w-full h-[100px] flex justify-center items-center  ">
      <div className="w-[90%] h-[80px] border-2 flex justify-between px-[50px] items-center bg-[#FBEFD8] border-[#F8E0A7] ">
        <div className="flex justify-center items-center h-full">
          <h1 className="font-aktura text-3xl text-center">DM's Log</h1>
        </div>
        <Link
          href="/login"
          className={`${
            login ? "" : "hidden"
          } bg-red-500 p-3 px-5 z-[1000] text-white rounded-[10px] font-gambarino uppercase text-xl`}
        >
          <h2>Start your jurney</h2>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
