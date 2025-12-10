import Header from "components/Header";
import PlaceholderPageLayout from "components/PlaceholderPageLayout";
import Footer from "components/Footer";

export default function StatusPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24">
        <PlaceholderPageLayout
          id="status"
          title="Program Status"
          summary="Share current availability, milestones, and infrastructure notes."
          details="Use this space for uptime summaries, roadmap bullet points, or links to external status dashboards. Because it already sits behind /status, visitors from the header won't encounter a dead end."
        />
      </main>
      <Footer />
    </div>
  );
}
