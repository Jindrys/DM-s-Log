"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CampaignCard from "../../components/CampaignCard";
import UserNav from "@/app/components/UserNav";

function Page() {
  const router = useRouter();
  const params = useParams();
  const routeUsername = params?.username;

  const [campaigns, setCampaigns] = useState([]);
  const [username, setUsername] = useState("");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (!storedUsername) {
      router.push("/login");
      return;
    }

    if (storedUsername !== routeUsername) {
      router.push("/unauthorized");
      return;
    }

    setUsername(storedUsername);
    setAuthorized(true);

    const fetchCampaigns = async () => {
      try {
        const res = await fetch("/api/campaign");
        const data = await res.json();
        setCampaigns(data);
      } catch (err) {
        console.error("❌ Error loading campaigns:", err);
      }
    };

    fetchCampaigns();
  }, [routeUsername, router]);

  const created = campaigns.filter((c) => c.creator === username);
  const joined = campaigns.filter(
    (c) => c.players?.includes(username) && c.creator !== username
  );
  const others = campaigns.filter(
    (c) => !c.players?.includes(username) && c.creator !== username
  );

  if (!authorized) return null;

  return (
    <div className="bg-black py-10 flex flex-col items-center h-fit">
      <div className="w-[95%] h-fit flex flex-col items-center bg-[#F6EEE3] gap-10">
        <UserNav />

        {/* Created campaigns */}
        <div className="flex flex-col w-[90%] gap-4">
          <h2 className="uppercase text-6xl font-gambarino underline">
            your campaigns
          </h2>
          <div className="flex flex-wrap justify-between gap-5 py-4 min-h-[200px]">
            {created.map((campaign) => (
              <CampaignCard key={campaign._id} campaign={campaign} />
            ))}
          </div>
        </div>

        {/* Joined campaigns */}
        <div className="flex flex-col w-[90%] font-gambarino underline">
          <h2 className="uppercase text-6xl">joined campaigns</h2>
          <div className="flex flex-wrap justify-between gap-5 py-4 min-h-[200px]">
            {joined.map((campaign) => (
              <CampaignCard key={campaign._id} campaign={campaign} />
            ))}
          </div>
        </div>

        {/* Other campaigns */}
        <div className="flex flex-col w-[90%] font-gambarino underline">
          <h2 className="uppercase text-6xl">browse campaigns</h2>
          <div className="flex flex-wrap justify-between gap-5 py-4 min-h-[200px]">
            {others.map((campaign) => (
              <CampaignCard key={campaign._id} campaign={campaign} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
