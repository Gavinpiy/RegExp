"use client";
import Prompt from "./components/Prompt";
import { useState, useEffect } from "react";

export default function Home() {
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [contentArray, setContentArray] = useState([]);

  // useEffect(() => {
  //   //console.log(choices);
  //   //console.log(content);
  //   //console.log(contentArray);
  // }, [content]);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-start gap-10 p-20 lg:p-26 
    "
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
    >
      <h1 className=" text-center text-4xl font-extrabold">
        Welcome to RegExpIt
      </h1>
      <div className="text-center flex flex-col gap-2 border-2 border-black rounded-lg bg-blue-100 p-4">
        <h2 className="text-center text-xl font-extrabold">Useful Links: </h2>
        <a
          href="https://www.w3schools.com/jsref/jsref_match.asp"
          target="_blank"
        >
          String.prototype.match()
        </a>
        <a
          href="https://www.w3schools.com/jsref/jsref_regexp_test.asp"
          target="_blank"
        >
          RegExp.prototype.test()
        </a>
        <a
          href="https://www.w3schools.com/jsref/jsref_search.asp"
          target="_blank"
        >
          String.prototype.search()
        </a>
      </div>

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
            setContent(result.choices[0].message.content);
            setContentArray(
              result.choices[0].message.content.split("<br></br>")
            );
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
        {Array.isArray(contentArray)
          ? contentArray.map((contentStr, index) => (
              <div
                className="border-solid border-black border-2 rounded-lg p-2 my-2 w-96 overflow-y-auto h-auto bg-white shadow-sm"
                key={index}
              >
                {contentStr}
                <br></br>
              </div>
            ))
          : null}
      </div>
    </main>
  );
}
