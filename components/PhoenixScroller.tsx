"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import PhoenixModel from "./PhoenixModel";

/**
 * PhoenixScroller Component - Adds a Phoenix 3D model that follows scroll position
 */
export default function PhoenixScroller() {
  // Track scroll position
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Set up scroll event listener
  useEffect(() => {
    // Set loaded state
    setIsLoaded(true);

    const handleScroll = () => {
      // Update scroll position
      setScrollY(window.scrollY);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initialize
    handleScroll();

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-10 pointer-events-none">
      {isLoaded && (
        <Canvas
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            {/* Fixed camera setup */}
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />

            {/* Basic lighting */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 10, 5]} intensity={1.8} />

            {/* The Phoenix model */}
            <PhoenixModel scrollY={scrollY} />

            {/* Environment */}
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
