// Home.tsx
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProject";
import Publications from "@/components/Publications";
import Certifications from "@/components/Certifications";
import Skills from "@/components/Skills";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";
import PhoenixScroller from "@/components/PhoenixScroller";

export default function Home() {
  return (
    <main className="relative bg-black-100 overflow-x-hidden">
      {/* Navigation */}
      <FloatingNav navItems={navItems} />

      {/* 3D Phoenix Model */}
      <PhoenixScroller />

      {/* Hero Section - Full Height */}
      <section id="banner" className="section scroll-mt-20">
        <Hero />
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-32 py-20">
        {/* Featured Projects Grid */}
        <section id="intro" className="section scroll-mt-20">
          <RecentProjects />
        </section>

        {/* Experience Timeline */}
        <section id="description" className="section scroll-mt-20">
          <Experience />
        </section>

        {/* Skills Section */}
        <section id="contact" className="section scroll-mt-20">
          <Skills />
        </section>

        {/* Publications & Accomplishments */}
        <section id="publications" className="section scroll-mt-20">
          <Publications />
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="section scroll-mt-20">
          <Certifications />
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
