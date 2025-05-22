"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import UserNav from "../../components/UserNav";
import CampaignEditModal from "../../components/CampaignEditModal";
import Link from "next/link";

function CampaignPage() {
  const { campaignname } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [heroes, setHeroes] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setCurrentUser(user);

    const fetchCampaign = async () => {
      const res = await fetch("/api/campaign");
      const data = await res.json();
      const found = data.find(
        (c) => normalize(c.name) === normalize(campaignname)
      );
      setCampaign(found);
      if (
        found &&
        (found.creator === user ||
          found.dungeonMaster === user ||
          found.participants?.some((p) => p.username === user && p.accepted))
      ) {
        setIsEditable(true);
      }
    };

    const fetchHeroes = async () => {
      const res = await fetch("/api/hero");
      const data = await res.json();
      const filtered = data.filter(
        (h) => normalize(h.campaign) === normalize(campaignname)
      );
      setHeroes(filtered);
    };

    if (campaignname) {
      fetchCampaign();
      fetchHeroes();
    }
  }, [campaignname]);

  const handleCampaignUpdate = (updatedCampaign) => {
    setCampaign(updatedCampaign);
    setShowEditModal(false);
  };

  if (!campaign) return null;

  return (
    <div className="bg-black py-10 flex flex-col items-center min-h-screen">
      <div className="w-[95%] bg-[#F6EEE3] flex flex-col gap-10 items-center pb-10">
        <UserNav />

        {isEditable && (
          <div className="w-[90%] my-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="mt-2 bg-gray-600 text-white px-5 py-2 rounded cursor-pointer hover:bg-gray-300 hover:text-black transition-all duration-400"
            >
              Edit Campaign
            </button>
          </div>
        )}

        <div className="w-[90%] flex justify-between">
          <div className="w-[50%] flex flex-col gap-3">
            <h2 className="font-gambarino text-6xl underline uppercase">
              {campaign.name.replace(/-/g, " ")}
            </h2>
            <p className="capitalize">
              <span className="text-2xl font-gambarino underline">DM:</span>{" "}
              {campaign.dungeonMaster.replace(/-/g, " ")}
            </p>
            <p>
              <span className="text-2xl font-gambarino underline">
                Players:
              </span>{" "}
              {campaign.participants && campaign.participants.length > 0
                ? campaign.participants
                    .map((p) => p.username.replace(/-/g, " "))
                    .join(", ")
                : "none"}
            </p>
            <h3 className="text-5xl mt-5 underline font-gambarino">
              Characters
            </h3>
            <div className="flex flex-col gap-1">
              {campaign.participants?.map((p, i) => {
                const hero = heroes.find((h) => h.index === i);
                return (
                  <div key={i}>
                    {hero ? (
                      <Link
                        className="text-2xl font-gambarino underline"
                        href={`/hero/${hero.name}`}
                      >
                        {hero.name.replace(/-/g, " ")}
                      </Link>
                    ) : (
                      <span>Unnamed Hero</span>
                    )}{" "}
                    –{" "}
                    {p.accepted ? p.username.replace(/-/g, " ") : "pending..."}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-[45%] flex flex-col items-center gap-3">
            <Image
              src={campaign.illustration || "/noimage.png"}
              alt="Campaign"
              width={600}
              height={350}
              className="object-fit w-[80%] rounded "
            />
            <h3 className="font-gambarino text-4xl">World: {campaign.world}</h3>
          </div>
        </div>

        <div className="w-[90%] h-fit pb-8">
          <h2 className="font-gambarino text-6xl underline">Story</h2>
          <p className="text-[20px] w-[80%] text-justify whitespace-pre-line break-words mt-4">
            {campaign.story}
          </p>
        </div>
      </div>

      {showEditModal && (
        <CampaignEditModal
          campaign={campaign}
          onClose={() => setShowEditModal(false)}
          onSaved={handleCampaignUpdate}
        />
      )}
    </div>
  );
}

export default CampaignPage;
