import Link from "next/link";

export type PlaceholderPageLayoutProps = {
  id: string;
  title: string;
  summary: string;
  details: string;
  backLink?: string;
};

export default function PlaceholderPageLayout({
  id,
  title,
  summary,
  details,
  backLink = "/",
}: PlaceholderPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={backLink}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 mb-8 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 12H5m7 7l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>

          <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-12 shadow-xl ring-1 ring-black/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 dark:ring-white/5">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300 mb-4">
                #{id}
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                {title}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl">
                {summary}
              </p>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700/50 pt-8">
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                {details}
              </p>
            </div>

            <div className="mt-12 p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                💡 <strong>Placeholder Note:</strong> This page is a work in progress.
                Content will be added soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
