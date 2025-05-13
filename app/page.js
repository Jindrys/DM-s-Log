import MainSpinner from "./components/MainSpinner";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="bg-black flex flex-col items-center">
      <main className="w-full h-fit bg-red-50 flex flex-col justify-start items-center">
        <div className="absolute w-full flex items-center justify-center ">
          <Navbar />
        </div>
        <MainSpinner />
      </main>
      <section className="w-full flex flex-col items-center">
        <div className="w-full h-[180px] bg-linear-to-t from-[#978665] from-5% via-[#FBEFD8]  to-[#978665] to-95% border-x-8 mt-[20px]">
          top scroll
        </div>
        <div className="w-[95%] flex flex-col bg-[#FBEFD8]">
          <div>get started</div>
          <div>favourite campains</div>
          <div>functions</div>
          <div>about</div>
        </div>
        <div className="w-full h-[180px] bg-linear-to-t from-[#978665] from-5% via-[#FBEFD8]  to-[#978665] to-95% border-x-8">
          bottom scroll
        </div>
      </section>
    </div>
  );
}
