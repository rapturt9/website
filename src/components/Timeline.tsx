"use client";

import { useState } from "react";
import {
  Calendar,
  Star,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Tag,
} from "lucide-react";

interface Publication {
  title: string;
  description: string;
  date: string;
  type: "paper" | "post" | "article";
  platform: "arXiv" | "LessWrong" | "Substack" | "Other";
  url: string;
  tags: string[];
  featured: boolean;
}

const publications: Publication[] = [
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
    featured: true,
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
    featured: true,
  },
];

export function Timeline() {
  const [filter, setFilter] = useState<string>("featured");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isCompressed, setIsCompressed] = useState(true);
  const [filteredPublications, setFilteredPublications] = useState<
    Publication[]
  >(
    publications
      .filter((pub) => pub.featured)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );

  const handleFilter = (filterType: string) => {
    setFilter(filterType);
    let filtered: Publication[] = [];

    if (filterType === "all") {
      filtered = publications;
    } else if (filterType === "featured") {
      filtered = publications.filter((pub) => pub.featured);
    } else {
      filtered = publications.filter((pub) => pub.type === filterType);
    }

    // Apply current sorting
    const sorted = sortPublications(filtered, sortBy, sortOrder);
    setFilteredPublications(sorted);
  };

  const sortPublications = (
    publications: Publication[],
    sortField: "date" | "title",
    order: "asc" | "desc"
  ) => {
    return [...publications].sort((a, b) => {
      let comparison = 0;

      if (sortField === "date") {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        comparison = a.title.localeCompare(b.title);
      }

      return order === "asc" ? comparison : -comparison;
    });
  };

  const handleSort = (field: "date" | "title") => {
    const newOrder = sortBy === field && sortOrder === "desc" ? "asc" : "desc";
    setSortBy(field);
    setSortOrder(newOrder);

    const sorted = sortPublications(filteredPublications, field, newOrder);
    setFilteredPublications(sorted);
  };

  const toggleCompression = () => {
    setIsCompressed(!isCompressed);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "arXiv":
        return "bg-blue-100 text-blue-800";
      case "LessWrong":
        return "bg-green-100 text-green-800";
      case "Substack":
        return "bg-orange-100 text-orange-800";
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
        <div className="flex flex-col gap-4 mb-8 items-start md:items-center">
          {/* First row: Featured and All */}
          <div className="flex flex-wrap gap-4">
            {["featured", "all"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => handleFilter(filterType)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === filterType
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {filterType === "featured" && (
                  <Star size={16} className="inline mr-1" />
                )}
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType === "all" && " Publications"}
                {filterType === "featured" && " Highlights"}
              </button>
            ))}
          </div>

          {/* Second row: Paper, Post, Article */}
          <div className="flex flex-wrap gap-4">
            {["paper", "post", "article"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => handleFilter(filterType)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === filterType
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Sort and View Controls */}
        <div className="flex flex-wrap justify-start md:justify-center gap-4 mb-12">
          <div className="flex gap-2">
            <button
              onClick={() => handleSort("date")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                sortBy === "date"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Calendar size={16} />
              Date
              <ArrowUpDown size={14} />
            </button>
            <button
              onClick={() => handleSort("title")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                sortBy === "title"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Title
              <ArrowUpDown size={14} />
            </button>
          </div>

          <button
            onClick={toggleCompression}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1 bg-white text-gray-700 hover:bg-gray-100"
          >
            {isCompressed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            {isCompressed ? "Expand" : "Compress"}
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          {!isCompressed && (
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-300"></div>
          )}

          {isCompressed ? (
            // Compressed Grid View
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPublications.map((publication) => (
                <div
                  key={publication.title}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-wrap gap-2 mb-2">
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
          ) : (
            // Expanded Timeline View
            filteredPublications.map((publication, index) => (
              <div
                key={publication.title}
                className={`relative flex items-start mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10">
                  {publication.featured && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white"></div>
                  )}
                </div>

                {/* Content Card */}
                <div
                  className={`ml-12 md:ml-0 ${
                    index % 2 === 0
                      ? "md:mr-8 md:text-right"
                      : "md:ml-8 md:text-left"
                  } md:w-1/2`}
                >
                  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div
                      className={`flex flex-wrap gap-2 mb-3 ${
                        index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      {publication.featured && (
                        <span className="flex items-center text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          <Star size={10} className="mr-1" />
                          Featured
                        </span>
                      )}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getPlatformColor(
                          publication.platform
                        )}`}
                      >
                        {publication.platform}
                      </span>
                      <span className="flex items-center text-xs text-gray-500">
                        <Calendar size={12} className="mr-1" />
                        {new Date(publication.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {publication.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {publication.description}
                    </p>

                    <div
                      className={`flex flex-wrap gap-2 mb-4 justify-start ${
                        index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      {publication.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          <Tag size={10} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                    >
                      Read More
                      <ExternalLink size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
