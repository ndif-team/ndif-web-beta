"use client";

import { useState } from "react";
import Image from "next/image";
import AnimateOnScroll from "../AnimateOnScroll";
import { FiChevronDown } from "react-icons/fi";

export default function GetStartedIntro() {
  const [diagramOpen, setDiagramOpen] = useState(false);

  return (
    <section className="pb-16 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="card-glass rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mb-4 text-brand-600 dark:text-brand-400 font-display font-bold text-lg">
                N
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                NDIF
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                An inference service hosting large open-weight LLMs for use by
                researchers — free of charge.
              </p>
            </div>
            <div className="card-glass rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-accent-100 dark:bg-accent-900/40 flex items-center justify-center mb-4 text-accent-600 dark:text-accent-400 font-display font-bold text-lg">
                nn
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                <a
                  href="https://nnsight.net/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  NNsight
                  <span className="text-xs ml-1 opacity-50">↗</span>
                </a>
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                A Python package for interpreting and manipulating internals of
                deep learning models.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-center mb-8">
            Together, NDIF and NNsight enable researchers to run complex
            experiments on huge open AI models easily, with full transparent
            access.{" "}
            <strong className="text-slate-900 dark:text-white">
              Follow the steps below to get started.
            </strong>
          </p>
        </AnimateOnScroll>

        {/* Collapsible system diagram */}
        <AnimateOnScroll delay={0.15}>
          <div className="card-glass rounded-2xl overflow-hidden">
            <button
              onClick={() => setDiagramOpen(!diagramOpen)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              aria-expanded={diagramOpen}
              aria-controls="system-diagram"
            >
              <span className="font-semibold text-slate-900 dark:text-white">
                View the NDIF and NNsight system diagram
              </span>
              <FiChevronDown
                size={20}
                className={`text-slate-500 transition-transform duration-200 ${
                  diagramOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {diagramOpen && (
              <div id="system-diagram" className="px-5 pb-6">
                <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-800/50 p-4">
                  <Image
                    src="/images/NDIF_system.png"
                    alt="NDIF and NNsight system architecture diagram showing how user code flows through NNsight to NDIF's hosted models"
                    width={1024}
                    height={512}
                    className="w-full h-auto"
                    priority={false}
                  />
                </div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  NDIF and NNsight work together to apply user&apos;s code to
                  NDIF&apos;s hosted models so that users can access and
                  manipulate large-scale model internals — without needing to
                  download the model, set up complex distributed systems, or have
                  a powerful computer.
                </p>
              </div>
            )}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
