export function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto text-left sm:text-center">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Hey, I&apos;m Ram
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 mb-10 max-w-3xl sm:mx-auto leading-relaxed">
            AI Safety Researcher working towards a{" "}
            <span className="text-blue-600 font-semibold">
              beautiful future
            </span>{" "}
            for humanity
          </p>
          <p className="text-lg sm:text-xl text-gray-500 max-w-4xl sm:mx-auto leading-relaxed">
            Carnegie Mellon AI graduate focused on pursuing research agendas
            that reduce loss of control and existential risk. Previously built a
            VC-backed startup building autonomous agents but pivoted to AI
            safety after realizing the risks of AI systems.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-center items-start sm:items-center">
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
      </div>
    </section>
  );
}
