"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import PhoenixModel from "./PhoenixModel";

/**
 * PhoenixScroller Component - Adds a Phoenix 3D model that follows zigzag path as user scrolls
 * This component creates a fixed canvas layer on top of the page content with the floating phoenix
 */
export default function PhoenixScroller() {
  // Track scroll position
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(0); // -1: up, 0: static, 1: down
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const prevScrollY = useRef(0);

  // Set up scroll event listener
  useEffect(() => {
    // Set loaded state
    setIsLoaded(true);

    const handleScroll = () => {
      // Update scroll position
      setScrollY(window.scrollY);

      // Calculate scroll direction
      if (window.scrollY > prevScrollY.current) {
        setScrollDirection(1); // scrolling down
      } else if (window.scrollY < prevScrollY.current) {
        setScrollDirection(-1); // scrolling up
      } else {
        setScrollDirection(0); // static
      }

      // Calculate scroll speed
      const speed = Math.min(
        Math.abs(window.scrollY - prevScrollY.current) / 50,
        5
      );
      setScrollSpeed(speed > 0.1 ? speed : 0);

      // Update previous scroll value
      prevScrollY.current = window.scrollY;
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

  // Add console log to debug
  useEffect(() => {
    console.log("PhoenixScroller mounted, scrollY:", scrollY);
  }, []);

  // Debug scroll updates
  useEffect(() => {
    console.log(
      "Scroll position updated:",
      scrollY,
      "direction:",
      scrollDirection,
      "speed:",
      scrollSpeed
    );
  }, [scrollY, scrollDirection, scrollSpeed]);

  return (
    <div className="fixed inset-0 w-full h-full z-10 pointer-events-none">
      {isLoaded && (
        <Canvas
          style={{ background: "transparent" }}
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
          shadows
        >
          {/* Development tools - uncomment for debugging */}
          {/* <Stats /> */}

          <Suspense fallback={null}>
            {/* Dynamic camera setup - now managed in PhoenixModel */}
            <PerspectiveCamera
              makeDefault
              position={[0, 0, 10]}
              fov={45}
              near={0.1}
              far={1000}
            />

            {/* Lighting setup for smaller model */}
            <ambientLight intensity={1.2} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.8}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight position={[-10, -10, -5]} intensity={0.6} />
            <spotLight
              position={[0, 10, 0]}
              intensity={1.2}
              angle={0.6}
              penumbra={1}
              castShadow
            />

            {/* The Phoenix model with zigzag animation based on scroll */}
            <PhoenixModel
              scrollY={scrollY}
              scrollDirection={scrollDirection}
              scrollSpeed={scrollSpeed}
            />

            {/* Environment for better visualization */}
            <Environment preset="city" />

            {/* Reduced fog for better visibility of smaller model */}
            <fog attach="fog" args={["#000000", 35, 70]} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
