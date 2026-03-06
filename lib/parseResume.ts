import pdfParse from "pdf-parse";
import mammoth from "mammoth";

const MAX_TEXT_LENGTH = 20000;

export async function extractTextFromFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const mime = file.type;
  const name = file.name.toLowerCase();

  if (mime === "text/plain" || name.endsWith(".txt")) {
    const text = buffer.toString("utf8");
    return normalizeText(text);
  }

  if (mime === "application/pdf" || name.endsWith(".pdf")) {
    const data = await pdfParse(buffer);
    return normalizeText(data.text || "");
  }

  if (
    mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".docx")
  ) {
    const { value } = await mammoth.extractRawText({ buffer });
    return normalizeText(value || "");
  }

  throw new Error("Unsupported file type. Please upload PDF, DOCX, or TXT.");
}

function normalizeText(text: string): string {
  const cleaned = text.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim();
  if (cleaned.length > MAX_TEXT_LENGTH) {
    return cleaned.slice(0, MAX_TEXT_LENGTH);
  }
  return cleaned;
}

