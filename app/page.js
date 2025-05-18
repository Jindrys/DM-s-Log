import FavCamp from "./components/FavCamp";
import MainSpinner from "./components/MainSpinner";
import Navbar from "./components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black flex flex-col items-center">
      <main className="w-full h-fit flex flex-col justify-start items-center">
        <div className="absolute w-full flex items-center justify-center z-10 ">
          <Navbar />
        </div>
        <MainSpinner />
      </main>
      <section className="w-full flex flex-col items-center">
        <div className="w-full h-[180px] bg-linear-to-t from-[#978665] from-5% via-[#FBEFD8]  to-[#978665] to-95% border-x-8 mt-[20px]" />
        <div className="w-[95%] flex flex-col bg-[#FBEFD8]">
          <div className="uppercase text-[50px] px-5 mt-5 mx-10 flex-col flex gap-10">
            <h2 className="text-6xl font-gambarino underline">Get started</h2>
            <div className="flex w-full flex-wrap gap-5 justify-between px-8">
              <div className="w-[270px] p-6 text-black flex flex-col flex-wrap items-center gap-2 min-w-[200px] min-h-[250px]">
                <div className="relative flex justify-center ">
                  <div className="absolute top-0.5 text-white">1</div>
                  <Image
                    src="/stamp.png"
                    alt="stamp"
                    width={80}
                    height={80}
                    className="mb-4 size-[80px]"
                  />
                </div>
                <h2 className="text-[30px] font-bold text-center">
                  CREATE AN ACCOUNT
                </h2>
                <p className="text-sm text-black mt-2 text-center">
                  Sign up and set up your profile
                </p>
              </div>

              <div className="w-[270px] p-6 text-black flex flex-col flex-wrap items-center gap-2 min-w-[200px] min-h-[250px]">
                <div className="relative flex justify-center ">
                  <div className="absolute top-0.5 text-white">2</div>
                  <Image
                    src="/stamp.png"
                    alt="stamp"
                    width={80}
                    height={80}
                    className="mb-4 size-[80px]"
                  />
                </div>
                <h2 className="text-[30px] font-bold text-center">
                  CREATE/EXPLORE CAMPAIGNS
                </h2>
                <p className="text-sm text-black mt-2 text-center">
                  on your profile you can create/join campaigns you can explore
                  existing public campaigns
                </p>
              </div>

              <div className="w-[270px] p-6 text-black flex flex-col flex-wrap items-center gap-2 min-w-[200px] min-h-[250px]">
                <div className="relative flex justify-center ">
                  <div className="absolute top-0.5 text-white">3</div>
                  <Image
                    src="/stamp.png"
                    alt="stamp"
                    width={80}
                    height={80}
                    className="mb-4 size-[80px]"
                  />
                </div>
                <h2 className="text-[30px] font-bold text-center">
                  LOG YOUR SESSIONS
                </h2>
                <p className="text-sm text-black mt-2 text-center">
                  play D&D and save your sessions
                </p>
              </div>

              <div className="w-[270px] p-6 text-black flex flex-col flex-wrap items-center gap-2 min-w-[200px] min-h-[250px]">
                <div className="relative flex justify-center ">
                  <div className="absolute top-0.5 text-white">4</div>
                  <Image
                    src="/stamp.png"
                    alt="stamp"
                    width={80}
                    height={80}
                    className="mb-4 size-[80px]"
                  />
                </div>
                <h2 className="text-[30px] font-bold text-center">
                  SHARE WITH OTHERS
                </h2>
                <p className="text-sm text-black mt-2 text-center">
                  set your campains public to share with other players/fans
                </p>
              </div>
            </div>
          </div>
          <div className="uppercase text-[50px] px-5 mt-5 mx-10 flex-col flex gap-10">
            <h2 className="text-6xl font-gambarino underline">
              Favourite campaigns
            </h2>
            <div className="flex flex-wrap gap-5 justify-between items-center">
              <FavCamp />
              <FavCamp />
              <FavCamp />
              <FavCamp />
            </div>
          </div>
          <div className="uppercase text-[50px] px-5 mt-5 mx-10 flex-col flex gap-10 mb-10">
            <h2 className="text-6xl font-gambarino underline">about</h2>
            <div className="w-4/5 text-4xl flex flex-col gap-5 normal-case">
              <h3>
                Tool for managing and archiving campaigns from the game Dungeons
                & Dragons.
              </h3>
              <h3>
                Allows you to record important events, NPCs, and other game
                elements.
              </h3>
              <h3>
                Track characters – including descriptions, stats, and backstory.
              </h3>
              <h3>
                Option to create a user account Browse public campaigns created
                by other users.
              </h3>
              <h3>
                Create your own campaigns with tools for managing characters,
                storylines, and roles.
              </h3>
            </div>
          </div>
        </div>
        <footer className="w-full h-[180px] bg-linear-to-t from-[#978665] from-5% via-[#FBEFD8]  to-[#978665] to-95% border-x-8 flex flex-col gap-3 justify-center items-center">
          <p>&copy; 2025 DM's Log. All rights reserved.</p>
          <p class="mt-1">Made with love for Dungeons & Dragons enthusiasts.</p>
        </footer>
      </section>
    </div>
  );
}
