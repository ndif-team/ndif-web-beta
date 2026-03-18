"use client";

import AnimateOnScroll, { StaggerContainer, StaggerItem } from "../AnimateOnScroll";

const cards = [
  {
    id: "deltaai",
    title: "What is Delta AI?",
    description:
      "NDIF is powered by the high-performance computing capacity of Delta AI, a computing cluster created at NCSA in 2024.",
    details:
      "Taking advantage of next-generation NVIDIA graphics processors, DeltaAI is part of Delta, which is the highest-performance GPU computing resource in the National Science Foundation portfolio. Delta AI is tailored for artificial intelligence workloads such as Large Language Models.",
    href: "https://www.ncsa.illinois.edu/research/project-highlights/delta/",
    cta: "Go to NCSA Delta",
  },
  {
    id: "nnsight",
    title: "What is NNsight?",
    description:
      "The NNsight library is an open-source toolkit developed by NDIF to support research methods on AI models.",
    details:
      "Building on the popular PyTorch ecosystem, NNsight allows researchers to create code that inspects, modifies, and customizes AI model computations. NNsight enables reproducible experiments both on a scientist's own smaller-scale computer and remotely on the shared large-scale fabric.",
    href: "https://nnsight.net/",
    cta: "Go to NNsight",
  },
  {
    id: "pitun",
    title: "What is PIT-UN?",
    description:
      "NDIF has partnered with the Public Interest Technology University Network (PIT-UN), a consortium of 63 universities and colleges, to conduct needs-gathering workshops and tutorials open to all fields affected by AI.",
    details:
      "We are seeking participation of not only computer scientists, but also all researchers in science and social science who wish to investigate the mechanisms of large-scale AI within their fields.",
    href: "https://pitcases.org/",
    cta: "Go to PIT-UN",
  },
];

export default function FabricCards() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          staggerDelay={0.1}
        >
          {cards.map((card) => (
            <StaggerItem key={card.id}>
              <div
                id={card.id}
                className="card-glass rounded-2xl p-8 h-full flex flex-col scroll-mt-24"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                  {card.description}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                  {card.details}
                </p>
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors self-start"
                >
                  {card.cta}
                  <span className="text-xs opacity-70">↗</span>
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
