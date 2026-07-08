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
    | "EA Forum"
    | "Alignment Forum"
    | "Substack"
    | "Other"
    | "Forecast Labs"
    | "AI Safety Global Society"
    | "AgentSteer"
    | "GitHub";
  url: string;
  featured: boolean;
  conference?: Array<{
    name: string;
    presentationType?: "Oral" | "Poster" | "Workshop";
  }>;
  role?: string;
  status?: "Active" | "Completed" | "Ongoing";
}

const publications: Publication[] = [
  {
    title:
      "LinuxArena: A Control Setting for AI Agents in Live Production Software Environments",
    description:
      "A control benchmark with 20 production environments, 1,671 legitimate tasks, and 184 sabotage tasks for evaluating whether AI agents can be safely monitored in realistic software settings. Used for risk evaluations at OpenAI, Anthropic, and the EU AI Office.",
    date: "2026-04-21",
    type: "paper",
    platform: "arXiv",
    url: "https://arxiv.org/abs/2604.15384",
    featured: true,
    status: "Ongoing",
    conference: [
      {
        name: "ICML 2026, Agents in the Wild Workshop",
        presentationType: "Oral",
      },
    ],
  },
  {
    title: "AgentSteer",
    description:
      "AI-control startup building runtime monitors for AI agents. Had users at Coefficient Giving and Redwood Research. Key finding: a prompted ~20B open-source model gave the best cost/latency tradeoff as a safeguard, catching prompt injections well while staying weaker against more sophisticated attacks.",
    date: "2026-03-15",
    type: "project",
    platform: "AgentSteer",
    url: "https://www.agentsteer.ai/research/monitor-evaluation",
    featured: true,
    role: "Founder",
  },
  {
    title:
      "Attack Selection in Agentic AI Control Evaluations Meaningfully Decreases Safety",
    description:
      "Shows that letting the attacker choose when to strike substantially lowers the safety measured by AI control evaluations, implying current assessments may be overly optimistic. Introduces a Start/Stop decomposition of attack-selection policies.",
    date: "2026-06-15",
    type: "paper",
    platform: "arXiv",
    url: "https://arxiv.org/abs/2606.06529",
    featured: true,
    conference: [
      {
        name: "ICML 2026, FAGEN Workshop",
        presentationType: "Poster",
      },
    ],
  },
  {
    title: "Automated Red-Teaming & Control-Research Pipeline",
    description:
      "Automated red-teaming and control-research tooling built during the Redwood Research fellowship. Turns raw agent transcripts into structured trajectories, mines failure modes where sabotage evades the monitor, generates adversarial attacks, and stress-tests monitors against them. Integrated with Control Tower.",
    date: "2026-06-01",
    type: "project",
    platform: "GitHub",
    url: "https://github.com/linuxarena/control-tower-plugins/tree/main/plugins/control-research",
    featured: true,
  },
  {
    title: "Evaluating LLM Agent Adherence to Hierarchical Safety Principles",
    description:
      "A lightweight gridworld benchmark for whether an LLM agent upholds a high-level safety principle when faced with conflicting lower-level instructions.",
    date: "2025-06-03",
    type: "paper",
    platform: "arXiv",
    url: "https://rapturt9.github.io/SafetyAdherenceBenchmark/",
    featured: true,
    conference: [
      {
        name: "ICML 2025, Technical AI Governance Workshop",
        presentationType: "Oral",
      },
    ],
  },
  {
    title: "An Independent Safety Evaluation of Kimi K2.5",
    description:
      "Pre-deployment safety assessment of the open-weight model Kimi K2.5 across CBRNE misuse, cybersecurity risk, misalignment, political censorship, bias, and harmlessness. Finds dual-use capabilities comparable to GPT 5.2 and Claude Opus 4.5 but with reduced refusals on harmful requests.",
    date: "2026-04-04",
    type: "paper",
    platform: "arXiv",
    url: "https://arxiv.org/abs/2604.03121",
    featured: true,
  },
  {
    title: "The Agent Misalignment Dataset",
    description:
      "An open, annotated corpus of agent behavior in realistic workplace tasks: 1,050 trajectories across 7 models, 25 tasks, and 3 elicitation modes, each labeled for misalignment by an LLM judge panel. Useful for training misalignment classifiers and stress-testing monitors. Funded by Coefficient Giving.",
    date: "2026-06-11",
    type: "paper",
    platform: "Other",
    url: "https://rapturt9.github.io/agentmisalignmentdataset/",
    featured: false,
  },
  {
    title:
      "Think Fast: Estimating No-CoT Task-Completion Time Horizons of Frontier AI Models",
    description:
      "Estimates the task-completion time horizons of frontier models when they cannot use explicit chain-of-thought. Finds no-CoT performance roughly doubling each year, projecting large implicit-reasoning gains through 2030. Large multi-author collaboration.",
    date: "2026-06-20",
    type: "paper",
    platform: "arXiv",
    url: "https://arxiv.org/abs/2606.07157",
    featured: false,
  },
  {
    title: "Attack Selection in Agentic AI Control Evals Can Decrease Safety",
    description:
      "LessWrong write-up of the attack-selection work: strategically-timed attacks undermine the safety measured by AI control evaluations, and a Start/Stop decomposition of attack-selection policies.",
    date: "2026-06-15",
    type: "post",
    platform: "LessWrong",
    url: "https://www.lesswrong.com/posts/WuKDzJxtiqcA9ZZRH/attack-selection-in-agentic-ai-control-evals-can-decrease",
    featured: false,
  },
  {
    title: "AI Control Methods Literature Review",
    description:
      "A review of AI control methods, focusing on their strengths, weaknesses, and the top research for each method.",
    date: "2025-04-18",
    type: "article",
    platform: "LessWrong",
    url: "https://www.lesswrong.com/posts/3PBvKHB2EmCujet3j/ai-control-methods-literature-review",
    featured: false,
  },
  {
    title: "MAEBE: Multi-Agent Emergent Behavior Framework",
    description:
      "A framework for analyzing emergent behaviors in multi-agent systems, focusing on safety and alignment in complex AI environments.",
    date: "2025-06-03",
    type: "paper",
    platform: "arXiv",
    url: "https://arxiv.org/abs/2506.03053",
    featured: false,
    conference: [
      {
        name: "ICML 2025, Multi-Agent Systems Workshop",
        presentationType: "Poster",
      },
      {
        name: "HICSS 2026, Trustworthy AI Track",
        presentationType: "Poster",
      },
    ],
  },
  {
    title:
      "Corrigibility as a Singular Target: A Vision for Inherently Reliable Foundation Models",
    description:
      "Vision paper for enhancing corrigibility in AI systems to reduce loss-of-control scenarios, outlining empirical approaches for training corrigible foundation models.",
    date: "2025-06-03",
    type: "paper",
    platform: "arXiv",
    url: "https://arxiv.org/abs/2506.03056",
    featured: false,
  },
  {
    title:
      "Model-Based Soft Maximization of Suitable Metrics of Long-Term Human Power",
    description:
      "Promoting both safety and wellbeing by forcing AI agents to explicitly empower humans and to manage the power balance between humans and AI agents in a desirable way.",
    date: "2025-07-24",
    type: "paper",
    platform: "arXiv",
    url: "https://arxiv.org/abs/2508.00159",
    featured: false,
  },
  {
    title: "Forecast Labs",
    description:
      "AI forecasting bot that rivals human superforecasters, used for better decision-making to reduce AI risk. Building advanced forecasting systems to improve strategic decision-making in AI safety.",
    date: "2025-06-18",
    type: "project",
    platform: "Forecast Labs",
    url: "https://www.forecastlabs.org/",
    featured: false,
    role: "Founder",
  },
  {
    title: "AI Safety Global Society - Arena Curriculum Mentor",
    description:
      "Teaching the ARENA curriculum to help train the next generation of AI safety researchers and practitioners through hands-on technical education.",
    date: "2025-04-15",
    type: "project",
    platform: "AI Safety Global Society",
    url: "https://www.aisafety.group/about/team",
    featured: false,
    role: "Mentor",
  },
  {
    title: "AI-Powered Outrage Monitor for Animal Advocacy",
    description:
      "Case study of an AI-powered social listening tool built during the Code4Compassion hackathon. It monitors Twitter for content about factory farming, scores it for 'outrage', and sends prioritized alerts.",
    date: "2025-06-22",
    type: "article",
    platform: "EA Forum",
    url: "https://forum.effectivealtruism.org/posts/8AniqLjuJkFN33KYK/case-study-an-ai-powered-outrage-monitor-for-animal-advocacy",
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

  // Function to count tags for a publication
  const countTags = (pub: Publication) => {
    let count = 0;
    if (pub.conference && pub.conference.length > 0)
      count += pub.conference.length;
    if (pub.role) count++;
    if (pub.status) count++;
    if (pub.featured) count++;
    // Platform tag is not shown for arXiv, so only count if not arXiv
    if (pub.platform && pub.platform !== "arXiv") count++;
    return count;
  };

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

    // Sort by number of tags (descending), then by date (newest first)
    return filtered.sort((a, b) => {
      const tagDiff = countTags(b) - countTags(a);
      if (tagDiff !== 0) return tagDiff;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
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
      case "AgentSteer":
        return "bg-teal-100 text-teal-800";
      case "GitHub":
        return "bg-gray-200 text-gray-800";
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
                  {publication.conference &&
                    publication.conference.map((conf, idx) => (
                      <span
                        key={conf.name + idx}
                        className="flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
                      >
                        <Award size={10} className="mr-1" />
                        {conf.name}
                        {conf.presentationType && ` - ${conf.presentationType}`}
                      </span>
                    ))}
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
                  {publication.platform !== "arXiv" && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(
                        publication.platform
                      )}`}
                    >
                      {publication.platform}
                    </span>
                  )}
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
