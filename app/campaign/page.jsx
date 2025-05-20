import React from "react";
import Image from "next/image";
import Link from "next/link";
import UserNav from "../components/UserNav";

function page() {
  return (
    <div className="bg-black py-10 flex flex-col items-center h-fit">
      <div className="w-[95%] h-fit flex flex-col items-center bg-[#F6EEE3] gap-10">
        <UserNav />

        <div className="flex  w-[90%] h-fit justify-between">
          <div className="w-[50%] flex flex-col gap-2">
            <h2 className="font-gambarino underline uppercase text-6xl h-fit">
              Hesoyam dungeons
            </h2>
            <h4>DM - "dms nick"</h4>
            <h4>Players - "players nicks"</h4>
            <h3 className="font-gambarino underline uppercase text-4xl">
              main characters
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="font-gambarino text-2xl">
                  <Link href={"/hero"} className="underline cursor-pointer">
                    Hordur Everfinder
                  </Link>{" "}
                  - players nick
                </h4>
                <p>A dwarven cleric devoted to the god Moradin</p>
              </div>
              <div>
                <h4 className="font-gambarino text-2xl">
                  <Link href={"/hero"} className="underline cursor-pointer">
                    Criss
                  </Link>{" "}
                  - players nick
                </h4>
                <p>An Aasimar searching for the reason for of his existence</p>
              </div>
              <div>
                <h4 className="font-gambarino text-2xl">
                  <Link href={"/hero"} className="underline cursor-pointer">
                    Narcelia
                  </Link>{" "}
                  - players nick
                </h4>
                <p>A dark elf who doesn't even trust herself</p>
              </div>
              <div>
                <h4 className="font-gambarino text-2xl">
                  <Link href={"/hero"} className="underline cursor-pointer">
                    Arintal
                  </Link>{" "}
                  - players nick
                </h4>
              </div>
              <div>
                <h4 className="font-gambarino text-2xl">
                  <Link href={"/hero"} className="underline cursor-pointer">
                    Syrien
                  </Link>
                  - players nick
                </h4>
              </div>

              <div className="text-3xl underline font-gambarino uppercase">
                Main NPC'S
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 py-4 aspect-video">
            <Image
              src="/AZZENDRIEL.jpg"
              alt="Map image"
              width={1000}
              height={1000}
              className="w-full max-h-[450px]"
            />
            <h2 className="w-full flex justify-center text-5xl font-gambarino">
              WORLD: Azzendriel
            </h2>
          </div>
        </div>

        <div className="w-[90%] h-fit flex justify-between pb-8">
          <div className=" flex flex-col gap-5">
            <h2 className="font-gambarino underline uppercase text-6xl h-fit">
              Story
            </h2>
            <p className="text-[20px] text-justify">
              Rain drummed against the rooftops as villagers hid behind
              shuttered windows. In the distance, beyond hills cloaked in black
              pine forest, a pillar of blue fire rose once more. It was the
              third that week. And each time, someone vanished. In Azzendriel,
              fear was growing. Children stopped sleeping through the night,
              dogs howled at the shadows, and the temple stood silent. Even the
              priest of Moradin left without a word. At the site of the last
              disappearance—by an ancient well—a rune was found. No one could
              read it. No one except the old blind librarian, who said: “It is
              the seal of the Petrified Kings. And they are only to awaken when
              the world forgets what death is.” The words traveled. To the ears
              of those who couldn’t stand idle while the world crumbled. To
              those whose pasts were as fractured as the seals of ancient tombs.
              Their path led through marshlands, past the ruins of the forgotten
              city of Arviel, and into the depths of the lost fortress
              Udran-Khal, where the walls whispered the names of those who fell
              in the War of Gods. And there, the world split— The seal
              shattered. From the deep rose something that resembled a man, but
              its shadow moved differently. It spoke a language that hurt to
              hear. And when it raised a hand to the sky, the sun rose— black
              and cold.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
