import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(request) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  //user input
  const params = await request.json();

  //pass to chatgpt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "I will be asking you to give me regular expressions for use in javascript unless told otherwise. Please be concise and give me in the format of RegExp: RegExp. <br></br> Explanation: Explanation of what the symbols mean <br></br> Example: Example. ",
      },
      { role: "user", content: params.prompt }, //user string
    ],
    temperature: 0,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return NextResponse.json(response);
}
