"use client";

import { useState, useEffect } from "react";
import { Download, FileText, RefreshCw } from "lucide-react";

export function Resume() {
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);
  const resumeUrl = "/resume"; // Use proxy endpoint

  useEffect(() => {
    // Fetch the last updated time from blob storage
    const fetchResumeInfo = async () => {
      try {
        const response = await fetch("/resume-url");
        if (response.ok) {
          const data = await response.json();
          setLastUpdated(
            new Date(data.lastUpdated).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          );
        } else {
          // Use current time as fallback
          const now = new Date();
          setLastUpdated(
            now.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          );
        }
      } catch (error) {
        console.error("Failed to fetch resume info:", error);
        // Use current time as fallback
        const now = new Date();
        setLastUpdated(
          now.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }
    };

    fetchResumeInfo();
  }, []);

  const handleUpdateResume = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch("/api/update-resume", {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();

        // Update the timestamp
        setLastUpdated(
          new Date(data.timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }
    } catch (error) {
      console.error("Failed to update resume:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Resume</h2>
        <p className="text-xl text-gray-600 mb-12">
          Download my latest resume, automatically updated from Google Docs
        </p>

        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-blue-100 p-6 rounded-full">
              <FileText className="text-blue-600" size={48} />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Professional Resume
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            My comprehensive resume including education, experience, skills, and
            achievements. This document is automatically synchronized with my
            Google Docs to ensure you always have the most up-to-date version.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center"
            >
              <FileText className="mr-2" size={20} />
              View Resume
            </a>
            <a
              href={resumeUrl}
              download="resume.pdf"
              className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 flex items-center"
            >
              <Download className="mr-2" size={20} />
              Download PDF
            </a>
            <button
              onClick={handleUpdateResume}
              disabled={isUpdating}
              className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 flex items-center disabled:opacity-50"
            >
              <RefreshCw
                className={`mr-2 ${isUpdating ? "animate-spin" : ""}`}
                size={20}
              />
              {isUpdating ? "Updating..." : "Manual Update"}
            </button>
          </div>

          <div className="text-sm text-gray-500">
            <p>Last updated: {lastUpdated}</p>
            <p className="mt-2">
              📅 Automatically updated every hour via Vercel Cron Jobs
            </p>
            <p className="mt-1">
              🔗 Synced from: Google Docs (ID:
              1c2gXIFkuPz5HlN5NWuTrSx8-jCarH17e7IpN_EcGyqo)
            </p>
          </div>
        </div>

        {/* Resume Preview Section */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h4 className="text-xl font-bold text-gray-900 mb-6">
            Resume Preview
          </h4>
          <div className="bg-white rounded border shadow-inner p-6 text-left max-w-2xl mx-auto">
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h5 className="font-bold text-lg text-gray-900">Your Name</h5>
                <p className="text-gray-600">
                  Research Scientist | your.email@domain.com | (555) 123-4567
                </p>
              </div>

              <div>
                <h6 className="font-semibold text-gray-900">Education</h6>
                <p>Ph.D. in [Your Field], [University Name] (2020)</p>
                <p>M.S. in [Your Field], [University Name] (2017)</p>
              </div>

              <div>
                <h6 className="font-semibold text-gray-900">Experience</h6>
                <p className="font-medium">Senior Research Scientist</p>
                <p className="text-gray-600">
                  [Company/Institution] | 2021 - Present
                </p>
                <p className="mt-1">
                  • Led groundbreaking research in [research area]
                </p>
                <p>• Published 15+ peer-reviewed papers</p>
              </div>

              <div>
                <h6 className="font-semibold text-gray-900">Skills</h6>
                <p>
                  Research Design, Data Analysis, Machine Learning, Python, R
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            This is a simplified preview. Download the full PDF for complete
            details.
          </p>
        </div>
      </div>
    </section>
  );
}
