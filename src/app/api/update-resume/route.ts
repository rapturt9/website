import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const GOOGLE_DOC_ID = "1c2gXIFkuPz5HlN5NWuTrSx8-jCarH17e7IpN_EcGyqo";
const GOOGLE_DOC_URL = `https://docs.google.com/document/d/${GOOGLE_DOC_ID}/export?format=pdf`;

async function updateResume(isManual: boolean = false) {
  try {
    const logPrefix = isManual ? "🚀 Manual" : "🔄 Automated";
    console.log(
      `${logPrefix} resume update started at:`,
      new Date().toISOString()
    );

    console.log("📄 Fetching latest resume from Google Doc...");

    // Fetch the PDF directly from Google Docs
    const response = await fetch(GOOGLE_DOC_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch resume: ${response.status} ${response.statusText}`
      );
    }

    const pdfBuffer = await response.arrayBuffer();

    // Write the PDF to the public directory
    const publicDir = path.join(process.cwd(), "public");
    const resumePath = path.join(publicDir, "resume.pdf");

    await fs.writeFile(resumePath, Buffer.from(pdfBuffer));

    console.log("✅ Resume updated successfully!");

    return {
      message: `Resume updated successfully via ${
        isManual ? "manual trigger" : "cron job"
      }`,
      timestamp: new Date().toISOString(),
      docId: GOOGLE_DOC_ID,
      type: isManual ? "manual" : "automated",
      size: pdfBuffer.byteLength,
    };
  } catch (error) {
    console.error("❌ Error updating resume:", error);
    throw error;
  }
}

// Handle cron job requests (GET)
export async function GET() {
  try {
    const result = await updateResume(false);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update resume via cron job",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        type: "automated",
      },
      { status: 500 }
    );
  }
}
