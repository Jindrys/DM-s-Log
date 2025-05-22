import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

// Pomocné funkce pro jména
const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, "-");
const denormalize = (str) => str.replace(/-/g, " ");

// Heslo musí mít min. 1 velké písmeno a 1 číslo
const passwordValid = (password) => {
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return hasUpper && hasNumber;
};

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

    if (!passwordValid(password)) {
      return NextResponse.json(
        { error: "Heslo musí obsahovat alespoň jedno velké písmeno a číslo." },
        { status: 400 }
      );
    }

    const normalizedUsername = normalize(username);

    const existingUser = await User.findOne({
      $or: [{ email }, { username: normalizedUsername }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Uživatel už existuje" },
        { status: 409 }
      );
    }

    const newUser = new User({
      username: normalizedUsername,
      email,
      password,
    });

    await newUser.save();

    return NextResponse.json({
      message: "Registrace proběhla úspěšně",
      username: denormalize(normalizedUsername),
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    return NextResponse.json({ error: "Chyba serveru" }, { status: 500 });
  }
}

// Volitelně: GET pro načítání uživatelů s denormalizovaným username
export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find().lean();

    const cleanUsers = users.map((user) => ({
      ...user,
      username: denormalize(user.username),
    }));

    return NextResponse.json(cleanUsers);
  } catch (err) {
    console.error("❌ Chyba při GET uživatelů:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
