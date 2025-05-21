import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Invite from "@/models/Invite";
import Campaign from "@/models/Campaign";
import Hero from "@/models/Hero";

export async function GET(req) {
  await dbConnect();
  const url = new URL(req.url);
  const player = url.searchParams.get("player");

  const invites = await Invite.find({ player, status: "pending" }).populate(
    "campaignId"
  );
  return NextResponse.json(invites);
}

export async function PATCH(req) {
  const { inviteId, action } = await req.json(); // action = "accepted" or "declined"

  await dbConnect();
  const invite = await Invite.findById(inviteId);
  if (!invite)
    return NextResponse.json({ message: "Invite not found" }, { status: 404 });

  invite.status = action;
  await invite.save();

  if (action === "accepted") {
    const campaign = await Campaign.findById(invite.campaignId);

    if (!campaign)
      return NextResponse.json(
        { message: "Campaign not found" },
        { status: 404 }
      );

    // najdi správného participant indexu
    const index = campaign.participants.findIndex(
      (p) => p.username === invite.player
    );

    if (index !== -1) {
      // aktualizuj participant na accepted
      campaign.participants[index].accepted = true;
      await campaign.save();

      // aktualizuj odpovídající Hero
      await Hero.findOneAndUpdate(
        { campaign: campaign._id, index }, // podle kampaně a pozice
        { owner: invite.player }
      );
    }
  }

  return NextResponse.json({ message: "Invite updated" });
}
