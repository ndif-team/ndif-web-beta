"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatProps {
  value: string;
  numericValue?: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

function AnimatedStat({ value, numericValue, label, suffix = "", prefix = "" }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || numericValue === undefined) return;
    const duration = 1500;
    const steps = 40;
    const increment = numericValue / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center px-4"
    >
      <div className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-2">
        {numericValue !== undefined ? (
          <>
            {prefix}
            {displayValue.toLocaleString()}
            {suffix}
          </>
        ) : (
          <span className="text-gradient">{value}</span>
        )}
      </div>
      <div className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

const stats: StatProps[] = [
  { value: "63+", numericValue: 63, label: "Research Institutions", suffix: "+" },
  { value: "127+", numericValue: 127, label: "Research Citations", suffix: "+" },
  { value: "850+", numericValue: 850, label: "GitHub Stars", suffix: "+" },
  { value: "320", numericValue: 320, label: "H100 GPUs", prefix: "" },
];

export default function Stats() {
  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 md:divide-x divide-slate-200 dark:divide-slate-800">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
