import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import CommunityHero from "components/community/CommunityHero";
import CommunityWays from "components/community/CommunityWays";
import CommunityWorkshop from "components/community/CommunityWorkshop";
import CommunityCards from "components/community/CommunityCards";
import CommunityJobs from "components/community/CommunityJobs";

export const metadata: Metadata = {
  title: "Community | NDIF — National Deep Inference Fabric",
  description:
    "Get involved with NDIF — join our Discord community, use NNsight, contribute to open-source, attend workshops, and explore job opportunities.",
};

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <CommunityHero />
        <CommunityWays />
        <CommunityWorkshop />
        <CommunityCards />
        <CommunityJobs />
      </main>
      <Footer />
    </div>
  );
}
