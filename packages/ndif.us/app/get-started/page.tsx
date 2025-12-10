import Header from "components/Header";
import PlaceholderPageLayout from "components/PlaceholderPageLayout";
import Footer from "components/Footer";

export default function GetStartedPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24">
        <PlaceholderPageLayout
          id="start"
          title="Get Started"
          summary="Outline the initial steps for joining or collaborating with NDIF."
          details="Add application forms, documentation links, or onboarding checklists here. For now, the section confirms that the primary call-to-action in the header has a real destination."
        />
      </main>
      <Footer />
    </div>
  );
}
