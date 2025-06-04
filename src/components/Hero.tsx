import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Ram Potham
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI Safety Researcher & Entrepreneur in{" "}
            <span className="text-blue-600 font-semibold">
              AI Alignment & Robustness
            </span>
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Carnegie Mellon AI graduate focused on developing safe and aligned
            AI systems. Building autonomous agents while researching robustness
            failures and human-AI interaction. Passionate about ensuring AI
            systems remain beneficial as they become more capable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="#research"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            View Research
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200"
          >
            View Resume
          </a>
        </div>

        <div className="animate-bounce">
          <ArrowDown className="mx-auto text-gray-400" size={32} />
        </div>
      </div>
    </section>
  );
}
