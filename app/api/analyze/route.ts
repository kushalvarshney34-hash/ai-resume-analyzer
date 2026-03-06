import { NextRequest, NextResponse } from "next/server";
import { extractTextFromFile } from "@/lib/parseResume";
import { analyzeResumeWithAI } from "@/lib/aiClient";
import { analyzeResumeFallback } from "@/lib/fallbackAnalysis";
import { ResumeAnalysisResponse } from "@/types/analysis";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      const res: ResumeAnalysisResponse = {
        ok: false,
        error: "No file uploaded. Please select a resume to analyze."
      };
      return NextResponse.json(res, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const res: ResumeAnalysisResponse = {
        ok: false,
        error: "File is too large. Please upload a file under 5MB."
      };
      return NextResponse.json(res, { status: 400 });
    }

    const text = await extractTextFromFile(file);

    if (!text || text.length < 200) {
      const res: ResumeAnalysisResponse = {
        ok: false,
        error:
          "Could not extract enough text from this file. Please upload a clearer resume."
      };
      return NextResponse.json(res, { status: 400 });
    }

    const hasKey =
      typeof process.env.OPENAI_API_KEY === "string" &&
      process.env.OPENAI_API_KEY.trim().length > 0;

    const analysis = hasKey ? await analyzeResumeWithAI(text) : analyzeResumeFallback(text);

    const res: ResumeAnalysisResponse = {
      ok: true,
      analysis
    };

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error("[API] /api/analyze error", error);

    const message =
      error instanceof Error && error.message
        ? error.message
        : "Something went wrong while analyzing your resume. Please try again.";

    // Provide a clearer error for missing AI configuration
    if (message.toLowerCase().includes("openai_api_key")) {
      const res: ResumeAnalysisResponse = {
        ok: false,
        error: message
      };
      return NextResponse.json(res, { status: 500 });
    }

    // In development, return the error message to speed up debugging
    if (process.env.NODE_ENV !== "production" && message) {
      const res: ResumeAnalysisResponse = {
        ok: false,
        error: message
      };
      return NextResponse.json(res, { status: 500 });
    }

    const res: ResumeAnalysisResponse = {
      ok: false,
      error:
        "Something went wrong while analyzing your resume. Please try again."
    };
    return NextResponse.json(res, { status: 500 });
  }
}

