import React from "react";

function NoteCard() {
  return (
    <div className="w-[250px] h-[300px] border-2 bg-white rounded-[8px] flex flex-col items-center py-3">
      <h2 className="text-2xl">Note name</h2>
      <div className="w-full h-fit text-xl px-3 text-wrap text-ellipsis ">
        <p className="text-ellipsis w-full overflow-hidden">note text here</p>
      </div>
    </div>
  );
}

export default NoteCard;
