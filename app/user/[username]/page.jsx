import React from "react";
import CampaignCard from "../../components/CampaignCard";
import UserNav from "@/app/components/UserNav";

function page() {
  return (
    <div className="bg-black py-10 flex flex-col items-center h-fit">
      <div className="w-[95%] h-fit flex flex-col items-center bg-[#F6EEE3] gap-10">
        <UserNav />

        <div className="flex flex-col w-[90%] gap-4">
          <h2 className="uppercase text-6xl font-gambarino underline">
            your campaigns
          </h2>
          <div className="flex flex-wrap justify-between gap-5 py-4">
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
          </div>
        </div>
        <div className="flex flex-col w-[90%] font-gambarino underline">
          <h2 className="uppercase text-6xl">joined campaigns</h2>
          <div className="flex flex-wrap justify-between gap-5 py-4">
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
          </div>
        </div>
        <div className="flex flex-col w-[90%] font-gambarino underline">
          <h2 className="uppercase text-6xl">browse campaigns</h2>
          <div className="flex flex-wrap justify-between gap-5 py-4">
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
            <CampaignCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
