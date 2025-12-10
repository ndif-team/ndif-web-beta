import Header from "components/Header";
import PlaceholderPageLayout from "components/PlaceholderPageLayout";
import Footer from "components/Footer";

export default function NNsightPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24">
        <PlaceholderPageLayout
          id="nnsight"
          title="NNsight"
          summary="Describe how nnsight works."
          details="Replace this placeholder."
        />
      </main>
      <Footer />
    </div>
  );
}
