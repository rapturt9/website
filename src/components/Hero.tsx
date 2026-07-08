export function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto text-left sm:text-center">
        <div className="mb-12">
          <div className="mb-6 flex sm:justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-sm font-medium text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Open to full-time roles in AI control &amp; monitoring
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Hey, I&apos;m Ram
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 mb-10 max-w-3xl sm:mx-auto leading-relaxed">
            I build the safeguards that{" "}
            <span className="text-blue-600 font-semibold">
              monitor and control
            </span>{" "}
            advanced AI agents
          </p>
          <p className="text-lg sm:text-xl text-gray-500 max-w-4xl sm:mx-auto leading-relaxed">
            I&apos;m an AI control and monitoring researcher and a Fellow at
            Redwood Research, where I design and red-team the safeguards that
            catch a misaligned AI agent before it causes harm, through control
            evaluations, monitors, and automated red-teaming pipelines. I
            co-authored{" "}
            <span className="font-semibold text-gray-700">LinuxArena</span>, a
            control benchmark now used for risk evaluations at OpenAI, Anthropic,
            and the EU AI Office. Earlier I founded and exited an AI startup,
            which grounded this work in the real risks of deploying autonomous
            agents. I hold a B.S. in Artificial Intelligence from Carnegie
            Mellon.
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
            href="/resume"
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
