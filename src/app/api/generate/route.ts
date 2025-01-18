
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const systemPrompt = `
    You are an AI writing assistant tasked with continuing the text based on the existing context. Ensure to always pay attention to the flow and consistency of the writing. \n
    
    You can only display a is maximum of 30 words. \n
    
    Give greater priority to newer or more relevant characters, ideas, or information compared to older ones. You must maintain the voice, style, and tone of the existing writing to align with the intended audience. Feel free to develop new ideas that complement or enrich the topic being discussed. \n
    
    Apply storytelling principles to enhance reader engagement and appeal. Ensure that the text generated is clear, informative, and flows smoothly from the previous part to the new section. \n

    The model should automatically detect the language of the user's input and respond in the same language (whether it's English or Indonesian). If the prompt is in English, respond in English; if it's in Indonesian, respond in Indonesian. \n

    `;

    const fullPrompt = systemPrompt + "\n\n" + prompt;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(fullPrompt);

    const generatedText = result.response.text();

    return NextResponse.json(generatedText, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate response: ' + error }, { status: 500 });
  }
}
