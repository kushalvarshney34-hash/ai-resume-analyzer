"use client";

import { FormEvent, useState } from "react";
import { ResultsView } from "@/components/ResultsView";
import { ResumeAnalysis, ResumeAnalysisResponse } from "@/types/analysis";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setAnalysis(null);

    if (!file) {
      setError("Please select a resume file to analyze.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsAnalyzing(true);
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData
      });

      const data = (await response.json()) as ResumeAnalysisResponse;

      if (!data.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setAnalysis(data.analysis);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="card space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">
            Get instant AI feedback on your resume
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Upload your resume (PDF, DOCX, or TXT) and receive strengths,
            potential gaps, and concrete suggestions to improve it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="flex-1 text-sm text-slate-200">
              <span className="mb-1 block text-xs font-medium text-slate-400">
                Resume file
              </span>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(event) => {
                  const selected = event.target.files?.[0] ?? null;
                  setFile(selected);
                  setError(null);
                  setAnalysis(null);
                }}
                className="w-full cursor-pointer rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs file:mr-3 file:rounded-md file:border-0 file:bg-sky-500 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-50 hover:border-slate-500"
              />
              <span className="mt-1 block text-xs text-slate-500">
                Accepted formats: PDF, DOCX, TXT. Max 5MB. Avoid confidential
                information.
              </span>
            </label>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="mt-1 inline-flex h-10 items-center justify-center rounded-lg bg-sky-500 px-4 text-sm font-medium text-slate-950 shadow-md shadow-sky-500/30 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isAnalyzing ? "Analyzing…" : "Analyze resume"}
            </button>
          </div>
        </form>

        {error && (
          <p className="text-sm text-rose-300" role="alert">
            {error}
          </p>
        )}

        {isAnalyzing && (
          <p className="text-sm text-slate-300">
            Analyzing your resume with AI. This usually takes a few seconds…
          </p>
        )}
      </section>

      {analysis && <ResultsView analysis={analysis} />}
    </div>
  );
}

