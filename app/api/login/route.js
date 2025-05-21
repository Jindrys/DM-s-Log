// app/api/login/route.js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Missing username or password" },
        { status: 400 }
      );
    }

    await dbConnect();
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Login successful",
      username: user.username,
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
