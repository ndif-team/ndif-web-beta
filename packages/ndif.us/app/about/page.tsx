import Header from "components/Header";
import Mission from "components/Mission";
import Footer from "components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Mission />
      </main>
      <Footer />
    </div>
  );
}
