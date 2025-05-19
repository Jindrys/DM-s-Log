import React from "react";
import Image from "next/image";
import Link from "next/link";
import NoteCard from "../components/NoteCard";

function page() {
  return (
    <div className="bg-black py-10 flex flex-col items-center h-fit">
      <div className="w-[95%] h-fit flex flex-col items-center bg-[#F6EEE3] gap-10">
        <nav className="flex w-full h-fit mt-5 items-center justify-between border-b-2 pb-4 px-[80px]">
          <Link
            href="/user"
            className="text-6xl uppercase underline font-gambarino"
          >
            username
          </Link>
          <div className="underline text-2xl uppercase">invites {"(0)"}</div>
          <div className="underline text-2xl uppercase">create campaign</div>
          <Link href="/notes" className="underline text-2xl uppercase">
            notes
          </Link>
          <div className="underline text-xl uppercase bg-red-500/50 px-4 py-2 rounded">
            log out
          </div>
        </nav>
        <div className="px-6 py-2 uppercase border-2 rounded-[5px] bg-white">
          CREATE NEW NOTE
        </div>
        <div className="flex flex-wrap justify-between w-[90%] min-h-[75vh]">
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
        </div>
      </div>
    </div>
  );
}

export default page;
