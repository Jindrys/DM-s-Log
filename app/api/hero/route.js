import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hero from "@/models/Hero";

// Pomocné funkce pro název s pomlčkami
const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, "-");
const denormalize = (str) => str.replace(/-/g, " ");

// GET – načti všechny postavy
export async function GET() {
  try {
    await dbConnect();
    const heroes = await Hero.find().lean();

    const clean = heroes.map((hero) => ({
      ...hero,
      name: denormalize(hero.name),
      campaign: denormalize(hero.campaign),
    }));

    return NextResponse.json(clean);
  } catch (err) {
    console.error("❌ Error fetching heroes:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// POST – vytvoř novou postavu
export async function POST(req) {
  try {
    const {
      name,
      campaign,
      owner,
      dm,
      species,
      level,
      class: heroClass,
      ac,
      hp,
      str,
      dex,
      con,
      int,
      wis,
      cha,
      story,
      image,
    } = await req.json();

    if (!name || !campaign || !owner || !dm) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    const newHero = new Hero({
      name: normalize(name),
      campaign: normalize(campaign),
      owner: null,
      dm,
      species,
      level: Number(level) || 1,
      class: heroClass,
      ac: Number(ac) || 0,
      hp: Number(hp) || 0,
      str: Number(str) || 0,
      dex: Number(dex) || 0,
      con: Number(con) || 0,
      int: Number(int) || 0,
      wis: Number(wis) || 0,
      cha: Number(cha) || 0,
      story,
      image,
    });

    await newHero.save();

    return NextResponse.json(
      { message: "Hero created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Error creating hero:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PATCH – aktualizuj existující postavu
export async function PATCH(req) {
  try {
    const { name, updates } = await req.json();

    if (!name || !updates) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    await dbConnect();

    const normalizedName = normalize(name);

    const numberFields = [
      "level",
      "ac",
      "hp",
      "str",
      "dex",
      "con",
      "int",
      "wis",
      "cha",
    ];
    for (const field of numberFields) {
      if (updates[field] !== undefined) {
        updates[field] = Number(updates[field]) || 0;
      }
    }

    const hero = await Hero.findOneAndUpdate(
      { name: new RegExp(`^${normalizedName}$`, "i") },
      { $set: updates },
      { new: true }
    );

    if (!hero) {
      return NextResponse.json({ message: "Hero not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Hero updated", hero },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error updating hero:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
