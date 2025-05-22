import React from "react";
import Image from "next/image";
import Link from "next/link";

function CampaignCard({ campaign }) {
  const { name, thumbnail, participants = [] } = campaign;

  // Získáme názvy postav z participantů (pokud existují)
  const characters = participants
    .map((p) => p.character?.replace(/-/g, " "))
    .filter((c) => !!c);

  return (
    <Link
      href={`/campaign/${name}`}
      className="w-[300px] min-w-[290px] h-[350px] border shadow-md shadow-red-600 p-4 bg-beige flex flex-col  hover:shadow-xl transition-all duration-400"
    >
      <Image
        src={thumbnail || "/noimage.png"}
        alt={name}
        width={500}
        height={300}
        className="w-full max-h-[200px] object-cover"
      />

      <h2 className="mt-4 text-xl font-bold text-center mb-5">
        {name.replace(/-/g, " ")}
      </h2>

      <p className="text-sm text-center">
        story of{" "}
        {characters.length > 0 ? characters.join(", ") : "unknown heroes"}
      </p>
    </Link>
  );
}

export default CampaignCard;
