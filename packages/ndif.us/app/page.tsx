import Header from "components/Header";
import Hero from "components/Hero";
import ModelCards from "components/ModelCards";
import Features from "components/Features";
import WhatWeDoCards from "components/WhatWeDoCards";
import Research from "components/Research";
import Footer from "components/Footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <ModelCards/>
        <WhatWeDoCards />
        <Research />
      </main>
      <Footer />
    </div>
  );
}
