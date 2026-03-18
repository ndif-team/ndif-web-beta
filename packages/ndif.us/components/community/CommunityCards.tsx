"use client";

import Link from "next/link";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "../AnimateOnScroll";
import { FaDiscord } from "react-icons/fa6";
import { FiTerminal, FiBriefcase } from "react-icons/fi";

const cards = [
  {
    icon: FaDiscord,
    title: "NDIF Community",
    description:
      "On the NDIF community Discord, you can chat with the team and discuss tips, tricks, and the latest research. Submit a short form to join.",
    href: "https://nnsight.net/signup",
    cta: "Join the group",
    external: true,
  },
  {
    icon: FiTerminal,
    title: "NNsight",
    description:
      "If you're ready to start cracking open large neural networks, NDIF and NNsight are ready for use! Just a pip install nnsight away.",
    href: "/get-started",
    cta: "Get started",
    external: false,
  },
  {
    icon: FiBriefcase,
    title: "Jobs",
    description:
      "We would love your help building NDIF. To join the NDIF team full-time, part-time, as a co-op or a volunteer, see our job listings below.",
    href: "#jobs",
    cta: "See jobs below",
    external: false,
  },
];

export default function CommunityCards() {
  return (
    <section className="py-20 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          staggerDelay={0.1}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <StaggerItem key={card.title}>
                <div className="card-glass rounded-2xl p-8 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mb-5 text-brand-600 dark:text-brand-400">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                    {card.description}
                  </p>
                  {card.external ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors self-start"
                    >
                      {card.cta}
                      <span className="text-xs opacity-70">↗</span>
                    </a>
                  ) : (
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors self-start"
                    >
                      {card.cta}
                    </Link>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
