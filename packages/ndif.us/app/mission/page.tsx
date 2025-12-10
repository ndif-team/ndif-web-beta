import Header from "components/Header";
import PlaceholderPageLayout from "components/PlaceholderPageLayout";
import Footer from "components/Footer";

export default function MissionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24">
        <PlaceholderPageLayout
          id="mission"
          title="Our Mission"
          summary="Explore the core mission driving the National Deep Inference Fabric."
          details="The NSF National Deep Inference Fabric (NDIF) is a research computing project that will enable researchers and students to crack open the mysteries inside these enormous neural networks. Replace this placeholder with a deeper dive into our mission, vision, and strategic approach once the full narrative is prepared."
        />
      </main>
      <Footer />
    </div>
  );
}
