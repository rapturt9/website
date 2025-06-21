import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

const GOOGLE_DOC_ID = "1c2gXIFkuPz5HlN5NWuTrSx8-jCarH17e7IpN_EcGyqo";
const GOOGLE_DOC_URL = `https://docs.google.com/document/d/${GOOGLE_DOC_ID}/export?format=pdf`;

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
    console.log(`📊 PDF size: ${pdfBuffer.byteLength} bytes`);

    console.log("☁️ Uploading to Vercel Blob...");

    console.log("Blob token used for upload:", blobToken);

    // Upload the PDF to Vercel Blob storage with explicit token
    const blob = await put("resume.pdf", Buffer.from(pdfBuffer), {
      access: "public",
      contentType: "application/pdf",
      token: blobToken, // Explicitly pass the token
      allowOverwrite: true,
    });

    console.log("✅ Resume updated successfully in Vercel Blob!");
    console.log("🔗 Blob URL:", blob.url);

    console.log("✅ Resume updated successfully in Vercel Blob!");

    return {
      message: `Resume updated successfully via ${
        isManual ? "manual trigger" : "cron job"
      }`,
      timestamp: new Date().toISOString(),
      docId: GOOGLE_DOC_ID,
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
