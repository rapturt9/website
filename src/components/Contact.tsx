"use client";

import { Mail, Linkedin, Twitter } from "lucide-react";
import Script from "next/script";

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-left md:text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl md:mx-auto">
            Interested in AI safety research, collaboration opportunities, or
            have questions? Let&apos;s connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="hidden md:block text-2xl font-bold text-gray-900 mb-6">
                Let&apos;s Connect
              </h3>
              <p className="text-gray-600 mt-[-40px] md:mt-[5px] text-lg leading-relaxed mb-8">
                Always open to discussing AI safety research, autonomous agents,
                and collaborative projects in alignment and robustness.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <a
                    href="mailto:ram.potham@gmail.com"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    ram.potham@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                Connect Online
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com/in/rampotham"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://x.com/PothamRam"
                  className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-lg transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter/X"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://github.com/rapturt9"
                  className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-lg transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Calendly Widget */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-xl p-8">
            {/* Calendly Inline Widget */}
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/ram-potham/30-minute-meeting"
              style={{ minWidth: "320px", height: "600px" }}
            ></div>

            {/* Calendly Script */}
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="lazyOnload"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
