import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Vyplň všechna pole" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { error: "Uživatel už existuje" },
        { status: 409 }
      );
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return NextResponse.json({ message: "Registrace proběhla úspěšně" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Chyba serveru" }, { status: 500 });
  }
}
