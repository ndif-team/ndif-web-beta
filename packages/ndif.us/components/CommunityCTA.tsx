"use client";

import Link from "next/link";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { FaDiscord, FaGithub } from "react-icons/fa6";
import { FiCalendar } from "react-icons/fi";

const channels = [
  {
    icon: FaDiscord,
    title: "Join the Community",
    description: "Connect with researchers, get help, and share your work on our Discord community.",
    href: "https://nnsight.net/signup",
    cta: "Join Discord",
    external: true,
  },
  {
    icon: FiCalendar,
    title: "Training & Workshops",
    description: "Attend hands-on workshops and tutorials to learn how to use NDIF for your research.",
    href: "/community",
    cta: "See Events",
    external: false,
  },
  {
    icon: FaGithub,
    title: "Contribute",
    description: "NNsight is open source. Contribute code, report issues, or improve the documentation.",
    href: "https://github.com/ndif-team",
    cta: "View on GitHub",
    external: true,
  },
];

export default function CommunityCTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-surface-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Join the NDIF Community
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Be part of a growing network of researchers advancing AI transparency.
          </p>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <StaggerItem key={ch.title}>
                <div className="card-glass p-8 rounded-2xl h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mb-5 text-brand-600 dark:text-brand-400">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                    {ch.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                    {ch.description}
                  </p>
                  {ch.external ? (
                    <a
                      href={ch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-semibold text-sm hover:underline underline-offset-4"
                    >
                      {ch.cta} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link
                      href={ch.href}
                      className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-semibold text-sm hover:underline underline-offset-4"
                    >
                      {ch.cta} <span aria-hidden="true">&rarr;</span>
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
