import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    campaign: { type: String, required: true },
    owner: { type: String, default: null },
    dm: { type: String, required: true },
    index: { type: Number, required: true },
    species: { type: String, default: "" },
    level: { type: Number, default: 1 },
    class: { type: String, default: "" },
    ac: { type: Number, default: 0 },
    hp: { type: Number, default: 0 },
    str: { type: Number, default: 0 },
    dex: { type: Number, default: 0 },
    con: { type: Number, default: 0 },
    int: { type: Number, default: 0 },
    wis: { type: Number, default: 0 },
    cha: { type: Number, default: 0 },
    story: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Hero || mongoose.model("Hero", HeroSchema);
