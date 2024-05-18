import React from "react";

function Button1({ text }: { text: string }) {
  return (
    <button className="bg-[#019CDE] hover:bg-[#4dcaff] hover:text-[#019CDE] h-full px-5">
      {text}
    </button>
  );
}

export default Button1;
