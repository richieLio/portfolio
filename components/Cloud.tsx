"use client";

import { useRef, useState, useEffect, useMemo } from "react";
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
  density = 2,
  color = "white",
  speed = 0.3,
  height = 80,
}: CloudProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isComputing, setIsComputing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), 50);
            setIsComputing(true);
          } else {
            setIsComputing(false);
            setTimeout(() => {
              if (!entry.isIntersecting) {
                setIsVisible(false);
              }
            }, 300);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
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

  const config = useMemo(() => {
    switch (section) {
      case "intro":
        return {
          positions: [
            {
              pos: [-4, 1, -6],
              scale: 1.3,
              opacity: 0.5,
              speed: 0.3,
              segments: 10,
            },
          ],
          sparkles: { count: 25, scale: 5, size: 1.8 },
        };
      case "description":
        return {
          positions: [
            {
              pos: [0, 1, -7],
              scale: 1.2,
              opacity: 0.4,
              speed: 0.2,
              segments: 8,
            },
          ],
          sparkles: { count: 20, scale: 4, size: 1.5 },
        };
      case "skills":
        return {
          positions: [
            {
              pos: [3, 0, -6],
              scale: 1.3,
              opacity: 0.5,
              speed: 0.25,
              segments: 10,
            },
          ],
          sparkles: { count: 25, scale: 5, size: 1.7 },
        };

      default:
        return {
          positions: [
            {
              pos: [0, 0, -6],
              scale: 1.1,
              opacity: 0.4,
              speed: 0.2,
              segments: 8,
            },
          ],
          sparkles: { count: 15, scale: 3, size: 1.5 },
        };
    }
  }, [section]);

  const containerStyle = useMemo(
    () => ({
      height: `${height}%`,
      opacity: isVisible ? 1 : 0,
      transition: "opacity 0.5s ease-in-out",
    }),
    [height, isVisible]
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-5"
      style={containerStyle}
    >
      {isVisible && isComputing && (
        <Canvas
          style={{ background: "transparent" }}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          dpr={[0.7, 1.0]}
          performance={{ min: 0.4 }}
          frameloop={isComputing ? "demand" : "never"}
        >
          <ambientLight intensity={1.0} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />

          {config.positions.map((cloud, index) => (
            <DreiCloud
              key={`${section}-cloud-${index}`}
              opacity={cloud.opacity}
              speed={cloud.speed}
              segments={cloud.segments}
              position={new THREE.Vector3(...cloud.pos)}
              color={color}
              scale={cloud.scale}
            />
          ))}

          <Sparkles
            count={config.sparkles.count}
            scale={config.sparkles.scale}
            size={config.sparkles.size}
            speed={0.2}
            opacity={0.15}
            color={color}
          />

          <Environment preset="dawn" />
        </Canvas>
      )}
    </div>
  );
};

export default SectionCloud;
