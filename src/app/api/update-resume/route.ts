import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { readFile } from "fs/promises";
import path from "path";

// Source of truth is a static PDF committed to the repo (public/resume-source.pdf),
// built and verified to be exactly 1 page via a local LibreOffice render pipeline.
// Previously this fetched a Google Docs export, which used Google's default
// formatting (wide margins, generous spacing) and rendered as 3 pages — switched
// away from that entirely rather than fight Google Docs formatting to match.
const RESUME_SOURCE_PATH = path.join(process.cwd(), "public", "resume-source.pdf");

async function updateResume(isManual: boolean = false) {
  try {
    const logPrefix = isManual ? "🚀 Manual" : "🔄 Automated";
    console.log(
      `${logPrefix} resume update started at:`,
      new Date().toISOString()
    );

    // Check if blob token is available
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    console.log("🔑 Blob token status:", blobToken ? "Available" : "Missing");

    if (!blobToken) {
      throw new Error(
        "BLOB_READ_WRITE_TOKEN environment variable is not set. Please configure it in your Vercel dashboard."
      );
    }

    console.log("📄 Reading resume from public/resume-source.pdf...");

    const pdfBuffer = await readFile(RESUME_SOURCE_PATH);
    console.log(`📊 PDF size: ${pdfBuffer.byteLength} bytes`);

    console.log("☁️ Uploading to Vercel Blob...");

    // Upload the PDF to Vercel Blob storage with explicit token
    const blob = await put("resume", pdfBuffer, {
      access: "public",
      contentType: "application/pdf",
      token: blobToken, // Explicitly pass the token
      allowOverwrite: true,
    });

    console.log("✅ Resume updated successfully in Vercel Blob!");
    console.log("🔗 Blob URL:", blob.url);

    return {
      message: `Resume updated successfully via ${
        isManual ? "manual trigger" : "cron job"
      }`,
      timestamp: new Date().toISOString(),
      source: "public/resume-source.pdf",
      type: isManual ? "manual" : "automated",
      size: pdfBuffer.byteLength,
      blobUrl: blob.url,
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

// Handle manual update requests (POST)
export async function POST() {
  try {
    const result = await updateResume(true);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update resume manually",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        type: "manual",
      },
      { status: 500 }
    );
  }
}
