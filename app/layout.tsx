import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Resume Analyzer",
  description: "Analyze your resume with AI to get instant feedback and improvement suggestions."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-8">
          <header className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400" />
              <div>
                <h1 className="text-lg font-semibold tracking-tight">
                  AI Resume Analyzer
                </h1>
                <p className="text-xs text-slate-400">
                  Upload your resume and get instant AI-powered feedback.
                </p>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-500">
            Built with Next.js and AI. Do not upload sensitive or confidential
            information.
          </footer>
        </div>
      </body>
    </html>
  );
}

