import { BackgroundEffects } from './components/BackgroundEffects';
import { DesktopNavigation } from './components/DesktopNavigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { FloatingContactButton } from './components/FloatingContactButton';
import { MobileNavigation } from './components/MobileNavigation';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0A0F1C] text-white overflow-x-hidden pb-20 md:pb-0">
      {/* Background */}
      <BackgroundEffects />

      {/* Desktop navigation — sticky top bar */}
      <DesktopNavigation />

      {/* Main content — add top padding so desktop nav doesn't overlap hero */}
      <main className="relative z-10 md:pt-4">
        <section id="home">
          <HeroSection />
        </section>
        <section id="about">
          <AboutSection />
          <SkillsSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* Floating contact */}
      <FloatingContactButton />

      {/* Mobile nav */}
      <MobileNavigation />
    </div>
  );
}
