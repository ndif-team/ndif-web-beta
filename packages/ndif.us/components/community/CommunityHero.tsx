"use client";

import Link from "next/link";
import AnimateOnScroll from "../AnimateOnScroll";

export default function CommunityHero() {
  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Get <span className="text-gradient">Involved</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full" />
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <p className="max-w-3xl mx-auto text-center text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            NDIF is under continuous development, and there are several ways to
            get involved in the prototype fabric during its construction.
          </p>
          <div className="flex justify-center">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors"
            >
              Free remote access to Llama 3.1, DeepSeek R1, & more!
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
