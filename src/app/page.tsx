import Button1 from "@/components/Button1";
import CardSide from "@/components/CardSide";
import Notes from "@/components/pages/Notes";
import Image from "next/image";

interface IframeComponentProps {
  src: string;
  height?: string;
}

export default function Home() {
  return (
    <main className="bg-[#D8F3FF] w-full h-full px-1 flex flex-col custom-scrollbar">
      <div className="w-full h-[8%] flex justify-between items-center ">
        <p className="uppercase text-2xl font-bold py-3 text-[#019CDE]">
          Welcome, Dafazan
        </p>
        <div className="flex gap-1 text-[#D8F3FF] h-full py-2">
          <Button1 text="GitHub" />
          <Button1 text="Insight" />
          <Button1 text="Logged in as DAFAZAN" />
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <p>
          THIS WAS A PERSONAL REPOSITORY, THERE IS NO NEED FOR FANCY UI DESIGN.
        </p>
        <p>
          ANYWAY, THERE IS COMPONENT WITH PREVIEW (HARD CODED TO THE WEB) AND
          THERE IS DYNAMIC CODE WITHOUT PREVIEW (STORED IN DATABASE){" "}
        </p>
      </div>
    </main>
  );
}
