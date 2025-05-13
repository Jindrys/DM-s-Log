import React from "react";

function Navbar() {
  return (
    <div className="w-full h-[100px] flex justify-center items-center ">
      <div className="w-[90%] h-[80px] border-2 flex justify-between px-[50px] items-center bg-[#FBEFD8] border-[#F8E0A7] ">
        <div>DM's Log</div>
        <div className="bg-red-500 p-3 px-5 text-white rounded-xl">
          Start your jurney
        </div>
      </div>
    </div>
  );
}

export default Navbar;
