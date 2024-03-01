import React from "react";

function Card({ qty, name, diff }) {
  return (
    <div className="flex flex-col items-center m-2 py-7 bg-slate-700 bg-opacity-30 rounded-lg text-gray-900 shadow-md shadow-grey">
      <h6 className="text-4xl bg-clip-text bg-gradient-to-r from-sky-500 to-purple-500 text-transparent font-semibold">
        {name}
      </h6>
      <h3
        className={`leading-snug text-4xl ${
          diff ? "text-red-400" : "text-white"
        } font-bold `}
      >
        {qty}
      </h3>
    </div>
  );
}

export default Card;
