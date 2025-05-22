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
  try {
    const { inviteId, action } = await req.json(); // action = "accepted" or "declined"

    await dbConnect();
    const invite = await Invite.findById(inviteId);
    if (!invite) {
      return NextResponse.json(
        { message: "Invite not found" },
        { status: 404 }
      );
    }

    invite.status = action;
    await invite.save();

    if (action === "accepted") {
      const campaign = await Campaign.findById(invite.campaignId);
      if (!campaign) {
        return NextResponse.json(
          { message: "Campaign not found" },
          { status: 404 }
        );
      }

      // Přidání do players
      await Campaign.findByIdAndUpdate(invite.campaignId, {
        $push: { players: invite.player },
      });

      // Najdi správný index v participants
      const participantIndex = campaign.participants.findIndex(
        (p) => p.username === invite.player
      );

      if (participantIndex !== -1) {
        // Přiřazení ownera k Hero
        await Hero.findOneAndUpdate(
          {
            campaign: campaign.name,
            index: participantIndex,
          },
          { owner: invite.player }
        );
      }
    }

    return NextResponse.json({ message: "Invite updated" });
  } catch (err) {
    console.error("❌ Error updating invite:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
