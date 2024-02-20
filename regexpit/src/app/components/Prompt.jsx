import React from "react";
import { useState } from "react";

export default function Prompt({onSubmit, loading}) {
  const [prompt, setPrompt] = useState("");
  return (
    <form
      className=" flex-col p-2 block mx-auto w-full  border-2 border-black rounded-lg bg-gray-200"
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
      <div className="flex gap-2 items-center"><input type="submit" disabled={loading}
      className="bg-blue-200 rounded-sm my-1 flex justify-end"/>
      <p className={loading ? "block" : "hidden"} > Loading...</p></div>
      
    </form>
  );
}
