"use client";
import { useState } from "react";

export default function Home() {
  const [choices, setChoices] = useState([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to RegExpIt</h1>
      <button
        onClick={async () => {
          try {
            const response = await fetch("/api/chat-gpt", {
              method: "POST",
              body: JSON.stringify({ soneData: true }),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setChoices(result.choices);
          } catch (error) {
            if (error && error.error) {
              console.error(error.error.message);
            } else {
              console.error(error);
            }
          }
        }}
      >
        Generate
      </button>
      <div>
        {choices.map((choice) => (
          <div key={choice.index}>{choice.message.content}</div>
        ))}
      </div>
    </main>
  );
}
