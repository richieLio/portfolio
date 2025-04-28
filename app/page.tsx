// Home.tsx
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Gird from "@/components/Gird";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProject";
import Publications from "@/components/Publications";
import Certifications from "@/components/Certifications";
import Skills from "@/components/Skills";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-black-100 overflow-x-hidden">
      {/* Navigation */}
      <FloatingNav navItems={navItems} />

      {/* Hero Section - Full Height */}
      <Hero />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-32 py-20">
        {/* Featured Projects Grid */}
        <section id="work" className="scroll-mt-20">
          <RecentProjects />
        </section>

        {/* Experience Timeline */}
        <section id="experience" className="scroll-mt-20">
          <Experience />
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-20">
          <Skills />
        </section>

        {/* Custom Grid Display */}
        <section className="scroll-mt-20">
          <Gird />
        </section>

        {/* Publications & Accomplishments */}
        <section id="publications" className="scroll-mt-20">
          <Publications />
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="scroll-mt-20">
          <Certifications />
        </section>

        {/* My Approach */}
        <section id="approach" className="scroll-mt-20">
          <Approach />
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
