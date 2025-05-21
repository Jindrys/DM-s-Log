import mongoose from "mongoose";

const InviteSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    player: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Invite || mongoose.model("Invite", InviteSchema);
