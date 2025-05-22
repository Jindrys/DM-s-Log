"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function UserNav() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invites, setInvites] = useState([]);
  const [createdMessage, setCreatedMessage] = useState("");

  const [name, setName] = useState("");
  const [dungeonMaster, setDungeonMaster] = useState("");
  const [players, setPlayers] = useState("");
  const [characters, setCharacters] = useState("");
  const [story, setStory] = useState("");
  const [world, setWorld] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [illustrationUrl, setIllustrationUrl] = useState("");

  // Load username from localStorage
  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) router.push("/login");
    setUsername(user.replace(/\s+/g, "-")); // normalize just in case
    setDungeonMaster(user.replace(/\s+/g, "-"));
  }, [router]);

  // Load invites
  useEffect(() => {
    if (!username) return;

    const fetchInvites = async () => {
      const res = await fetch(`/api/invites?player=${username}`);
      const data = await res.json();
      setInvites(data);
    };

    fetchInvites();
  }, [username]);

  const handleImageUpload = async (e, setUrl) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) setUrl(data.url);
      else console.error(data.message);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleCreateCampaign = async () => {
    const creator = username;
    const playerList = players.split(",").map((p) => p.trim());
    const characterList = characters.split(",").map((c) => c.trim());

    const campaignData = {
      name,
      creator,
      dungeonMaster,
      players: playerList,
      characters: characterList,
      story,
      world,
      thumbnail: thumbnailUrl,
      illustration: illustrationUrl,
    };

    try {
      const res = await fetch("/api/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaignData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create");

      setCreatedMessage("Campaign created!");
      setShowModal(false);
      setTimeout(() => setCreatedMessage(""), 3000);

      // Reset form
      setName("");
      setPlayers("");
      setCharacters("");
      setStory("");
      setWorld("");
      setThumbnailUrl("");
      setIllustrationUrl("");
    } catch (err) {
      console.error("❌ Create campaign error:", err);
    }
  };

  const handleInviteResponse = async (inviteId, action) => {
    try {
      await fetch("/api/invites", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteId, action }),
      });

      setInvites((prev) => prev.filter((inv) => inv._id !== inviteId));
    } catch (err) {
      console.error("❌ Failed to update invite:", err);
    }
  };

  return (
    <>
      <nav className="flex w-full h-fit mt-5 items-center justify-between border-b-2 pb-4 px-[80px]">
        <Link
          href={`/user/${username}`}
          className="text-6xl uppercase underline font-gambarino"
        >
          {username.replace(/-/g, " ")}
        </Link>

        <button
          onClick={() => setShowInviteModal(true)}
          className="underline text-2xl uppercase cursor-pointer  hover:text-[26px] transition-all duration-400"
        >
          invites ({invites.length})
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="underline text-2xl uppercase cursor-pointer  hover:text-3xl transition-all duration-400"
        >
          create campaign
        </button>

        <Link
          href="/notes"
          className="underline text-2xl uppercase  cursor-pointer hover:text-3xl transition-all duration-400"
        >
          notes
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("username");
            router.push("/login");
          }}
          className="underline text-xl text-black uppercase bg-gray-500/50 px-4 py-2 rounded  cursor-pointer hover:text-white hover:bg-gray-500 transition-all duration-400"
        >
          log out
        </button>
      </nav>

      {createdMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg z-50">
          {createdMessage}
        </div>
      )}

      {/* Modal: Create Campaign */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 w-[500px] space-y-4 shadow-xl">
            <h2 className="text-3xl font-gambarino underline uppercase font-bold">
              Create Campaign
            </h2>
            <input
              type="text"
              placeholder="Campaign Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Players (comma-separated)"
              value={players}
              onChange={(e) => setPlayers(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Characters (comma-separated)"
              value={characters}
              onChange={(e) => setCharacters(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="World"
              value={world}
              onChange={(e) => setWorld(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div>
              <label>Thumbnail Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setThumbnailUrl)}
              />
            </div>
            <div>
              <label>Illustration Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setIllustrationUrl)}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                className="px-4 py-2 bg-gray-700 text-white rounded cursor-pointer"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Invites */}
      {showInviteModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowInviteModal(false)}
        >
          <div
            className="bg-white p-6 w-[700px] shadow-xl rounded space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-gambarino underline uppercase">
              Campaign Invitations
            </h2>
            {invites.length === 0 ? (
              <p>No invites yet.</p>
            ) : (
              <ul className="space-y-3">
                {invites.map((invite) => (
                  <li
                    key={invite._id}
                    className="relative border p-3 rounded bg-gray-100"
                  >
                    You're invited to:{" "}
                    <strong>
                      {invite.campaignId?.name?.replace(/-/g, " ")}
                    </strong>
                    <div className="absolute flex gap-2 top-1/2 -translate-y-1/2 right-3">
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded"
                        onClick={() =>
                          handleInviteResponse(invite._id, "accepted")
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() =>
                          handleInviteResponse(invite._id, "declined")
                        }
                      >
                        Decline
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 underline font-gambarino rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserNav;
