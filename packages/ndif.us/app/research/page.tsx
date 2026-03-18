import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import ResearchCitation from "components/research/ResearchCitation";
import ResearchPaperList from "components/research/ResearchPaperList";

export const metadata: Metadata = {
  title: "Research | NDIF — National Deep Inference Fabric",
  description:
    "Citing NDIF in your research. Browse 30+ published papers using or referencing NDIF and NNsight across top venues including ICLR, NeurIPS, ICML, and EMNLP.",
};

export default function ResearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <ResearchCitation />
        <ResearchPaperList />
      </main>
      <Footer />
    </div>
  );
}
