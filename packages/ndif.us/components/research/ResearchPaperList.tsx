"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { FiSearch, FiX } from "react-icons/fi";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "../AnimateOnScroll";
import { researchPapers, type ResearchPaper } from "data/research-papers";
import { getAssetPath } from "../../lib/assetPath";

type FilterCategory = "all" | "using" | "referencing";

const venues = Array.from(
  new Set(researchPapers.map((p) => extractVenueShort(p.venue)))
).sort();

function extractVenueShort(venue: string): string {
  const match = venue.match(/^([\w-]+)/);
  return match ? match[1] : venue;
}

function PaperCard({ paper }: { paper: ResearchPaper }) {
  return (
    <a
      href={paper.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:border-brand-400 dark:hover:border-brand-500/50 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {paper.image && (
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src={getAssetPath(paper.image)}
            alt={paper.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-block px-2 py-0.5 text-2xs font-semibold rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">
            {paper.venue}
          </span>
          <span
            className={`inline-block px-2 py-0.5 text-2xs font-semibold rounded-full ${
              paper.category === "using"
                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
            }`}
          >
            {paper.category === "using" ? "Used infrastructure" : "References NDIF"}
          </span>
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {paper.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-1">
          {paper.authors}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mt-auto">
          {paper.description}
        </p>
      </div>
    </a>
  );
}

export default function ResearchPaperList() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>("all");
  const [venueFilter, setVenueFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return researchPapers.filter((p) => {
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
      if (venueFilter !== "all" && !extractVenueShort(p.venue).includes(venueFilter))
        return false;
      if (
        q &&
        !p.title.toLowerCase().includes(q) &&
        !p.authors.toLowerCase().includes(q) &&
        !p.venue.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [search, categoryFilter, venueFilter]);

  const usingCount = researchPapers.filter((p) => p.category === "using").length;
  const refCount = researchPapers.filter((p) => p.category === "referencing").length;

  return (
    <section className="py-20 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Research Using NDIF
            </h2>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
              {researchPapers.length} papers across top venues including ICLR,
              NeurIPS, ICML, EMNLP, and more.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Search & Filters */}
        <AnimateOnScroll delay={0.1}>
          <div className="mb-10 space-y-4">
            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <FiSearch
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search by title, authors, or venue…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label="Clear search"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <FilterChip
                active={categoryFilter === "all"}
                onClick={() => setCategoryFilter("all")}
              >
                All ({researchPapers.length})
              </FilterChip>
              <FilterChip
                active={categoryFilter === "using"}
                onClick={() => setCategoryFilter("using")}
              >
                Used infrastructure ({usingCount})
              </FilterChip>
              <FilterChip
                active={categoryFilter === "referencing"}
                onClick={() => setCategoryFilter("referencing")}
              >
                References NDIF ({refCount})
              </FilterChip>

              <span className="mx-2 text-slate-300 dark:text-slate-600">|</span>

              <select
                value={venueFilter}
                onChange={(e) => setVenueFilter(e.target.value)}
                className="px-3 py-1.5 rounded-full text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                aria-label="Filter by venue"
              >
                <option value="all">All venues</option>
                {venues.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              No papers match your search.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategoryFilter("all");
                setVenueFilter("all");
              }}
              className="mt-4 text-brand-600 dark:text-brand-400 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.05}
          >
            {filtered.map((paper) => (
              <StaggerItem key={paper.url}>
                <PaperCard paper={paper} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
        active
          ? "bg-brand-600 text-white shadow-sm"
          : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
      }`}
    >
      {children}
    </button>
  );
}
