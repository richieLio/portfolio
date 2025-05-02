"use client";

import {
  useEffect,
  useState,
  useMemo,
  useRef,
  createContext,
  useContext,
  useCallback,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import {
  PerspectiveCamera,
  Environment,
  Cloud,
  Sparkles,
  CameraShake,
} from "@react-three/drei";
import PhoenixModel from "./PhoenixModel";
import * as THREE from "three";
import { random } from "maath";

// Import type from drei for the ShakeController
type ShakeController = {
  getIntensity: () => number;
  setIntensity: (intensity: number) => void;
};

// Lightning context type definition
type ShakeContextType = React.RefObject<ShakeController> | null;

// Create context with proper typing
const LightningContext = createContext<ShakeContextType>(null);

// CloudLayer component props type
interface CloudLayerProps {
  yPosition: number;
  seed?: number;
  scrollY: number;
  cloudIndex: number;
  maxScrollY: number;
}

// Lightning component props
interface LightningProps {
  position?: [number, number, number];
  color?: string;
}

// Lightning component that creates the flash effect
const Lightning = ({
  position = [0, 0, 0],
  color = "rgb(155, 220, 255)",
}: LightningProps) => {
  const light = useRef<THREE.PointLight>(null);
  const shake = useContext(LightningContext);
  const [flash] = useState(
    () =>
      new random.FlashGen({
        count: 4,
        minDuration: 60,
        maxDuration: 200,
      })
  );

  // Create a random timing for lightning strikes
  const [nextFlash, setNextFlash] = useState(Math.random() * 10 + 8);
  const [timer, setTimer] = useState(0);

  useFrame((state, delta) => {
    // Update timer and check if it's time for a new lightning flash
    setTimer((prev) => prev + delta);

    if (timer > nextFlash) {
      flash.burst(); // Trigger a flash
      setNextFlash(Math.random() * 10 + 8); // Set next flash time (8-18 seconds)
      setTimer(0); // Reset timer
    }

    // Update flash intensity
    const impulse = flash.update(state.clock.elapsedTime, delta);
    if (light.current) {
      light.current.intensity = impulse * 20000;
    }

    // Trigger camera shake when flash is at maximum
    if (impulse === 1 && shake?.current) {
      shake.current.setIntensity(0.6);
    }
  });

  return (
    <group position={new THREE.Vector3(...position)}>
      <pointLight
        ref={light}
        color={color}
        intensity={0}
        distance={80}
        decay={2}
      />
    </group>
  );
};

// CloudLayer component to render a group of clouds
const CloudLayer = ({
  yPosition,
  seed = 1,
  scrollY,
  cloudIndex,
  maxScrollY,
}: CloudLayerProps) => {
  // Calculate y position based on scroll
  // Different layers scroll at different speeds for parallax effect
  // Reduced scroll factor for more subtle, natural movement
  const scrollFactor = 0.02 - cloudIndex * 1.2;

  // Calculate the scroll progress (0 to 1) to distribute clouds evenly
  const scrollProgress = Math.min(scrollY / maxScrollY, 1);

  // Adjust position based on scroll progress and total number of layers
  // This ensures clouds are distributed evenly throughout the entire page
  const calculatedY = yPosition - scrollProgress * 80 * scrollFactor;

  // Add lightning to some of the clouds (every fourth cloud instead of every third)
  const hasLightning = cloudIndex % 4 === 0;

  return (
    <group position={[0, calculatedY, 0]}>
      {/* Center cloud */}
      <Cloud
        opacity={0.5}
        speed={0.3}
        seed={seed}
        segments={12}
        position={[0, 0, -5]}
        scale={1.3}
      />
      {hasLightning && <Lightning position={[0, 1, -5]} />}

      {/* Left side clouds - simplified layout with fewer clouds */}
      <Cloud
        opacity={0.3}
        speed={0.2}
        seed={seed + 1}
        segments={10}
        position={[-8, 1, -10]}
        scale={1.2}
      />

      {/* Only render far left clouds for early layers to improve performance */}
      {cloudIndex < 5 && (
        <Cloud
          opacity={0.4}
          speed={0.2}
          seed={seed + 10}
          segments={10}
          position={[-15, 0, -8]}
          scale={1.4}
        />
      )}

      {cloudIndex % 4 === 1 && (
        <Lightning position={[-12, 2, -9]} color="rgb(170, 230, 255)" />
      )}

      {/* Only render the far clouds for early layers */}
      {cloudIndex < 4 && (
        <Cloud
          opacity={0.35}
          speed={0.2}
          seed={seed + 15}
          segments={8}
          position={[-20, -1, -12]}
          scale={1.3}
        />
      )}

      {/* Right side clouds - simplified */}
      <Cloud
        opacity={0.4}
        speed={0.15}
        seed={seed + 2}
        segments={10}
        position={[8, -1, -8]}
        scale={1.2}
      />
      {cloudIndex % 4 === 2 && <Lightning position={[10, 0, -8]} />}

      {/* Only render far right clouds for early layers */}
      {cloudIndex < 5 && (
        <Cloud
          opacity={0.4}
          speed={0.15}
          seed={seed + 3}
          segments={10}
          position={[15, 0, -10]}
          scale={1.3}
        />
      )}

      {cloudIndex < 3 && (
        <Cloud
          opacity={0.35}
          speed={0.2}
          seed={seed + 12}
          segments={8}
          position={[20, -1, -12]}
          scale={1.1}
        />
      )}

      {/* Additional clouds for denser layers (for first 4 layers only instead of 8) */}
      {cloudIndex < 4 && (
        <>
          <Cloud
            opacity={0.4}
            speed={0.15}
            seed={seed + 4}
            segments={10}
            position={[-12, -1, -9]}
            scale={1.2}
          />
          <Cloud
            opacity={0.3}
            speed={0.1}
            seed={seed + 5}
            segments={8}
            position={[12, 1, -11]}
            scale={1.1}
          />
          {cloudIndex % 4 === 3 && (
            <Lightning position={[0, 0, -8]} color="rgb(200, 240, 255)" />
          )}
        </>
      )}
    </group>
  );
};

/**
 * PhoenixScroller Component - Adds a Helicopter 3D model that flies through clouds
 */
export default function PhoenixScroller() {
  // Track scroll position and current section
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState("banner");
  const [maxScrollY, setMaxScrollY] = useState(0);
  // Camera shake reference for lightning effect
  const shakeRef = useRef<ShakeController>(null);

  // Define the cloud layers - optimized for performance
  const cloudLayers = useMemo(() => {
    // Reduced from 10 to 7 layers for better performance
    return Array.from({ length: 7 }, (_, index) => ({
      // Start with the first cloud at y=10 (visible at top of page)
      // and spread evenly throughout full scroll range with increased spacing
      yPosition: 10 - index * 10,
      seed: index * 10 + 1,
    }));
  }, []);

  // Performance optimization: Check if layer should be rendered based on scroll position
  const visibleLayerIndices = useMemo(() => {
    // Calculate which cloud layers should be rendered based on current scroll
    // Only render layers that are potentially visible (within viewport plus buffer)
    const scrollPercent = Math.min(scrollY / (maxScrollY || 1), 1);
    const startIndex = Math.max(
      0,
      Math.floor(scrollPercent * cloudLayers.length) - 1
    );
    const endIndex = Math.min(cloudLayers.length - 1, startIndex + 3);

    return Array.from(
      { length: endIndex - startIndex + 1 },
      (_, i) => startIndex + i
    );
  }, [scrollY, maxScrollY, cloudLayers.length]);

  // Detect which section is currently visible - memoized with useCallback
  const detectCurrentSection = useCallback(() => {
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
  }, []);

  // Set up scroll event listener with throttling for better performance
  useEffect(() => {
    // Set loaded state
    setIsLoaded(true);

    // Calculate the max scroll value (document height minus viewport height)
    const calculateMaxScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      setMaxScrollY(docHeight - viewportHeight);
    };

    // Create a throttled scroll handler for better performance
    let lastScrollTime = 0;
    const scrollThreshold = 16;

    const handleScroll = () => {
      const now = performance.now();
      if (now - lastScrollTime < scrollThreshold) return;

      lastScrollTime = now;

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

    // Add throttled resize listener for responsive adjustments
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Force section detection on resize
        handleScroll();
        calculateMaxScroll();
      }, 100);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Initialize
    handleScroll();
    calculateMaxScroll();

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [currentSection, detectCurrentSection]);

  return (
    <div className="fixed inset-0 w-full h-full z-5 pointer-events-none">
      {isLoaded && (
        <Canvas
          style={{ background: "transparent" }}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          dpr={[0.8, 1.2]}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <LightningContext.Provider value={shakeRef}>
              {/* Camera setup with shake effect for lightning */}
              <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
              <CameraShake
                ref={shakeRef}
                maxYaw={0.02}
                maxPitch={0.01}
                maxRoll={0.01}
                yawFrequency={3}
                pitchFrequency={2}
                rollFrequency={1.5}
                decay
                decayRate={0.96}
                intensity={0}
              />

              {/* Lighting - reduced intensity */}
              <ambientLight intensity={1.0} />
              <directionalLight position={[500, 500, 500]} intensity={0.8} />
              <directionalLight
                position={[-500, -500, -500]}
                intensity={0.1}
                color="#e1e5f2"
              />

              {/* Multiple layers of clouds - only render visible layers */}
              {visibleLayerIndices.map((index) => (
                <CloudLayer
                  key={`cloud-layer-${index}`}
                  yPosition={cloudLayers[index].yPosition}
                  seed={cloudLayers[index].seed}
                  scrollY={scrollY}
                  cloudIndex={index}
                  maxScrollY={maxScrollY}
                />
              ))}

              {/* Add an ambient lightning effect for occasional distant flashes - reduced to just one */}
              <Lightning position={[-30, 20, -25]} color="rgb(190, 230, 255)" />

              {/* Optimized Sparkles with fewer particles */}
              <Sparkles
                count={30}
                scale={8}
                size={2}
                speed={0.2}
                opacity={0.15}
                color="white"
              />

              {/* The Helicopter model */}
              <PhoenixModel scrollY={scrollY} currentSection={currentSection} />

              {/* Sky Environment with lower quality */}
              <Environment preset="dawn" />
            </LightningContext.Provider>
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
