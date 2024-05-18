import React from "react";

function CardSide({
  name,
  author,
  act,
}: {
  name: string;
  author: string;
  act: any;
}) {
  return (
    <button
      onClick={act}
      className="p-2 bg-[#019CDE] hover:bg-[#ace6ff] hover:text-[#019CDE] flex flex-col text-[#D8F3FF] "
    >
      <p className="line-clamp-1 text-sm">{name}</p>
      <p className="line-clamp-1 text-xs">by: {author}</p>
    </button>
  );
}

export default CardSide;
