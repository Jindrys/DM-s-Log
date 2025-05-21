import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ message: "No file received" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public", "uploads", filename);

  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
