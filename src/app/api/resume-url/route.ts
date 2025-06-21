import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

// GET endpoint to retrieve the current resume blob URL
export async function GET() {
  try {
    // Check if blob token is available
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (!blobToken) {
      return NextResponse.json(
        {
          error: "BLOB_READ_WRITE_TOKEN environment variable is not set",
          fallbackUrl: "/resume.pdf",
        },
        { status: 500 }
      );
    }

    // List all blobs and find the resume.pdf with explicit token
    const { blobs } = await list({
      token: blobToken,
    });

    // Find the most recent resume.pdf blob
    const resumeBlob = blobs
      .filter((blob) => blob.pathname === "resume.pdf")
      .sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      )[0];

    if (!resumeBlob) {
      return NextResponse.json(
        {
          error: "Resume not found in blob storage",
          fallbackUrl: "/resume.pdf", // Fallback to static file if exists
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      url: resumeBlob.url,
      lastUpdated: resumeBlob.uploadedAt,
      size: resumeBlob.size,
    });
  } catch (error) {
    console.error("Error fetching resume URL:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch resume URL",
        fallbackUrl: "/resume.pdf", // Fallback to static file
      },
      { status: 500 }
    );
  }
}
