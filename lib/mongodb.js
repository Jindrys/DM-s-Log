import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Chybí MONGODB_URI v .env souboru");
}

// Globální cache pro připojení (důležité pro Vercel / development)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: "ProjectDM", // nebo zadej přímo v URI
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
