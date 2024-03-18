import React from "react";
import { useState } from "react";

export default function Prompt({ onSubmit, loading }) {
  const [prompt, setPrompt] = useState("");
  return (
    <form
      className=" flex-col p-2 block mx-auto w-[80%] max-w-[700px] border-2 border-black rounded-lg bg-blue-100"
      onSubmit={(e) => {
        e.preventDefault();

        if (prompt === "") {
          return;
        }
        onSubmit(prompt);
        setPrompt("");
      }}
    >
      <label>What Regular Expression do you need?</label>
      <input
        className="border-2 border-black rounded-lg h-20 w-full flex  overflow-y-auto p-2 my-2"
        type="text"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <div className="flex justify-end gap-2 items-center">
        <p className={loading ? "block" : "hidden"}> Loading...</p>
        <input
          type="submit"
          disabled={loading}
          className="bg-gray-800 rounded-lg my-1 flex border-solid border-black border-2 p-1 text-slate-300 hover:bg-gray-600 hover:border-gray-400 hover:text-white"
        />
      </div>
    </form>
  );
}
