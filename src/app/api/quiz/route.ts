import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const { language, level, goal, numQuestions } = await request.json();

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured");
    }

    // Initialize the Google Generative AI SDK
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use gemini-1.5-flash or adjust based on availability

    // Craft a prompt to generate quiz questions in JSON format
    const prompt = `
      Generate ${numQuestions} quiz questions for ${language} programming at ${level} level for ${goal} preparation. 
      Each question should have:
      - A unique ID (number)
      - A question text (string)
      - Four multiple-choice options (array of 4 strings)
      - A correct answer (string, matching one of the options)
      Return the response in JSON format, like this:
      [
        {
          "id": 1,
          "text": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correctAnswer": "Option 1"
        },
        ...
      ]
    `;

    // Generate content using the SDK
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the response as JSON
    let questions;
    try {
      // Remove potential markdown formatting (e.g., ```json ... ```)
      const cleanedText = responseText.replace(/```json\n|```/g, "").trim();
      questions = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      throw new Error("Invalid response format from Gemini API");
    }

    // Validate the response structure
    if (!Array.isArray(questions) || !questions.every(q => 
      q.id && q.text && Array.isArray(q.options) && q.options.length === 4 && q.correctAnswer
    )) {
      throw new Error("Generated questions do not match the expected format");
    }

    // Format questions to ensure consistent structure
    const formattedQuestions = questions.map((q: any, index: number) => ({
      id: q.id || index + 1,
      text: q.text,
      options: q.options,
      correctAnswer: q.correctAnswer,
    }));

    return NextResponse.json({ questions: formattedQuestions });
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz questions" },
      { status: 500 }
    );
  }
}