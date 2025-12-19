import Header from "components/Header";
import PlaceholderPageLayout from "components/PlaceholderPageLayout";
import Footer from "components/Footer";

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24">
        <PlaceholderPageLayout
          id="team"
          title="Team & Leadership"
          summary="Introduce the coalition of researchers and operators."
          details="Highlight principal investigators, program managers, or partner labs. Cards, timelines, or photo grids can slot in here later without disturbing the rest of the layout."
        />
      </main>
      <Footer />
    </div>
  );
}
