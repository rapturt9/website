"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Star, Calendar, ExternalLink, Award } from "lucide-react";

interface Publication {
  title: string;
  description: string;
  date: string;
  type: "paper" | "post" | "article" | "project";
  platform:
    | "arXiv"
    | "LessWrong"
    | "Substack"
    | "Other"
    | "Forecast Labs"
    | "AI Safety Global Society";
  url: string;
  tags: string[];
  featured: boolean;
  conference?: {
    name: string;
    presentationType?: "Oral" | "Poster" | "Workshop";
  };
  role?: string;
  status?: "Active" | "Completed" | "Ongoing";
}

const publications: Publication[] = [
  {
    title: "Forecast Labs",
    description:
      "AI Forecasting bot that rivals human superforecasters, used for better decision-making for reducing AI Risk. Building advanced forecasting systems to improve strategic decision-making in AI safety.",
    date: "2025-06-18",
    type: "project",
    platform: "Forecast Labs",
    url: "https://www.forecastlabs.org/",
    tags: ["AI Forecasting", "Decision Making", "AI Risk"],
    featured: true,
    role: "Founder",
    status: "Active",
  },
  {
    title: "AI Safety Global Society - Arena Curriculum Mentor",
    description:
      "Teaching the Arena curriculum to help train the next generation of AI safety researchers and practitioners through hands-on technical education.",
    date: "2025-04-015",
    type: "project",
    platform: "AI Safety Global Society",
    url: "https://www.aisafety.group/about/team",
    tags: ["AI Safety", "Education", "Mentorship", "Arena Curriculum"],
    featured: true,
    role: "Mentor",
    status: "Ongoing",
  },
  {
    title:
      "Corrigibility as a Singular Target: A Vision for Inherently Reliable Foundation Models",
    description:
      "Vision Paper for enhancing Corrigibility in AI systems to reduce loss of control scenarios, outlining empirical approaches for training corrigible foundation models.",
    date: "2025-06-03",
    type: "paper",
    platform: "arXiv",
    url: "https://arXiv.org/abs/2506.03056",
    tags: ["Safety", "Corrigibility"],
    featured: true,
  },
  {
    title: "MAEBE: Multi-Agent Emergent Behavior Framework",
    description:
      "Developed a framework for analyzing emergent behaviors in multi-agent systems, focusing on safety and alignment in complex AI environments.",
    date: "2025-06-03",
    type: "paper",
    platform: "arXiv",
    url: "https://arXiv.org/abs/2506.03053",
    tags: ["Multi-Agent Systems", "Emergent Behavior", "Safety"],
    featured: false,
    conference: {
      name: "ICML 2025 Multi-Agent Systems workshop",
      presentationType: "Poster",
    },
  },
  {
    title: "Evaluating LLM Agent Adherence to Hierarchical Safety Principles",
    description:
      "A Lightweight Benchmark using gridworlds for evaluating an LLM agent's ability to uphold a high level safety principle when faced with conflicting lower-level instructions.",
    date: "2025-06-03",
    type: "paper",
    platform: "arXiv",
    url: "https://arXiv.org/abs/2506.02357",
    tags: ["Safety", "Instruction Following", "Benchmark"],
    featured: true,
    conference: {
      name: "ICML 2025 Technical AI Governance workshop",
      presentationType: "Oral",
    },
  },
  {
    title: "Why I Shifted from Building AI Agents to Making AI Safer",
    description:
      "Leaving behind the startup grind at Sitewiz to confront the existential risks of AI and help steer it toward a future that benefits humanity.",
    date: "2025-06-01",
    type: "post",
    platform: "Substack",
    url: "https://substack.com/home/post/p-165220082",
    tags: ["Entrepreneurship", "Retrospective"],
    featured: true,
  },
  {
    title: "AI Control Methods Literature Review",
    description:
      "A comprehensive review of AI control methods, focusing on their strengths, weaknesses, and top research for the method",
    date: "2025-04-18",
    type: "article",
    platform: "LessWrong",
    url: "https://www.lesswrong.com/posts/3PBvKHB2EmCujet3j/ai-control-methods-literature-review",
    tags: ["Safety", "AI Control", "Literature Review"],
    featured: false,
  },
];

// Timeline component that uses search params
function TimelineWithParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filter, setFilter] = useState<string>("featured");
  const [filteredPublications, setFilteredPublications] = useState<
    Publication[]
  >([]);

  // Function to filter publications based on filter type
  const getFilteredPublications = (filterType: string) => {
    let filtered: Publication[] = [];

    if (filterType === "featured") {
      filtered = publications.filter((pub) => pub.featured);
    } else if (filterType === "papers") {
      filtered = publications.filter((pub) => pub.type === "paper");
    } else if (filterType === "posts") {
      filtered = publications.filter(
        (pub) => pub.type === "post" || pub.type === "article"
      );
    } else if (filterType === "projects") {
      filtered = publications.filter((pub) => pub.type === "project");
    }

    // Sort by date (newest first)
    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  // Initialize filter from URL on component mount
  useEffect(() => {
    const urlFilter = searchParams.get("filter");
    const validFilters = ["featured", "papers", "posts", "projects"];
    const initialFilter =
      urlFilter && validFilters.includes(urlFilter) ? urlFilter : "featured";

    setFilter(initialFilter);
    setFilteredPublications(getFilteredPublications(initialFilter));

    // Handle instant scrolling to section if there's a hash in the URL
    if (typeof window !== "undefined" && window.location.hash === "#research") {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        const element = document.getElementById("research");
        if (element) {
          element.scrollIntoView({ behavior: "instant" });
        }
      });
    }
  }, [searchParams]);

  // Handle hash changes for navigation within the page
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#research") {
        const element = document.getElementById("research");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleFilter = (filterType: string) => {
    setFilter(filterType);
    setFilteredPublications(getFilteredPublications(filterType));

    // Update URL with new filter parameter while preserving hash
    const url = new URL(window.location.href);
    url.searchParams.set("filter", filterType);

    // Preserve the hash if it exists
    const fullUrl = url.pathname + url.search + (window.location.hash || "");
    router.push(fullUrl, { scroll: false });
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "arXiv":
        return "bg-blue-100 text-blue-800";
      case "LessWrong":
        return "bg-green-100 text-green-800";
      case "Substack":
        return "bg-orange-100 text-orange-800";
      case "Forecast Labs":
        return "bg-purple-100 text-purple-800";
      case "AI Safety Global Society":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-left md:text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Research Outputs
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 items-start md:items-center md:justify-center">
          {[
            { key: "featured", label: "Featured", icon: true },
            { key: "papers", label: "Papers", icon: false },
            { key: "posts", label: "Posts", icon: false },
            { key: "projects", label: "Projects", icon: false },
          ].map((filterType) => (
            <button
              key={filterType.key}
              onClick={() => handleFilter(filterType.key)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                filter === filterType.key
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {filterType.icon && <Star size={16} className="inline mr-1" />}
              {filterType.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Grid View */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPublications.map((publication) => (
              <div
                key={publication.title}
                className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-wrap gap-2 mb-2">
                  {publication.conference && (
                    <span className="flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      <Award size={10} className="mr-1" />
                      {publication.conference.name}
                      {publication.conference.presentationType &&
                        ` - ${publication.conference.presentationType}`}
                    </span>
                  )}
                  {publication.role && (
                    <span className="flex items-center text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                      {publication.role}
                    </span>
                  )}
                  {publication.status && (
                    <span
                      className={`flex items-center text-xs px-2 py-1 rounded-full ${
                        publication.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : publication.status === "Ongoing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {publication.status}
                    </span>
                  )}
                  {publication.featured && (
                    <span className="flex items-center text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      <Star size={10} className="mr-1" />
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(
                      publication.platform
                    )}`}
                  >
                    {publication.platform}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {publication.title}
                </h3>

                <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-3">
                  {publication.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {new Date(publication.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="capitalize bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {publication.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {publication.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {publication.tags.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{publication.tags.length - 3} more
                    </span>
                  )}
                </div>

                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                >
                  Read More
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Fallback component for loading state
function TimelineFallback() {
  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-left md:text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Research Outputs
          </h2>
        </div>
        <div className="flex flex-wrap gap-4 mb-8 items-start md:items-center md:justify-center">
          <div className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-medium">
            <Star size={16} className="inline mr-1" />
            Featured
          </div>
          <div className="px-6 py-2 rounded-full bg-white text-gray-700 text-sm font-medium">
            Papers
          </div>
          <div className="px-6 py-2 rounded-full bg-white text-gray-700 text-sm font-medium">
            Posts
          </div>
          <div className="px-6 py-2 rounded-full bg-white text-gray-700 text-sm font-medium">
            Projects
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-lg p-4 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-16 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main export with Suspense boundary
export function Timeline() {
  return (
    <Suspense fallback={<TimelineFallback />}>
      <TimelineWithParams />
    </Suspense>
  );
}
