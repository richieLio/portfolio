"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Cloud as DreiCloud, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface CloudProps {
  section: string;
  density?: number;
  color?: string;
  speed?: number;
  height?: number;
}

// SectionCloud component for specific section decoration
const SectionCloud = ({
  section,
  density = 3,
  color = "white",
  speed = 0.4,
  height = 100,
}: CloudProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Derive clouds configuration based on section
  const getCloudsConfig = () => {
    switch (section) {
      case "intro":
        return {
          positions: [
            { pos: [-4, 1, -6], scale: 1.3, opacity: 0.6, speed: 0.4 },
            { pos: [5, -1, -8], scale: 1.1, opacity: 0.4, speed: 0.3 },
          ],
          sparkles: { count: 40, scale: 6, size: 1.8 },
        };
      case "description":
        return {
          positions: [
            { pos: [0, 1, -7], scale: 1.2, opacity: 0.5, speed: 0.3 },
            { pos: [-6, -1, -9], scale: 1.0, opacity: 0.4, speed: 0.25 },
          ],
          sparkles: { count: 35, scale: 5, size: 1.5 },
        };
      case "skills":
        return {
          positions: [
            { pos: [3, 0, -6], scale: 1.4, opacity: 0.6, speed: 0.35 },
            { pos: [-5, 1, -8], scale: 1.2, opacity: 0.5, speed: 0.3 },
          ],
          sparkles: { count: 45, scale: 6, size: 1.7 },
        };

      default:
        return {
          positions: [
            { pos: [0, 0, -6], scale: 1.2, opacity: 0.5, speed: 0.3 },
          ],
          sparkles: { count: 30, scale: 4, size: 1.5 },
        };
    }
  };

  const config = getCloudsConfig();

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-5"
      style={{
        height: `${height}%`,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      {isVisible && (
        <Canvas
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={1.3} />
          <directionalLight position={[5, 5, 5]} intensity={1.0} />

          {config.positions.map((cloud, index) => (
            <DreiCloud
              key={`${section}-cloud-${index}`}
              opacity={cloud.opacity}
              speed={cloud.speed}
              segments={12}
              position={new THREE.Vector3(...cloud.pos)}
              color={color}
              scale={cloud.scale}
            />
          ))}

          <Sparkles
            count={config.sparkles.count}
            scale={config.sparkles.scale}
            size={config.sparkles.size}
            speed={0.3}
            opacity={0.2}
            color={color}
          />

          <Environment preset="dawn" />
        </Canvas>
      )}
    </div>
  );
};

export default SectionCloud;
