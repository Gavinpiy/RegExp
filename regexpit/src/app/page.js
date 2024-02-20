"use client";
import Prompt from "./components/Prompt";
import { useState } from "react";

export default function Home() {
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to RegExpIt</h1>
      <Prompt
        loading={loading}
        onSubmit={async (prompt) => {
          setLoading(true);
          try {
            const response = await fetch("/api/chat-gpt", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                prompt: prompt,
              }),
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            setLoading(false);
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
      />

      <div>
        {choices.map((choice) => (
          <div
            className="border-solid border-black border-2 rounded-lg"
            key={choice.index}
          >
            {choice.message.content}
          </div>
        ))}
      </div>
    </main>
  );
}
