import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

// GET endpoint to serve the resume PDF as a proxy
export async function GET() {
  try {
    // Check if blob token is available
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (!blobToken) {
      return NextResponse.json(
        {
          error: "BLOB_READ_WRITE_TOKEN environment variable is not set",
        },
        { status: 500 }
      );
    }

    // List all blobs and find the resume.pdf
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
        },
        { status: 404 }
      );
    }

    // Fetch the PDF from the blob URL
    const pdfResponse = await fetch(resumeBlob.url);

    if (!pdfResponse.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch resume from blob storage",
        },
        { status: 500 }
      );
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    // Return the PDF with appropriate headers
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=resume.pdf",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error serving resume:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
