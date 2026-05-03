"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { FiSearch, FiX } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedValue } from "../../lib/useUrlState";
import { StaggerContainer, StaggerItem } from "../AnimateOnScroll";
import { researchPapers, type ResearchPaper } from "../../data/research-papers";
import { getAssetPath } from "../../lib/assetPath";
import Pagination, { itemsOnPage } from "./Pagination";

type FilterCategory = "all" | "uses_nnsight" | "uses_ndif" | "referencing";

const PAGE_SIZE = 36;
const REVEAL_STEP = 12;

function extractVenueShort(venue: string): string {
  const m = venue.match(/^([\w-]+)/);
  return m ? m[1] : venue;
}

const venues = Array.from(new Set(researchPapers.map((p) => extractVenueShort(p.venue)))).sort();

const CHIP_LABELS: Record<Exclude<FilterCategory, "all">, string> = {
  uses_nnsight: "Built with NNsight",
  uses_ndif: "Hosted on NDIF",
  referencing: "Cites NDIF",
};

const CHIP_CLASSES: Record<Exclude<FilterCategory, "all">, string> = {
  uses_nnsight: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  uses_ndif: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  referencing: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
};

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
          <Image src={getAssetPath(paper.image)} alt={paper.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
      )}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-block px-2 py-0.5 text-2xs font-semibold rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">
            {paper.venue}
          </span>
          <span className={`inline-block px-2 py-0.5 text-2xs font-semibold rounded-full ${CHIP_CLASSES[paper.category]}`}>
            {CHIP_LABELS[paper.category]}
          </span>
        </div>
        <h3 className="font-display text-slate-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" style={{ letterSpacing: "-0.01em" }}>
          {paper.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-1">{paper.authors}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mt-auto">{paper.description}</p>
      </div>
    </a>
  );
}

export default function ResearchPaperList() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>("all");
  const [venueFilter, setVenueFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [revealed, setRevealed] = useState(REVEAL_STEP);

  const router = useRouter();
  const params = useSearchParams();

  // One-time hydrate from URL on mount
  useEffect(() => {
    const cat = params.get("cat");
    if (cat === "uses_nnsight" || cat === "uses_ndif" || cat === "referencing") setCategoryFilter(cat);
    const venue = params.get("venue");
    if (venue && venues.includes(venue)) setVenueFilter(venue);
    const q = params.get("q") ?? "";
    if (q) setSearch(q);
    const pg = parseInt(params.get("page") ?? "1", 10);
    if (!Number.isNaN(pg) && pg > 0) setPage(pg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedSearch = useDebouncedValue(search, 300);

  // Sync URL params (filters/search/page); preserves params from other tabs (e.g. ?tab=)
  useEffect(() => {
    const next = new URLSearchParams(Array.from(params.entries()));
    if (categoryFilter === "all") next.delete("cat"); else next.set("cat", categoryFilter);
    if (venueFilter === "all") next.delete("venue"); else next.set("venue", venueFilter);
    if (!debouncedSearch) next.delete("q"); else next.set("q", debouncedSearch);
    if (page === 1) next.delete("page"); else next.set("page", String(page));
    const qs = next.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, venueFilter, debouncedSearch, page]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return researchPapers.filter((p) => {
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
      if (venueFilter !== "all" && extractVenueShort(p.venue) !== venueFilter) return false;
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

  // Reset page+reveal when filters change
  const filterKey = `${categoryFilter}|${venueFilter}|${search}`;
  const lastKey = useRef(filterKey);
  useEffect(() => {
    if (lastKey.current !== filterKey) {
      lastKey.current = filterKey;
      setPage(1);
      setRevealed(REVEAL_STEP);
    }
  }, [filterKey]);

  // Aggregate impact counts (over the FULL dataset, not filtered)
  const total = researchPapers.length;
  const ndifCount = researchPapers.filter((p) => p.category === "uses_ndif").length;
  const nnsightCount = researchPapers.filter((p) => p.category === "uses_nnsight").length;
  const refCount = researchPapers.filter((p) => p.category === "referencing").length;

  // Counts within current venue scope
  const scopedPapers = useMemo(() => {
    if (venueFilter === "all") return researchPapers;
    return researchPapers.filter((p) => extractVenueShort(p.venue) === venueFilter);
  }, [venueFilter]);
  const scopedTotal = scopedPapers.length;
  const scopedNn = scopedPapers.filter((p) => p.category === "uses_nnsight").length;
  const scopedNd = scopedPapers.filter((p) => p.category === "uses_ndif").length;
  const scopedRef = scopedPapers.filter((p) => p.category === "referencing").length;

  const filteredTotal = filtered.length;
  const onPage = itemsOnPage(filteredTotal, page, PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + Math.min(revealed, onPage));

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white">
          Research Using NDIF
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          <strong className="text-slate-700 dark:text-slate-200">{total}</strong> papers
          <span className="mx-1.5">·</span>
          <strong className="text-slate-700 dark:text-slate-200">{ndifCount}</strong> hosted on NDIF
          <span className="mx-1.5">·</span>
          <strong className="text-slate-700 dark:text-slate-200">{nnsightCount}</strong> built with NNsight
          <span className="mx-1.5">·</span>
          <strong className="text-slate-700 dark:text-slate-200">{refCount}</strong> citing NDIF
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-4">
        <FiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, authors, or venue…"
          className="w-full pl-11 pr-10 py-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" aria-label="Clear search">
            <FiX size={16} />
          </button>
        )}
      </div>

      {/* Chips + venue */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <FilterChip active={categoryFilter === "all"} onClick={() => setCategoryFilter("all")}>
          All ({scopedTotal})
        </FilterChip>
        <FilterChip active={categoryFilter === "uses_nnsight"} onClick={() => setCategoryFilter("uses_nnsight")} disabled={scopedNn === 0}>
          Built with NNsight ({scopedNn})
        </FilterChip>
        <FilterChip active={categoryFilter === "uses_ndif"} onClick={() => setCategoryFilter("uses_ndif")} disabled={scopedNd === 0}>
          Hosted on NDIF ({scopedNd})
        </FilterChip>
        <FilterChip active={categoryFilter === "referencing"} onClick={() => setCategoryFilter("referencing")} disabled={scopedRef === 0}>
          Cites NDIF ({scopedRef})
        </FilterChip>

        <span className="mx-2 text-slate-300 dark:text-slate-600">|</span>

        <select value={venueFilter} onChange={(e) => setVenueFilter(e.target.value)} aria-label="Filter by venue" className="px-3 py-1.5 rounded-full text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
          <option value="all">All venues</option>
          {venues.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {filteredTotal === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 dark:text-slate-400 text-lg">No papers match your search.</p>
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
        <>
          <StaggerContainer key={`${filterKey}|${page}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.05}>
            {visible.map((p) => (
              <StaggerItem key={p.url}>
                <PaperCard paper={p} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Pagination
            total={filteredTotal}
            page={page}
            revealed={Math.min(revealed, onPage)}
            pageSize={PAGE_SIZE}
            revealStep={REVEAL_STEP}
            onShowMore={() => setRevealed((r) => Math.min(r + REVEAL_STEP, onPage))}
            onPageChange={(p) => {
              setPage(p);
              setRevealed(REVEAL_STEP);
              if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
        active
          ? "bg-brand-600 text-white shadow-sm"
          : disabled
            ? "bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 cursor-not-allowed"
            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
      }`}
    >
      {children}
    </button>
  );
}
