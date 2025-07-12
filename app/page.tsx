import { CanvasComponent } from "./components/Canvas";
import { Overlay } from "./components/Overlay";
import { AboutSection } from "./components/sections/AboutSection";
import { BenefitsSection } from "./components/sections/BenefitsSection";
import { ScrollContainer } from "./components/ScrollContainer";

export default function Home() {
  return (
    <ScrollContainer>
      {/* Hero Section with 3D Mug */}
      <section className="hero-section">
        <CanvasComponent />
        <Overlay />
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Benefits Section with Footer */}
      <BenefitsSection />
    </ScrollContainer>
  );
}
