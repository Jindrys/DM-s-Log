import React from "react";
import Image from "next/image";

function FavCamp() {
  return (
    <div className="w-[300px] min-w-[290px] h-[350px] border shadow-md shadow-red-600 p-4 bg-beige flex flex-col">
      <Image
        src="/hesoyam.png"
        alt="Card Image"
        width={500}
        height={300}
        className="w-full max-h-[200px]"
      />
      <h2 className="mt-4 text-xl font-bold text-center mb-5">
        HESOYAM DUNGEONS
      </h2>
      <p className="text-sm text-center">
        story of Hordur Everfinder, Criss and Narcelia
      </p>
    </div>
  );
}

export default FavCamp;
