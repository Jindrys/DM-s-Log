"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import UserNav from "@/app/components/UserNav";
import HeroEditModal from "@/app/components/HeroEditModal";

function HeroPage() {
  const { heroname } = useParams();
  const [hero, setHero] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setCurrentUser(user);

    const fetchHero = async () => {
      try {
        const res = await fetch("/api/hero");
        const data = await res.json();

        const match = data.find(
          (h) =>
            normalize(h.name) === decodeURIComponent(heroname).toLowerCase()
        );

        setHero(match || null);
      } catch (err) {
        console.error("❌ Error loading hero:", err);
      }
    };

    if (heroname) fetchHero();
  }, [heroname]);

  const isEditable =
    hero && (hero.owner === currentUser || hero.dm === currentUser);

  if (!hero && currentUser) {
    return (
      <div className="bg-black py-10 flex flex-col items-center min-h-screen">
        <div className="w-[95%] flex flex-col items-center bg-[#F6EEE3] gap-10">
          <UserNav />
          <div className="min-h-screen text-center mt-20 space-y-6">
            <h2 className="text-4xl font-gambarino">
              Character not added yet.
            </h2>
            <Link
              href={`/user/${currentUser}`}
              className="text-xl underline bg-white px-4 py-2 rounded border"
            >
              Back to Campaigns
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!hero) return null;

  return (
    <div className="bg-black py-10 flex flex-col items-center min-h-screen">
      <div className="w-[95%] flex flex-col items-center bg-[#F6EEE3] gap-10">
        <UserNav />

        <div className="flex gap-5 items-center h-fit w-[90%]">
          <Link
            href={`/campaign/${hero.campaign.trim().replace(/\s+/g, "-")}`}
            className="px-5 py-3 bg-gray-700 text-white rounded hover:bg-gray-500 transition-all duration-300"
          >
            Back
          </Link>
          {isEditable && (
            <button
              onClick={() => setShowEdit(true)}
              className="px-5 py-3 bg-gray-500 text-white rounded cursor-pointer hover:bg-gray-700 transition-all duration-300"
            >
              Edit Hero
            </button>
          )}
        </div>

        <div className="flex w-[90%] h-fit justify-between">
          <div className="relative w-[35%] flex flex-col items-center border-4 h-fit bg-black/50 rounded-2xl p-5 shadow-md shadow-red-600">
            {hero.image ? (
              <Image
                src={hero.image}
                alt="Hero image"
                width={500}
                height={500}
                className="w-fit max-h-[450px] min-h-[450px] scale-x-[-1]"
              />
            ) : (
              <div className="w-[400px] h-[450px] bg-gray-200 rounded shadow-inner flex items-center justify-center text-xl">
                No Image
              </div>
            )}
            <h1 className="font-gambarino absolute bottom-9 left-3 text-7xl text-red-500/50">
              {hero.name}
            </h1>
            <h1 className="font-gambarino absolute bottom-10 left-2.5 text-7xl text-white">
              {hero.name}
            </h1>
          </div>

          <div className="w-[60%] flex flex-col text-5xl font-gambarino gap-10">
            <div className="flex gap-3">
              <h2 className="underline">Species:</h2>
              <h2>{hero.species || "-"}</h2>
            </div>
            <div className="flex gap-3">
              <h2 className="underline">Level:</h2>
              <h2>{hero.level || "-"}</h2>
            </div>
            <div className="flex gap-3">
              <h2 className="underline">Class:</h2>
              <h2>{hero.class || "-"}</h2>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="underline uppercase">Stats</h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-10">
                  <h2>AC: {hero.ac ?? "--"}</h2>
                  <h2>HP: {hero.hp ?? "--"}</h2>
                </div>
                <div className="flex gap-4 w-full justify-between">
                  <h2>STR: {hero.str ?? "--"}</h2>
                  <h2>INT: {hero.int ?? "--"}</h2>
                  <h2>DEX: {hero.dex ?? "--"}</h2>
                </div>
                <div className="flex gap-4 w-full justify-between">
                  <h2>WIS: {hero.wis ?? "--"}</h2>
                  <h2>CON: {hero.con ?? "--"}</h2>
                  <h2>CHA: {hero.cha ?? "--"}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[90%] min-h-[30vh] h-fit pb-10 flex flex-col gap-4">
          <h2 className="font-gambarino text-6xl underline">Story</h2>
          <p className="text-justify w-[75%] text-xl whitespace-pre-line break-words">
            {hero.story || "No story yet."}
          </p>
        </div>
      </div>

      {showEdit && (
        <HeroEditModal
          hero={hero}
          onClose={() => setShowEdit(false)}
          onSave={() => {
            setShowEdit(false);
            // Refresh data
            const refresh = async () => {
              const res = await fetch("/api/hero");
              const data = await res.json();
              const match = data.find(
                (h) =>
                  normalize(h.name) ===
                  decodeURIComponent(heroname).toLowerCase()
              );
              setHero(match || null);
            };
            refresh();
          }}
        />
      )}
    </div>
  );
}

export default HeroPage;
