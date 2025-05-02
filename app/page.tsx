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
import dynamic from "next/dynamic";

// Import PhoenixScroller component dynamically to avoid SSR issues
const PhoenixScroller = dynamic(() => import("@/components/PhoenixScroller"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <main className="relative bg-black-100 overflow-x-hidden">
      {/* Navigation - Higher z-index to stay above content */}
      <FloatingNav navItems={navItems} />

      {/* 3D Helicopter Model with 3D Clouds */}
      <div className="fixed inset-0 w-full h-full z-5">
        <PhoenixScroller />
      </div>

      {/* Content container - Glass effect panels over the clouds */}
      <div className="relative z-10 w-full">
        {/* All sections get responsive container with appropriate padding */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section - Full Screen */}
          <section
            id="banner"
            className="section min-h-screen w-full flex items-center justify-center sm:items-start sm:justify-start py-20 sm:py-24"
          >
            <Hero />
          </section>

          {/* Main Content Sections - All with enhanced glass-like effect */}
          <div className="w-full">
            {/* Featured Projects Grid */}
            <section id="intro" className="section py-16 sm:py-20">
              <div className="mb-10 sm:mb-20">
                <RecentProjects />
              </div>
            </section>

            {/* Experience Timeline */}
            <section id="description" className="section py-16 sm:py-20">
              <div className="mb-10 sm:mb-20">
                <Experience />
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="section py-16 sm:py-20">
              <div className="mb-10 sm:mb-20">
                <Skills />
              </div>
            </section>

            {/* Publications & Accomplishments */}
            <section id="publications" className="section py-16 sm:py-20">
              <div className="mb-10 sm:mb-20">
                <Publications />
              </div>
            </section>

            {/* Certifications Section */}
            <section id="certifications" className="section py-16 sm:py-20">
              <div className="mb-10 sm:mb-20">
                <Certifications />
              </div>
            </section>
          </div>

          {/* Footer */}
          <section id="contact" className="section py-16">
            <Footer />
          </section>
        </div>
      </div>
    </main>
  );
}
