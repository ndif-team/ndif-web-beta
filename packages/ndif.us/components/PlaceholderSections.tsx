
type SectionConfig = {
  id: string;
  title: string;
  summary: string;
  details: string;
};

const SECTIONS: SectionConfig[] = [
  {
    id: "about",
    title: "About NDIF",
    summary:
      "Give visitors a concise snapshot of the National Deep Inference Fabric.",
    details:
      "Swap this copy with your authoritative overview when it is ready—include founding institutions, the scale of the fabric, and the scientific goals. Until then it keeps the navigation anchor alive.",
  },
  {
    id: "team",
    title: "Team & Leadership",
    summary: "Introduce the coalition of researchers and operators.",
    details:
      "Highlight principal investigators, program managers, or partner labs. Cards, timelines, or photo grids can slot in here later without disturbing the rest of the layout.",
  },
  {
    id: "status",
    title: "Program Status",
    summary: "Share current availability, milestones, and infrastructure notes.",
    details:
      "Use this space for uptime summaries, roadmap bullet points, or links to external status dashboards. Because it already sits behind #status, visitors from the header won't encounter a dead end.",
  },
  {
    id: "nnsight",
    title: "NNsight Workbench",
    summary: "Describe how the workbench exposes experiments on large models.",
    details:
      "Document supported models, the kinds of probes researchers can run, and any onboarding expectations. Replace this placeholder once the live workbench narrative is finalized.",
  },
  {
    id: "community",
    title: "Community & Events",
    summary: "Point researchers to gatherings, forums, and collaboration channels.",
    details:
      "List upcoming talks, working groups, or mailing list signups. The placeholder ensures the mobile drawer's Community link lands somewhere meaningful right now.",
  },
  {
    id: "start",
    title: "Get Started",
    summary: "Outline the initial steps for joining or collaborating with NDIF.",
    details:
      "Add application forms, documentation links, or onboarding checklists here. For now, the section confirms that the primary call-to-action in the header has a real destination.",
  },
];

export default function PlaceholderSections() {
  return (
    <div className="flex flex-col gap-24 py-24">
      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-24 rounded-3xl border border-slate-200/70 bg-white/70 p-10 shadow-xl ring-1 ring-black/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 dark:ring-white/5"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
                #{section.id}
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">
                {section.title}
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                {section.summary}
              </p>
              <p className="mt-3 text-slate-500 dark:text-slate-400">
                {section.details}
              </p>
            </div>


          </div>
        </section>
      ))}
    </div>
  );
}
