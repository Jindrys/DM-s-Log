"use client";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import UserNav from "../components/UserNav";

function Page() {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);

  const handleOpenNoteModal = () => setShowNoteModal(true);

  const handleCloseNoteModal = () => {
    setShowNoteModal(false);
    setNoteTitle("");
    setNoteContent("");
    setEditingNote(null);
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes");
      if (!res.ok) {
        console.error("❌ Error loading notes:", res.status);
        return;
      }

      const data = await res.json();
      const user = localStorage.getItem("username");
      setUsername(user);
      const userNotes = data.filter((note) => note.creator === user);
      setNotes(userNotes);
    } catch (err) {
      console.error("❌ Failed to load notes:", err);
    }
  };

  const handleSaveNote = async () => {
    const creator = localStorage.getItem("username");
    if (!noteTitle || !noteContent || !creator) return;

    try {
      const res = await fetch("/api/notes", {
        method: editingNote ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingNote
            ? { id: editingNote._id, title: noteTitle, content: noteContent }
            : { title: noteTitle, content: noteContent, creator }
        ),
      });

      if (!res.ok) throw new Error("Failed to save note");

      handleCloseNoteModal();
      fetchNotes();
    } catch (err) {
      console.error("❌ Error saving note:", err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const res = await fetch("/api/notes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete note");

      fetchNotes();
    } catch (err) {
      console.error("❌ Error deleting note:", err);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setShowNoteModal(true);
  };

  const handleCloseViewModal = () => {
    setViewingNote(null);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="bg-black py-10 flex flex-col items-center h-fit">
      <div className="w-[95%] h-fit flex flex-col items-center bg-[#F6EEE3] gap-10">
        <UserNav />

        <button
          onClick={handleOpenNoteModal}
          className="px-6 py-2 uppercase border-2 rounded-[5px] bg-white cursor-pointer hover:bg-gray-400 hover:text-white hover:border-black transition-all duration-400"
        >
          {editingNote ? "EDIT NOTE" : "CREATE NEW NOTE"}
        </button>

        <div className="flex flex-wrap justify-between w-[90%] min-h-[75vh]">
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={handleDeleteNote}
                onEdit={handleEditNote}
                onView={setViewingNote}
              />
            ))
          ) : (
            <p className="text-2xl">No notes yet.</p>
          )}
        </div>
      </div>

      {/* MODAL – Create / Edit */}
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
              {editingNote ? "Edit Note" : "Create Note"}
            </h2>
            <input
              type="text"
              placeholder="Note Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Note Content"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
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
                onClick={handleSaveNote}
                className="px-4 py-2 bg-gray-700 font-gambarino text-white rounded"
              >
                {editingNote ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL – View */}
      {viewingNote && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={handleCloseViewModal}
        >
          <div
            className="bg-white max-w-[700px] w-full max-h-[80vh] overflow-y-auto p-6 rounded shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold underline uppercase font-gambarino">
              {viewingNote.title}
            </h2>
            <p className="text-base whitespace-pre-line">
              {viewingNote.content}
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCloseViewModal}
                className="px-4 py-2 font-gambarino bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
