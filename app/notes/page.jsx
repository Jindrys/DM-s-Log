"use client";
import React, { useState } from "react";
import NoteCard from "../components/NoteCard";
import UserNav from "../components/UserNav";

function Page() {
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleOpenNoteModal = () => setShowNoteModal(true);
  const handleCloseNoteModal = () => setShowNoteModal(false);
  const handleCreateNote = () => {
    setShowNoteModal(false);
  };

  return (
    <div className="bg-black py-10 flex flex-col items-center h-fit">
      <div className="w-[95%] h-fit flex flex-col items-center bg-[#F6EEE3] gap-10">
        <UserNav />

        <button
          onClick={handleOpenNoteModal}
          className="px-6 py-2 uppercase border-2 rounded-[5px] bg-white"
        >
          CREATE NEW NOTE
        </button>

        <div className="flex flex-wrap justify-between w-[90%] min-h-[75vh]">
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
        </div>
      </div>

      {/* NOTE MODAL */}
      {showNoteModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleCloseNoteModal}
        >
          <div
            className="bg-white p-6 w-[700px] rounded shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold underline uppercase font-gambarino">
              Create Note
            </h2>
            <input
              type="text"
              placeholder="Note Title"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Note Content"
              className="w-full p-2 border border-gray-300 rounded min-h-[200px]"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseNoteModal}
                className="px-4 py-2 font-gambarino rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNote}
                className="px-4 py-2 bg-gray-700 font-gambarino text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
