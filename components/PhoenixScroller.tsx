"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import PhoenixModel from "./PhoenixModel";

/**
 * PhoenixScroller Component - Adds a Phoenix 3D model that moves between sections
 */
export default function PhoenixScroller() {
  // Track scroll position and current section
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState("banner");

  // Detect which section is currently visible
  const detectCurrentSection = () => {
    const sections = document.querySelectorAll(".section");

    // Default to first section if none found
    if (sections.length === 0) return "banner";

    // Find section that is most visible in viewport
    let visibleSection = "banner";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // Consider a section visible when it's top part is in the top third of viewport
      if (rect.top <= window.innerHeight / 3) {
        visibleSection = section.id || "banner";
      }
    });

    return visibleSection;
  };

  // Set up scroll event listener
  useEffect(() => {
    // Set loaded state
    setIsLoaded(true);

    const handleScroll = () => {
      // Update scroll position
      setScrollY(window.scrollY);

      // Update current section
      const newSection = detectCurrentSection();
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Add resize listener for responsive adjustments
    const handleResize = () => {
      // Force section detection on resize
      handleScroll();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Initialize
    handleScroll();

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentSection]);

  return (
    <div className="fixed inset-0 w-full h-full z-10 pointer-events-none">
      {isLoaded && (
        <Canvas
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            {/* Camera setup */}
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />

            {/* Lighting */}
            <ambientLight intensity={1.3} />
            <directionalLight position={[500, 500, 500]} intensity={1.0} />

            {/* The Phoenix model */}
            <PhoenixModel scrollY={scrollY} currentSection={currentSection} />

            {/* Environment */}
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
