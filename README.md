## AI Resume Analyzer (Next.js)

This is an MVP **AI Resume Analyzer** built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. It lets you upload a resume (PDF, DOCX, or TXT), sends the extracted text to an AI model, and shows strengths, weaknesses, and concrete suggestions.

### Features

- Upload resumes in **PDF**, **DOCX**, or **TXT** format (up to 5MB)
- Server-side text extraction using `pdf-parse` and `mammoth`
- AI-powered analysis via the OpenAI Node SDK
- Clear results UI: summary badges, strengths, areas to improve, and suggestions

### Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Create a `.env.local` file in the project root:

   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   # Optional, defaults to gpt-4.1-mini
   OPENAI_MODEL=gpt-4.1-mini
   ```

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Then open `http://localhost:3000` in your browser.

### How It Works

- `app/page.tsx` – Frontend upload form and results UI
- `app/api/analyze/route.ts` – API route that:
  - Accepts the uploaded file via `FormData`
  - Validates size and type
  - Extracts text using `lib/parseResume.ts`
  - Sends text to the AI client in `lib/aiClient.ts`
- `types/analysis.ts` – Shared TypeScript types for the analysis shape
- `components/ResultsView.tsx` – Renders the analysis summary and lists

### Manual Testing

- Try uploading:
  - A short test resume in **TXT** format to verify basic flow
  - A real resume in **PDF** or **DOCX** format
- Check that:
  - Errors appear for unsupported types or files larger than 5MB
  - You see strengths, weaknesses, and suggestions after successful analysis

Do not upload highly sensitive or confidential information; this is an educational/demo project.

