import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Note from "@/models/Note";

export async function POST(req) {
  try {
    const { title, content, creator } = await req.json();
    if (!title || !content || !creator) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await dbConnect();
    const newNote = new Note({ title, content, creator });
    await newNote.save();

    return NextResponse.json({ message: "Note created" }, { status: 201 });
  } catch (err) {
    console.error("❌ Error creating note:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const notes = await Note.find().lean();
    return NextResponse.json(notes);
  } catch (err) {
    console.error("❌ Error fetching notes:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }

    await dbConnect();
    await Note.findByIdAndDelete(id);

    return NextResponse.json({ message: "Note deleted" }, { status: 200 });
  } catch (err) {
    console.error("❌ Error deleting note:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
export async function PATCH(req) {
  try {
    const { id, title, content } = await req.json();
    if (!id || !title || !content) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await dbConnect();
    await Note.findByIdAndUpdate(id, { title, content });

    return NextResponse.json({ message: "Note updated" }, { status: 200 });
  } catch (err) {
    console.error("❌ Error updating note:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
