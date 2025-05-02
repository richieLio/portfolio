"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import {
  PerspectiveCamera,
  Environment,
  Cloud,
  Sparkles,
} from "@react-three/drei";
import PhoenixModel from "./PhoenixModel";

/**
 * PhoenixScroller Component - Adds a Helicopter 3D model that flies through clouds
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
    <div className="fixed inset-0 w-full h-full z-5 pointer-events-none">
      {isLoaded && (
        <Canvas
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 10], fov: 45 }}
        >
          <Suspense fallback={null}>
            {/* Camera setup */}
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />

            {/* Lighting */}
            <ambientLight intensity={1.3} />
            <directionalLight position={[500, 500, 500]} intensity={1.0} />
            <directionalLight
              position={[-500, -500, -500]}
              intensity={0.2}
              color="#e1e5f2"
            />

            {/* Cloud particles in 3D space */}
            <group>
              <Cloud
                opacity={0.5}
                speed={0.4}
                seed={1}
                segments={20}
                position={[0, 3, -5]}
              />
              <Cloud
                opacity={0.3}
                speed={0.3}
                seed={2}
                segments={15}
                position={[-8, 2, -10]}
              />
              <Cloud
                opacity={0.4}
                speed={0.2}
                seed={3}
                segments={18}
                position={[8, -2, -8]}
              />
              <Cloud
                opacity={0.4}
                speed={0.2}
                seed={3}
                segments={18}
                position={[0, -2, -8]}
              />
              {/* Added cloud at bottom left corner */}
              <Cloud
                opacity={0.5}
                speed={0.25}
                seed={4}
                segments={22}
                position={[-10, -5, -7]}
              />
              {/* Added cloud at bottom right corner */}
              <Cloud
                opacity={0.5}
                speed={0.3}
                seed={5}
                segments={20}
                position={[10, -5, -9]}
              />
            </group>

            {/* Sun rays / light particles */}
            <Sparkles
              count={100}
              scale={10}
              size={2}
              speed={0.3}
              opacity={0.2}
              color="white"
            />

            {/* The Helicopter model */}
            <PhoenixModel scrollY={scrollY} currentSection={currentSection} />

            {/* Sky Environment */}
            <Environment preset="dawn" />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
