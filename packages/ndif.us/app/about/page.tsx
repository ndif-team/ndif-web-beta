import Header from "components/Header";
import PlaceholderPageLayout from "components/PlaceholderPageLayout";
import Footer from "components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24">
        <PlaceholderPageLayout
          id="about"
          title="About NDIF"
          summary="Give visitors a concise snapshot of the National Deep Inference Fabric."
          details="Swap this copy with your authoritative overview when it is ready—include founding institutions, the scale of the fabric, and the scientific goals. Until then it keeps the navigation landing meaningful."
        />
      </main>
      <Footer />
    </div>
  );
}
