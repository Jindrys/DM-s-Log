"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import UserNav from "../components/UserNav";

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
        <UserNav />

        <div className="flex w-[90%] h-fit justify-between">
          <div className="relative flex flex-col items-center border-4 h-fit bg-black/50 rounded-2xl p-5 shadow-md shadow-red-600">
            <Image
              src="/hordur.png"
              alt="Hero image"
              width={500}
              height={500}
              className={`w-fit max-h-[450px] min-h-[450px] transition-all duration-1000 ease-out scale-x-[-1] ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            />
            <h1 className="font-gambarino absolute bottom-9 left-3 text-7xl text-red-500/50">
              Hordur Everfinder
            </h1>
            <h1 className="font-gambarino absolute bottom-10 left-2.5 text-7xl text-white">
              Hordur Everfinder
            </h1>
          </div>
          <div className="w-[60%] flex flex-col text-5xl font-gambarino gap-10">
            <div className="flex gap-3">
              <h2 className="">Species:</h2>
              <h2 className="">Dwarf</h2>
            </div>
            <div className="flex gap-3">
              <h2 className="">Level:</h2>
              <h2 className="">7</h2>
            </div>
            <div className="flex gap-3">
              <h2 className="">Class:</h2>
              <h2 className="">Cleric</h2>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="underline uppercase">Stats</h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-10">
                  <h2>AC: XX</h2>
                  <h2>HP: XX</h2>
                </div>
                <div className="flex gap-4 w-full justify-between">
                  <h2>STR: XX</h2>
                  <h2>INT: XX</h2>
                  <h2>DEX: XX</h2>
                </div>
                <div className="flex gap-4 w-full justify-between">
                  <h2>WIS: XX</h2>
                  <h2>CON: XX</h2>
                  <h2>CHA: XX</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] min-h-[30vh] h-fit pb-10 flex flex-col gap-4">
          <h2 className="font-gambarino text-6xl underline">Story</h2>
          <p className="text-justify w-[70%]">
            In the smoky depths of the Ironcradle Mountains, where molten rivers
            flow beneath stone halls, Hordur Everfinder was born. A dwarf of
            stocky frame, braided beard, and eyes like burning coals, Hordur was
            forged in the same fire as the axes and anvils of his ancestors.
            Hordur was the youngest son of Thrain Stoneheart, master smith of
            the Emberforge Clan. While his kin found peace in metal and stone,
            Hordur always gazed toward the mountain peaks, dreaming of the world
            beyond. Though he learned the smith's trade, his heart beat for
            adventure—stoked by old tales of dwarven heroes, lost relics, and
            ancient enemies. His chance came when a deep tremor cracked the
            roots of Ironcradle. Something old had awakened beneath the forge
            halls—something with eyes of shadow and a voice like grinding stone.
            The elders dismissed the signs, but Hordur took up his father's axe
            and descended into the dark. He never spoke of what he found in the
            deep. When he emerged, his beard was singed, and a scar ran across
            his cheek like a streak of ash. He left Ironcradle the next morning,
            vowing to learn more of the world—and to uncover the truth of the
            darkness stirring beneath the mountain. Now, Hordur walks the lands
            as a wandering adventurer—part warrior, part loremaster—chasing
            whispers of ancient magic, forgotten vaults, and enemies no dwarf
            dares name. He carries the fire of the forge in his blood, and
            wherever he treads, the stone remembers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
