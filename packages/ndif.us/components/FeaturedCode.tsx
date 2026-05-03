"use client";

import Link from "next/link";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { githubRepos } from "../data/github-repos";
import GitHubRepoCard from "./research/GitHubRepoCard";

// Prefer pipeline-marked is_featured. Fall back to top-N by stars among repos
// with a linked paper and non-course repo_type when the pipeline hasn't shipped
// the is_featured field yet.
const explicit = githubRepos.filter((r) => r.is_featured === true);
const featured = explicit.length > 0
  ? explicit.slice(0, 6)
  : [...githubRepos]
      .filter((r) => r.linked_paper_url !== null && r.repo_type !== "course")
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 6);

export default function FeaturedCode() {
  if (featured.length === 0) return null;

  return (
    <section
      id="featured-code"
      className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-surface-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white" style={{ textWrap: "balance" }}>
            Featured Code
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full mb-6" aria-hidden="true" />
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Open-source repositories using NDIF and NNsight — production-grade interpretability tools, libraries, and research code from the community.
          </p>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {featured.map((r) => (
            <StaggerItem key={`${r.owner}/${r.repo}`}>
              <GitHubRepoCard repo={r} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimateOnScroll className="text-center mt-12" delay={0.3}>
          <Link
            href="/research?tab=code"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-all hover:-translate-y-0.5"
          >
            Explore all code
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
