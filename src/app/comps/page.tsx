"use client";
import Button1 from "@/components/Button1";
import CardSide from "@/components/CardSide";
import Notes from "@/components/pages/Notes";
import Image from "next/image";

import { useEffect, useState } from "react";
import { db } from "@/database/firebase";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
  orderBy,
  Firestore,
  serverTimestamp,
} from "firebase/firestore";
import AudioVisualizer from "@/components/pages/AudioVisualizer";
import BarChart from "@/components/pages/BarChart";
import BarChartVertical from "@/components/pages/BarChart2";
import AudViz from "@/components/pages/AudViz";
import AudVizCode from "@/components/pages/AudVizCode";

interface Note {
  id: string;
  title: string;
  // Add more properties as needed
}

function Comps() {
  const [detail, setDetail] = useState(0);
  const [mode, setMode] = useState(0);

  const [dataNotes, setDataNotes] = useState<Note[]>([]);
  const [dataNotesResult, setDataNotesResult] = useState<Note[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: string) => {
    setSearch(e);
    const searchTerm = e.toLowerCase();
    const results = dataNotes.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );
    setDataNotesResult(results);
  };

  useEffect(() => {
    getDataNotes();
  }, []);
  async function getDataNotes() {
    try {
      const ordersRef = collection(db, "notes");
      const q = query(ordersRef, orderBy("title"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No documents found.");
        return;
      }

      let data: Note[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...(doc.data() as Note), id: doc.id });
      });
      setDataNotes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  const handleCardClick = (num: number) => {
    setDetail(num);
    setMode(0);
  };

  return (
    <main className="bg-[#D8F3FF] w-full h-full px-1 flex flex-col custom-scrollbar">
      <div className="w-full h-[8%] flex justify-between items-center ">
        <p className="uppercase text-2xl font-bold py-3 text-[#019CDE]">
          Components Library
        </p>
        <div className="flex gap-1 text-[#D8F3FF] h-full py-2">
          <Button1 text="GitHub" />
          <Button1 text="Insight" />
          <Button1 text="Logged in as DAFAZAN" />
        </div>
      </div>
      <div className="w-full flex h-[94%] gap-1">
        <div className=" w-52 h-full py-1 flex flex-col gap-1 ">
          <div className="flex w-full h-full flex-col gap-1">
            <div className="bg-[#019CDE] p-1">
              <input
                type="text"
                className="border-b border-[#D8F3FF] focus:outline-none bg-transparent w-full text-[#D8F3FF] placeholder-text-color"
                placeholder="Enter text..."
              />
            </div>
            <div className="w-full h-full flex flex-col gap-1 pb-5 overflow-y-scroll">
              {/* onClick={} */}
              <CardSide
                act={() => handleCardClick(1)}
                name="HORIZONTAL BAR CHART"
                author="DAFFA"
              />
              <CardSide
                act={() => handleCardClick(2)}
                name="VERTICAL BAR CHART"
                author="DAFFA"
              />
              <CardSide
                act={() => handleCardClick(3)}
                name="AUDIO VISUALIZER"
                author="DAFFA"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col py-1">
          <div className="bg-[#019CDE] w-full flex p-1 pb-0 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setMode(0)}
                className={`text-xs hover:bg-[#D8F3FF] hover:text-[#019CDE] ${
                  mode == 0 ? "text-[#019CDE] bg-[#D8F3FF]" : "text-[#D8F3FF]"
                } p-2`}
              >
                PREVIEW
              </button>
              <button
                onClick={() => setMode(1)}
                className={`text-xs hover:bg-[#D8F3FF] hover:text-[#019CDE] ${
                  mode == 1 ? "text-[#019CDE] bg-[#D8F3FF]" : "text-[#D8F3FF]"
                } p-2`}
              >
                CODE
              </button>
            </div>
            <div>
              <button className="text-xs hover:bg-[#D8F3FF] text-[#D8F3FF] hover:text-[#019CDE] p-2">
                {detail}
              </button>
            </div>
          </div>
          <div className="bg-[#D8F3FF] border-4 border-[#019CDE] w-full h-full mb-5">
            {detail == 1 ? (
              <>
                {mode == 0 ? (
                  <>
                    <div>1 Prev</div>
                  </>
                ) : mode == 1 ? (
                  <>
                    <div>1 Code</div>
                  </>
                ) : null}
              </>
            ) : detail == 2 ? (
              <>
                {mode == 0 ? (
                  <>
                    <div>2 Prev</div>
                  </>
                ) : mode == 1 ? (
                  <>
                    <div>2 Code</div>
                  </>
                ) : null}
              </>
            ) : detail == 3 ? (
              <>
                {mode == 0 ? (
                  <>
                    <AudViz />
                  </>
                ) : mode == 1 ? (
                  <>
                    <AudVizCode />
                  </>
                ) : null}
              </>
            ) : detail == 4 ? (
              <>
                {mode == 0 ? (
                  <>
                    <div>4 Prev</div>
                  </>
                ) : mode == 1 ? (
                  <>
                    <div>4 Code</div>
                  </>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Comps;
