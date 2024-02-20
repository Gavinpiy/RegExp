import React from "react";
import { useState } from "react";

export default function Prompt({onSubmit, loading}) {
  const [prompt, setPrompt] = useState("");
  return (
    <form
      className=" flex-col p-2 block mx-auto border-2 border-black rounded-lg bg-gray-200"
      onSubmit={(e) => {
        e.preventDefault();

        if (prompt === "") {
          return;
        }
        onSubmit(prompt);
        setPrompt("");
      }}
    >
      <label>Questions</label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <input type="submit" disabled={loading}/>
    </form>
  );
}
