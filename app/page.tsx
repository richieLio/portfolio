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
    <main className="relative bg-sky-900 overflow-x-hidden">
      {/* Navigation - Higher z-index to stay above content */}
      <FloatingNav navItems={navItems} />

      {/* 3. 3D Helicopter Model with 3D Clouds */}
      <div className="fixed inset-0 w-full h-full z-5">
        <PhoenixScroller />
      </div>

      {/* Content container - Glass effect panels over the clouds */}
      <div className="relative z-10 w-full">
        {/* All sections get max-width to ensure readability and appear as floating panels */}
        <div className="max-w-full mx-auto px-0 sm:px-0 lg:px-0">
          {/* Hero Section - Full Screen */}
          <section
            id="banner"
            className="section min-h-screen w-full flex items-start justify-start scroll-mt-20 py-24 pl-0"
          >
            <Hero />
          </section>

          {/* Main Content Sections - All with enhanced glass-like effect */}
          <div className="w-full space-y-32">
            {/* Featured Projects Grid */}
            <section
              id="intro"
              className="section w-full min-h-screen py-20 flex items-center justify-center scroll-mt-20"
            >
              <div
                className="w-full relative backdrop-blur-[2px] rounded-xl p-6 md:p-8 bg-white/10
                              shadow-lg border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <RecentProjects />
              </div>
            </section>

            {/* Experience Timeline */}
            <section
              id="description"
              className="section w-full min-h-screen py-20 flex items-center justify-center scroll-mt-20"
            >
              <div
                className="w-full relative backdrop-blur-[2px] rounded-xl p-6 md:p-8 bg-white/10
                              shadow-lg border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Experience />
              </div>
            </section>

            {/* Skills Section */}
            <section
              id="skills"
              className="section w-full min-h-screen py-20 flex items-center justify-center scroll-mt-20"
            >
              <div
                className="w-full relative backdrop-blur-[2px] rounded-xl p-6 md:p-8 bg-white/10
                              shadow-lg border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Skills />
              </div>
            </section>

            {/* Publications & Accomplishments */}
            <section
              id="publications"
              className="section w-full min-h-screen py-20 flex items-center justify-center scroll-mt-20"
            >
              <div
                className="w-full relative backdrop-blur-[2px] rounded-xl p-6 md:p-8 bg-white/10
                              shadow-lg border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Publications />
              </div>
            </section>

            {/* Certifications Section */}
            <section
              id="certifications"
              className="section w-full min-h-screen py-20 flex items-center justify-center scroll-mt-20"
            >
              <div
                className="w-full relative backdrop-blur-[2px] rounded-xl p-6 md:p-8 bg-white/10
                              shadow-lg border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Certifications />
              </div>
            </section>
          </div>

          {/* Footer */}
          <section
            id="contact"
            className="section w-full py-20 flex items-center justify-center scroll-mt-20 mb-10"
          >
            <div
              className="w-full relative backdrop-blur-[2px] rounded-xl p-6 md:p-8 bg-white/10
                            shadow-lg border border-white/20 hover:border-white/30 transition-all duration-300"
            >
              <Footer />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
