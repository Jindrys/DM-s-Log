import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema({
  username: { type: String, required: true },
  character: { type: String, default: "" },
  accepted: { type: Boolean, default: false },
});

const CampaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    creator: { type: String, required: true },
    dungeonMaster: { type: String, required: true },
    story: { type: String },
    world: { type: String },
    thumbnail: { type: String },
    illustration: { type: String },
    participants: [ParticipantSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Campaign ||
  mongoose.model("Campaign", CampaignSchema);
