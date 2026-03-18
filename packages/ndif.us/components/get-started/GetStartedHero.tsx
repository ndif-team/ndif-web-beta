"use client";

import AnimateOnScroll from "../AnimateOnScroll";

export default function GetStartedHero() {
  return (
    <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Get <span className="text-gradient">Started</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full" />
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.1}>
          <p className="max-w-3xl mx-auto text-center text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            In the current era of large-scale deep learning, the most
            interesting AI models are massive black boxes that are both costly
            and difficult to run. Ordinary commercial inference services and APIs
            let us interact with these models, but they do not let us access
            model internals. We are changing this with NDIF and NNsight.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
