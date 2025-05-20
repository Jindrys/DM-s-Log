"use client";
import Link from "next/link";
import React, { useState } from "react";

function UserNav() {
  const [showModal, setShowModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [createdMessage, setCreatedMessage] = useState("");

  // Mocknuté invite data
  const invites = [
    { id: 1, campaign: "Shadowfall", role: "Dungeon Master" },
    { id: 2, campaign: "Frost Realm", role: "Player" },
  ];

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenInviteModal = () => setShowInviteModal(true);
  const handleCloseInviteModal = () => setShowInviteModal(false);

  const handleCreateCampaign = () => {
    setShowModal(false);
    setCreatedMessage("Campaign created!");
    setTimeout(() => setCreatedMessage(""), 3000);
  };

  return (
    <>
      <nav className="flex w-full h-fit mt-5 items-center justify-between border-b-2 pb-4 px-[80px]">
        <Link
          href="/user/xxx"
          className="text-6xl uppercase underline font-gambarino"
        >
          username
        </Link>

        {/* INVITES */}
        <button
          onClick={handleOpenInviteModal}
          className="underline text-2xl uppercase"
        >
          invites ({invites.length})
        </button>

        {/* CREATE CAMPAIGN */}
        <button
          onClick={handleOpenModal}
          className="underline text-2xl uppercase"
        >
          create campaign
        </button>

        <Link href="/notes" className="underline text-2xl uppercase">
          notes
        </Link>
        <Link
          href="/login"
          className="underline text-xl uppercase bg-red-500/50 px-4 py-2 rounded"
        >
          log out
        </Link>
      </nav>

      {createdMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg z-50">
          {createdMessage}
        </div>
      )}

      {/* CREATE CAMPAIGN MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 w-[500px] space-y-4 shadow-xl">
            <h2 className="text-3xl font-gambarino underline uppercase font-bold">
              Create Campaign
            </h2>
            <input
              type="text"
              placeholder="Campaign Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Dungeon Master - creator/e-mail"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div>
              <h3 className="font-gambarino">
                Write players on same place as their characters
              </h3>
              <input
                type="text"
                placeholder="Players - e-mail"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <input
              type="text"
              placeholder="Characters"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div>
              <h3>Import an illustration image</h3>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="w-full p-2 border border-gray-300 rounded cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-gray-700 hover:file:bg-blue-100"
              />
            </div>
            <input
              type="text"
              placeholder="World"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Story"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                className="px-4 py-2 bg-gray-700 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INVITES MODAL */}
      {showInviteModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleCloseInviteModal}
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
                    key={invite.id}
                    className="relative border p-3 rounded shadow-sm bg-gray-100"
                  >
                    You were invited as{" "}
                    <strong className="font-poppins font-bold">
                      {invite.role}
                    </strong>{" "}
                    to{" "}
                    <span className="font-poppins font-bold">
                      {invite.campaign}
                    </span>
                    <div className="absolute flex gap-2 top-1/2 -translate-y-1/2 right-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-7 border rounded bg-green-300/50 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-7 border rounded bg-red-300/50 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleCloseInviteModal}
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
