import OpenAI from "openai";
import { ResumeAnalysis } from "@/types/analysis";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  // In dev this will surface as a runtime error when the API is called
  console.warn(
    "[AI] Missing OPENAI_API_KEY. Set it in your environment to enable analysis."
  );
}

const client = apiKey
  ? new OpenAI({
      apiKey
    })
  : null;

const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

function buildPrompt(resumeText: string): string {
  return [
    "You are an expert resume reviewer and career coach.",
    "Analyze the following resume text and respond ONLY with valid, minified JSON.",
    "JSON shape:",
    "{",
    '  "summary": {',
    '    "name": string | null,',
    '    "headline": string | null,',
    '    "yearsOfExperience": string | null,',
    '    "primaryRole": string | null',
    "  },",
    '  "strengths": string[],',
    '  "weaknesses": string[],',
    '  "suggestions": string[]',
    "}",
    "",
    "Guidelines:",
    "- strengths: concrete positives in skills, impact, clarity, and alignment.",
    "- weaknesses: gaps, vague bullets, missing metrics, formatting or structure issues.",
    "- suggestions: 3–7 specific, actionable improvements in imperative form.",
    "",
    "Resume:",
    "```",
    resumeText.slice(0, 12000),
    "```"
  ].join("\n");
}

export async function analyzeResumeWithAI(
  resumeText: string
): Promise<ResumeAnalysis> {
  if (!client) {
    throw new Error(
      "AI client is not configured. Set OPENAI_API_KEY in your environment."
    );
  }

  const prompt = buildPrompt(resumeText);

  const completion = await client.responses.create({
    model: MODEL,
    input: [
      {
        role: "user",
        content: [{ type: "input_text", text: prompt }]
      }
    ],
    max_output_tokens: 800
  });

  const text =
    completion.output[0].type === "message"
      ? completion.output[0].content[0].type === "output_text"
        ? completion.output[0].content[0].text
        : ""
      : "";

  try {
    const parsed = JSON.parse(text) as ResumeAnalysis;

    return {
      summary: parsed.summary || {},
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
      suggestions: parsed.suggestions || []
    };
  } catch (err) {
    throw new Error("Failed to parse AI response. Please try again.");
  }
}

