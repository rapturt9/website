export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Ram Potham</h3>
            <p className="text-gray-400 leading-relaxed">
              AI control and monitoring researcher. Fellow at Redwood Research.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#research"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Research
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Elsewhere</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              <li>
                <a
                  href="https://linkedin.com/in/rampotham"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://scholar.google.com/citations?user=Uc-rKk0AAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Google Scholar
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rapturt9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.lesswrong.com/users/ram-potham"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LessWrong
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/PothamRam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href="https://substack.com/@rpotham"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Substack
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Ram Potham. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
