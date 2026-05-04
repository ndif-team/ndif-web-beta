"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { researchPapers } from "../../data/research-papers";
import { githubRepos } from "../../data/github-repos";
import { isLowSignal } from "../../lib/repos";
import ResearchPaperList from "./ResearchPaperList";
import GitHubRepoList from "./GitHubRepoList";

type Tab = "papers" | "code";

export default function ResearchTabs() {
  const router = useRouter();
  const search = useSearchParams();
  const initial = (search.get("tab") === "code" ? "code" : "papers") as Tab;
  const [tab, setTab] = useState<Tab>(initial);
  const tablistRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Sync to URL on tab change (preserves other params)
  useEffect(() => {
    const params = new URLSearchParams(Array.from(search.entries()));
    if (tab === "papers") params.delete("tab");
    else params.set("tab", "code");
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  // Counter values — match the Code tab's default visibility (coursework now shown by default).
  const papersCount = researchPapers.length;
  const codeCount = githubRepos.filter((r) => !isLowSignal(r)).length;

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next: Tab = tab === "papers" ? "code" : "papers";
      setTab(next);
      // ARIA tablist pattern: move keyboard focus to the newly active tab.
      // RAF waits for React to apply tabIndex updates before focusing.
      requestAnimationFrame(() => {
        tablistRef.current?.querySelector<HTMLButtonElement>(`#tab-${next}`)?.focus();
      });
    }
  }

  return (
    <section className="py-20 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={tablistRef} role="tablist" aria-label="Research content" onKeyDown={handleKeyDown} className="flex justify-center gap-2 mb-8">
          <TabButton active={tab === "papers"} onClick={() => setTab("papers")} controls="panel-papers">
            Papers <span className="text-2xs opacity-70">({papersCount})</span>
          </TabButton>
          <TabButton active={tab === "code"} onClick={() => setTab("code")} controls="panel-code">
            Code <span className="text-2xs opacity-70">({codeCount})</span>
          </TabButton>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
          >
            {tab === "papers" ? <ResearchPaperList /> : <GitHubRepoList />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  controls,
  children,
}: {
  active: boolean;
  onClick: () => void;
  controls: string;
  children: React.ReactNode;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      id={controls.replace("panel", "tab")}
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
        active
          ? "bg-brand-600 text-white shadow-sm"
          : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-brand-400 hover:text-brand-600"
      }`}
    >
      {children}
    </button>
  );
}
