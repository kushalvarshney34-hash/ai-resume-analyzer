export type ResumeAnalysis = {
  summary: {
    name?: string;
    headline?: string;
    yearsOfExperience?: string;
    primaryRole?: string;
  };
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
};

export type ResumeAnalysisResponse =
  | {
      ok: true;
      analysis: ResumeAnalysis;
    }
  | {
      ok: false;
      error: string;
    };

