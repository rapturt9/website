import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

// GET endpoint to serve the resume PDF as a proxy
export async function GET(request: Request) {
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

    // Generate ETag based on upload timestamp for cache validation
    const uploadTime = new Date(resumeBlob.uploadedAt).getTime();
    const etag = `"${uploadTime}"`;

    // Check if client has the latest version using If-None-Match header
    const ifNoneMatch = request.headers.get("if-none-match");
    if (ifNoneMatch === etag) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          ETag: etag,
          "Cache-Control": "public, max-age=300, must-revalidate",
        },
      });
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

    // Return the PDF with cache headers that invalidate when resume is updated
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=resume.pdf",
        "Cache-Control": "public, max-age=300, must-revalidate", // Cache for 5 minutes but revalidate
        ETag: etag,
        "Last-Modified": new Date(resumeBlob.uploadedAt).toUTCString(),
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
