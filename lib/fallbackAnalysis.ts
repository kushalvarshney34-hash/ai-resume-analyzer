import { ResumeAnalysis } from "@/types/analysis";

const COMMON_SKILLS = [
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node",
  "python",
  "java",
  "c++",
  "sql",
  "mongodb",
  "postgres",
  "aws",
  "docker",
  "kubernetes",
  "git",
  "rest",
  "graphql"
];

function firstNonEmptyLine(text: string): string | undefined {
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed) return trimmed;
  }
  return undefined;
}

function guessName(text: string): string | undefined {
  const line = firstNonEmptyLine(text);
  if (!line) return undefined;
  // Avoid using emails/phones as a "name"
  if (/@/.test(line) || /\d{7,}/.test(line)) return undefined;
  return line.slice(0, 60);
}

function hasNumbers(text: string): boolean {
  return /\b\d+(\.\d+)?\b/.test(text);
}

function extractSkills(text: string): string[] {
  const lower = text.toLowerCase();
  const found = COMMON_SKILLS.filter((s) => lower.includes(s));
  // Keep it short for UI
  return found.slice(0, 8);
}

export function analyzeResumeFallback(resumeText: string): ResumeAnalysis {
  const name = guessName(resumeText);
  const numbers = hasNumbers(resumeText);
  const skills = extractSkills(resumeText);

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  if (skills.length > 0) {
    strengths.push(`Relevant keywords detected: ${skills.join(", ")}.`);
  } else {
    weaknesses.push("Skills/keywords are not clearly listed or easy to scan.");
    suggestions.push(
      "Add a dedicated Skills section with tools, languages, and frameworks (ATS-friendly keywords)."
    );
  }

  if (numbers) {
    strengths.push("Some quantified details were found (numbers/metrics).");
  } else {
    weaknesses.push("Bullets may be hard to evaluate without metrics or impact.");
    suggestions.push(
      "Rewrite experience bullets using measurable impact (%, $, time saved, users, scale)."
    );
  }

  if (!/experience|work|employment/i.test(resumeText)) {
    weaknesses.push("Work experience section is not clearly labeled.");
    suggestions.push(
      "Add a clearly labeled Work Experience section with role, company, dates, and 3–5 impact bullets."
    );
  } else {
    strengths.push("Experience content appears to be present.");
  }

  suggestions.push(
    "Start each bullet with a strong action verb and keep bullets to 1–2 lines."
  );
  suggestions.push(
    "Tailor the top 1/3 of the resume (headline + summary + key skills) to the role you want."
  );

  return {
    summary: {
      name,
      headline: "Demo mode analysis (set OPENAI_API_KEY for full AI)",
      primaryRole: undefined,
      yearsOfExperience: undefined
    },
    strengths: strengths.slice(0, 6),
    weaknesses: weaknesses.slice(0, 6),
    suggestions: suggestions.slice(0, 7)
  };
}

