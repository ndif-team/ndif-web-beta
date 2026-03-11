import type { Metadata } from "next";
import Header from "components/Header";
import PlaceholderPageLayout from "components/PlaceholderPageLayout";
import Footer from "components/Footer";

export const metadata: Metadata = {
  title: "The Fabric | NDIF — National Deep Inference Fabric",
  description:
    "Learn about the three parts of NDIF: the HPC fabric powered by NCSA's DeltaAI, the NNsight open-source library, and our nationwide training program.",
};

export default function FabricPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24">
        <PlaceholderPageLayout
          id="fabric"
          title="The Fabric"
          summary="NDIF consists of three complementary parts: a nationwide HPC fabric, the NNsight open-source library, and a training program for AI researchers."
          details="The NDIF computing backbone is DeltaAI, housed at NCSA (University of Illinois Urbana-Champaign) — featuring 320 NVIDIA H100 GPUs delivering over 630 petaflops of compute. NNsight is our open-source PyTorch-based toolkit (850+ GitHub stars) that lets researchers inspect and modify model internals with a single remote=True flag. Our training program, developed with PIT-UN (a consortium of 63 universities), brings workshops and resources to the broader research community."
        />
      </main>
      <Footer />
    </div>
  );
}
