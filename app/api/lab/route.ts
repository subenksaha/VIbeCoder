import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextApiRequest) {
  const { code, prompt } = await req.json();
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: prompt
    },
    {
      role: "user",
      content: `Code: ${code}`,
    },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages,
      temperature: 0.7,
    });

    const answer = completion.choices[0]?.message?.content ?? "";
    console.log("OpenAI response:", answer);
    return NextResponse.json({ result: answer.trim() });
  } catch (error: unknown) {
    console.error("OpenAI API error:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Failed to get response from OpenAI" },
      { status: 500 }
    );
  }
}
