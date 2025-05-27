"use client";
import React, { useState } from "react";

function CampaignEditModal({ campaign, onClose, onSaved }) {
  const [formData, setFormData] = useState({
    name: campaign.name.replace(/-/g, " "),
    world: campaign.world || "",
    story: campaign.story || "",
  });

  const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, "-");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const updatedData = {
        name: normalize(formData.name),
        world: formData.world,
        story: formData.story,
      };

      const res = await fetch("/api/campaign", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: campaign.name, // původní název (už normalizovaný)
          updates: updatedData,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update failed");

      onSaved(result.campaign); // předáme nový campaign objekt zpět rodiči
    } catch (err) {
      console.error("❌ Error updating campaign:", err);
      alert("Failed to update campaign");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 w-[600px] rounded shadow-lg space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-gambarino underline uppercase">
          Edit Campaign
        </h2>

        <div>
          <label className="font-semibold block mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">World</label>
          <input
            name="world"
            value={formData.world}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Story</label>
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            className="w-full p-2 border rounded min-h-[150px]"
          />
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default CampaignEditModal;
