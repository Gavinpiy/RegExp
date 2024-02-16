"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Regexpit</h1>
      <button
        onClick={async () => {
          const response = await fetch("/api/chat-gpt", {
            method: "POST",
            body: JSON.stringify({ soneData : true }),
          });
          console.log("response", response);
        }}
      >
        Generate
      </button>
    </main>
  );
}
