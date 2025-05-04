import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    // Validate request body
    const body = await request.json();
    const { type, role, level, techstack, amount, userid } = body;

    if (!type || !role || !level || !techstack || !amount || !userid) {
      return Response.json(
        { 
          success: false, 
          error: "Missing required fields" 
        }, 
        { status: 400 }
      );
    }

    // Generate questions
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    // Validate questions response
    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(questions);
      if (!Array.isArray(parsedQuestions)) {
        throw new Error("Questions must be an array");
      }
    } catch (parseError) {
      console.error("Failed to parse questions:", parseError);
      return Response.json(
        { 
          success: false, 
          error: "Failed to generate valid questions format" 
        }, 
        { status: 500 }
      );
    }

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    // Save to database
    try {
      await db.collection("interviews").add(interview);
    } catch (dbError) {
      console.error("Database error:", dbError);
      return Response.json(
        { 
          success: false, 
          error: "Failed to save interview to database" 
        }, 
        { status: 500 }
      );
    }

    return Response.json({ success: true, data: interview }, { status: 200 });
  } catch (error) {
    console.error("Error details:", error);
    return Response.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}

