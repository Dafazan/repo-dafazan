import React from "react";

function Sidebar() {
  return (
    <div className="w-50 h-screen bg-[#019CDE] flex flex-col items-center p-2">
      <a className="w-full flex justify-center border-b-2 border-[#D8F3FF]">
        <img src="/drp.svg" alt="" />
      </a>
      <div className="w-full flex flex-col items-center text-center py-3 text-sm font-semibold text-[#D8F3FF] gap-1">
        <a href="/comps">Components</a>
        <a href="/lays">Layouts</a>
        <a href="/notes">Notes</a>
        <a href="/shortens">URL Shortener</a>
        <a href="/libs">Library</a>
      </div>
    </div>
  );
}

export default Sidebar;
