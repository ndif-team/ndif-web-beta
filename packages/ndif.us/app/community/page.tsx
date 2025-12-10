import Header from "components/Header";
import PlaceholderPageLayout from "components/PlaceholderPageLayout";
import Footer from "components/Footer";

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24">
        <PlaceholderPageLayout
          id="community"
          title="Community & Events"
          summary="Point researchers to gatherings, forums, and collaboration channels."
          details="List upcoming talks, working groups, or mailing list signups. The placeholder ensures visitors can discover how to engage with the NDIF community."
        />
      </main>
      <Footer />
    </div>
  );
}
