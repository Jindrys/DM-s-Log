import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Campaign from "@/models/Campaign";
import Invite from "@/models/Invite";
import Hero from "@/models/Hero";

// Normalize helper
const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, "-");

export async function POST(req) {
  try {
    const body = await req.json();
    let {
      name,
      creator,
      dungeonMaster,
      players,
      characters,
      story,
      world,
      thumbnail,
      illustration,
    } = body;

    if (!name || !creator || !dungeonMaster) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Normalize campaign name
    name = normalize(name);

    // Prepare participants
    const participants = players.map((player, index) => ({
      username: player,
      character: characters[index] || "",
      accepted: false,
    }));

    // Create campaign
    const newCampaign = new Campaign({
      name,
      creator,
      dungeonMaster,
      story,
      world,
      thumbnail,
      illustration,
      participants,
    });

    await newCampaign.save();

    // Create heroes (one per character)
    for (let i = 0; i < characters.length; i++) {
      const heroName = characters[i];

      await Hero.create({
        name: normalize(heroName),
        campaign: name,
        index: i,
        owner: null,
        dm: dungeonMaster,
        species: "",
        level: 1,
        class: "",
        ac: 0,
        hp: 0,
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
        story: "",
        image: "",
      });
    }

    // Create invites
    await Promise.all(
      players.map((player) =>
        Invite.create({ campaignId: newCampaign._id, player })
      )
    );

    return NextResponse.json(
      { message: "Campaign created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const campaigns = await Campaign.find().lean();
    return NextResponse.json(campaigns);
  } catch (err) {
    console.error("❌ Chyba při GET kampaní:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { name, updates } = await req.json();

    if (!name || !updates) {
      return NextResponse.json(
        { message: "Missing name or updates" },
        { status: 400 }
      );
    }

    await dbConnect();

    const normalizedName = name.trim().replace(/\s+/g, "-");

    const updated = await Campaign.findOneAndUpdate(
      { name: new RegExp(`^${normalizedName}$`, "i") },
      { $set: updates },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Campaign not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Campaign updated", campaign: updated },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ PATCH error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
