"use client";
import React, { useState } from "react";

function HeroEditModal({ hero, onClose, onSave }) {
  const [formData, setFormData] = useState({
    species: hero.species || "",
    level: hero.level || "",
    class: hero.class || "",
    ac: hero.ac || "",
    hp: hero.hp || "",
    str: hero.str || "",
    dex: hero.dex || "",
    con: hero.con || "",
    int: hero.int || "",
    wis: hero.wis || "",
    cha: hero.cha || "",
    story: hero.story || "",
    image: hero.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        console.error("Upload failed:", data.message);
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/hero", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: hero.name,
          updates: {
            ...formData,
            ac: Number(formData.ac),
            hp: Number(formData.hp),
            str: Number(formData.str),
            dex: Number(formData.dex),
            con: Number(formData.con),
            int: Number(formData.int),
            wis: Number(formData.wis),
            cha: Number(formData.cha),
            level: Number(formData.level),
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to update hero");

      onSave();
    } catch (err) {
      console.error("❌ Error updating hero:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 w-[700px] max-h-[90vh] overflow-y-auto rounded shadow-xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold underline uppercase font-gambarino">
          Edit Hero
        </h2>

        <input
          type="text"
          name="species"
          placeholder="Species"
          value={formData.species}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="level"
          placeholder="Level"
          value={formData.level}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="class"
          placeholder="Class"
          value={formData.class}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <div className="grid grid-cols-3 gap-3">
          {["ac", "hp", "str", "dex", "con", "int", "wis", "cha"].map(
            (stat) => (
              <input
                key={stat}
                type="number"
                name={stat}
                placeholder={stat.toUpperCase()}
                value={formData[stat]}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
            )
          )}
        </div>

        <textarea
          name="story"
          placeholder="Hero story"
          value={formData.story}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded min-h-[150px]"
        />

        <div>
          <label className="block font-semibold mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-2"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Hero preview"
              className="w-[200px] h-[200px] object-cover mt-2"
            />
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-700 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroEditModal;
