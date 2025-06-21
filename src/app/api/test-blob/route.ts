import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

// Test endpoint to verify Vercel Blob is working
export async function GET() {
  try {
    // Check if token exists
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (!blobToken) {
      return NextResponse.json(
        {
          status: "error",
          message: "BLOB_READ_WRITE_TOKEN environment variable is not set",
          suggestion:
            "Add BLOB_READ_WRITE_TOKEN to your .env.local file or Vercel environment variables",
          instructions: {
            local:
              "Edit .env.local and add: BLOB_READ_WRITE_TOKEN=your_token_here",
            production:
              "Go to Vercel Dashboard → Project → Settings → Environment Variables",
          },
        },
        { status: 500 }
      );
    }

    // Test if we can list blobs with explicit token
    const { blobs } = await list({
      token: blobToken,
    });

    return NextResponse.json({
      status: "success",
      message: "Vercel Blob is configured correctly",
      blobCount: blobs.length,
      tokenPresent: true,
      blobs: blobs.map((blob) => ({
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Vercel Blob configuration issue",
        error: error instanceof Error ? error.message : "Unknown error",
        tokenPresent: !!process.env.BLOB_READ_WRITE_TOKEN,
        suggestion:
          error instanceof Error && error.message.includes("Access denied")
            ? "Invalid token - get a new one from Vercel Dashboard → Storage → Blob"
            : "Make sure BLOB_READ_WRITE_TOKEN is set correctly",
      },
      { status: 500 }
    );
  }
}

// Test endpoint to upload a small test file
export async function POST() {
  try {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (!blobToken) {
      return NextResponse.json(
        {
          status: "error",
          message: "BLOB_READ_WRITE_TOKEN environment variable is not set",
        },
        { status: 500 }
      );
    }

    const testContent = "Test file created at " + new Date().toISOString();
    const blob = await put("test.txt", testContent, {
      access: "public",
      contentType: "text/plain",
      token: blobToken, // Explicitly pass the token
    });

    return NextResponse.json({
      status: "success",
      message: "Test file uploaded successfully",
      url: blob.url,
      size: testContent.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to upload test file",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
