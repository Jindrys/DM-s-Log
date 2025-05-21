import React from "react";
import Image from "next/image";
import Link from "next/link";

function CampaignCard({ campaign }) {
  const { _id, name, thumbnail, characters = [] } = campaign;

  return (
    <Link
      href={`/campaign/${name}`}
      className="w-[300px] min-w-[290px] h-[350px] border shadow-md shadow-red-600 p-4 bg-beige flex flex-col"
    >
      <Image
        src={thumbnail || "/noimage.png"}
        alt={name}
        width={500}
        height={300}
        className="w-full max-h-[200px] object-cover"
      />

      <h2 className="mt-4 text-xl font-bold text-center mb-5">{name}</h2>

      <p className="text-sm text-center">
        story of{" "}
        {characters.length > 0 ? characters.join(", ") : "unknown heroes"}
      </p>
    </Link>
  );
}

export default CampaignCard;
