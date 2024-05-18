"use client";
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
import CardSide from "../CardSide";

interface Note {
  id: string;
  title: string;
  // Add more properties as needed
}

function Notes() {
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
      const q = query(
        ordersRef,
        where("status", "==", "public"),
        orderBy("title")
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No documents found with status 'public'");
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

  return (
    <>
      {dataNotes.map((data, i) => (
        <>
          <CardSide key={data.id} name={data.title} author={data.id} />
        </>
      ))}
    </>
  );
}

export default Notes;
