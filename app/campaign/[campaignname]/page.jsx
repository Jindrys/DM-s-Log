"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import UserNav from "../../components/UserNav";

function Page() {
  const { campaignname } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [heroes, setHeroes] = useState([]);

  const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await fetch("/api/campaign");
        if (!res.ok) throw new Error("Failed to load campaigns");
        const all = await res.json();
        const found = all.find(
          (c) => normalize(c.name) === normalize(campaignname)
        );
        if (found) setCampaign(found);
        else console.warn("Campaign not found:", campaignname);
      } catch (err) {
        console.error("Error loading campaign:", err);
      }
    };

    const fetchHeroes = async () => {
      try {
        const res = await fetch("/api/hero");
        if (!res.ok) throw new Error("Failed to load heroes");
        const all = await res.json();
        const filtered = all.filter(
          (h) => normalize(h.campaign) === normalize(campaignname)
        );
        setHeroes(filtered);
      } catch (err) {
        console.error("Error loading heroes:", err);
      }
    };

    if (campaignname) {
      fetchCampaign();
      fetchHeroes();
    }
  }, [campaignname]);

  if (!campaign) return null;

  const {
    name: campaignName,
    world,
    story,
    dungeonMaster,
    participants = [],
    illustration,
    thumbnail,
  } = campaign;

  const acceptedParticipants = participants.filter((p) => p.accepted);
  const imageSrc = illustration || thumbnail || "/noimage.png";

  return (
    <div className="bg-black py-10 flex flex-col items-center h-fit">
      <div className="w-[95%] flex flex-col items-center bg-[#F6EEE3] gap-10">
        <UserNav />

        <div className="flex w-[90%] min-h-[45vh] h-fit justify-between">
          <div className="w-[50%] flex flex-col gap-2">
            <h2 className="font-gambarino underline uppercase text-6xl">
              {campaignName.replace(/-/g, " ")}
            </h2>

            <h4 className="text-xl font-semibold">DM – {dungeonMaster}</h4>
            <h4 className="text-xl font-semibold">
              Players –{" "}
              {acceptedParticipants.map((p) => p.username).join(", ") || "none"}
            </h4>

            <h3 className="font-gambarino underline uppercase text-4xl mt-4">
              Main characters
            </h3>

            <div className="flex flex-col gap-4">
              {participants.length > 0 ? (
                participants.map((participant, i) => {
                  const hero = heroes.find(
                    (h) =>
                      h.index === i &&
                      normalize(h.campaign) === normalize(campaignname)
                  );
                  return (
                    <div key={i}>
                      <h4 className="font-gambarino text-2xl">
                        <Link
                          href={`/hero/${hero?.name || "unknown"}`}
                          className="underline cursor-pointer"
                        >
                          {hero?.name?.replace(/-/g, " ") || "Unnamed Hero"}
                        </Link>{" "}
                        –{" "}
                        {participant.accepted
                          ? participant.username
                          : "pending..."}
                      </h4>
                    </div>
                  );
                })
              ) : (
                <p>No participants yet.</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 py-4 aspect-video">
            <Image
              src={imageSrc}
              alt="Campaign image"
              width={1000}
              height={600}
              className="w-full max-h-[450px] object-cover"
            />
            <h2 className="w-full flex justify-center text-5xl font-gambarino">
              WORLD: {world}
            </h2>
          </div>
        </div>

        <div className="w-[90%] h-fit flex justify-between pb-8">
          <div className="min-h-[45vh] flex flex-col gap-5">
            <h2 className="font-gambarino underline uppercase text-6xl">
              Story
            </h2>
            <p className="text-[20px] text-justify whitespace-pre-line">
              {story}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
