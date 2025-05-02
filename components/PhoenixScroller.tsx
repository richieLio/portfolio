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
      {/* Center cloud - với kích thước lớn hơn */}
      <Cloud
        opacity={0.6}
        speed={0.3}
        seed={seed}
        segments={6}
        position={[0, 0, -5]}
        scale={1.8}
        color="#ffffff"
      />
      {hasLightning && <Lightning position={[0, 1, -5]} />}

      {/* Left side clouds - với kích thước lớn hơn */}
      <Cloud
        opacity={0.55}
        speed={0.2}
        seed={seed + 1}
        segments={5}
        position={[-8, 1, -10]}
        scale={1.7}
        color="#ffffff"
      />

      {/* Only render far left clouds for early layers to improve performance */}
      {cloudIndex < 3 && (
        <Cloud
          opacity={0.5}
          speed={0.2}
          seed={seed + 10}
          segments={5}
          position={[-15, 0, -8]}
          scale={2.0}
          color="#ffffff"
        />
      )}

      {cloudIndex % 4 === 1 && (
        <Lightning position={[-12, 2, -9]} color="rgb(170, 230, 255)" />
      )}

      {/* Only render the far clouds for early layers */}
      {cloudIndex < 2 && (
        <Cloud
          opacity={0.45}
          speed={0.2}
          seed={seed + 15}
          segments={4}
          position={[-20, -1, -12]}
          scale={1.9}
          color="#ffffff"
        />
      )}

      {/* Right side clouds - with bigger size */}
      <Cloud
        opacity={0.55}
        speed={0.15}
        seed={seed + 2}
        segments={5}
        position={[8, -1, -8]}
        scale={1.7}
        color="#ffffff"
      />
      {cloudIndex % 4 === 2 && <Lightning position={[10, 0, -8]} />}

      {/* Only render far right clouds for early layers */}
      {cloudIndex < 3 && (
        <Cloud
          opacity={0.5}
          speed={0.15}
          seed={seed + 3}
          segments={5}
          position={[15, 0, -10]}
          scale={1.8}
          color="#ffffff"
        />
      )}

      {cloudIndex < 2 && (
        <Cloud
          opacity={0.45}
          speed={0.2}
          seed={seed + 12}
          segments={4}
          position={[20, -1, -12]}
          scale={1.6}
          color="#ffffff"
        />
      )}

      {/* Thêm một số đám mây lớn cho tất cả các lớp với opacity thấp */}
      <Cloud
        opacity={0.4}
        speed={0.1}
        seed={seed + 20}
        segments={4}
        position={[0, -3, -15]}
        scale={3.0}
        color="#ffffff"
      />

      {/* Additional clouds for denser layers - with increased size */}
      {cloudIndex < 2 && (
        <>
          <Cloud
            opacity={0.5}
            speed={0.15}
            seed={seed + 4}
            segments={5}
            position={[-12, -1, -9]}
            scale={1.7}
            color="#ffffff"
          />
          <Cloud
            opacity={0.4}
            speed={0.1}
            seed={seed + 5}
            segments={4}
            position={[12, 1, -11]}
            scale={1.6}
            color="#ffffff"
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

  // Define the cloud layers - optimized for performance but distributed better
  const cloudLayers = useMemo(() => {
    // Giữ số lượng 5 lớp nhưng phân bố tốt hơn
    return Array.from({ length: 5 }, (_, index) => ({
      // Phân bố đám mây đều hơn trong không gian
      yPosition: 10 - index * 15, // Tăng khoảng cách từ 12 lên 15 để tạo không gian lớn hơn
      seed: index * 15 + 1, // Thay đổi seed để đảm bảo các lớp khác nhau
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
    const endIndex = Math.min(cloudLayers.length - 1, startIndex + 2); // Reduced from +3 to +2

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
          dpr={[0.6, 1.0]} // Giữ DPR thấp
          performance={{ min: 0.4 }}
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
              <ambientLight intensity={0.9} />
              <directionalLight
                position={[500, 500, 500]}
                intensity={0.8}
                color="#ffffff"
              />
              <directionalLight
                position={[-500, -500, -500]}
                intensity={0.15}
                color="#ffffff"
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
              {/* Add an ambient lightning effect for occasional distant flashes */}
              <Lightning position={[-30, 20, -25]} color="rgb(190, 230, 255)" />
              {/* Optimized Sparkles with fewer particles but larger size */}
              <Sparkles
                count={15} // Giảm số lượng từ 20 xuống 15
                scale={10} // Tăng từ 8 lên 10
                size={2.5} // Tăng từ 2 lên 2.5
                speed={0.2}
                opacity={0.15} // Tăng lại từ 0.12 lên 0.15
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
