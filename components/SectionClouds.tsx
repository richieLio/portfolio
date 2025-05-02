"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";

interface SectionCloudsProps {
  section: string;
  color?: string;
  density?: number;
  height?: number;
}

interface AnimatedCloudProps {
  position: THREE.Vector3;
  scale: number;
  opacity: number;
  speed: number;
  color: string;
}

// Animating cloud component
const AnimatedCloud = ({
  position,
  scale,
  opacity,
  speed,
  color,
}: AnimatedCloudProps) => {
  const cloudRef = useRef<Group>(null);
  const [offset] = useState(() => Math.random() * 100);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + offset;
    if (cloudRef.current) {
      // Gentle floating motion
      cloudRef.current.position.y += Math.sin(t * 0.2) * 0.001;
      cloudRef.current.position.x += Math.cos(t * 0.1) * 0.0005;
      cloudRef.current.rotation.y = Math.sin(t * 0.05) * 0.1;
    }
  });

  return (
    <Cloud
      ref={cloudRef}
      position={position}
      scale={scale}
      opacity={opacity}
      speed={speed}
      segments={10}
      color={color}
    />
  );
};

// Section-specific visual effects
const SectionClouds = ({
  section,
  color = "white",
  density = 3,
  height = 100,
}: SectionCloudsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to only render when visible
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
      { threshold: 0.1 }
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

  // Section-specific configurations
  const sectionConfig = useMemo(() => {
    switch (section) {
      case "banner":
        return {
          clouds: [
            {
              position: new THREE.Vector3(0, 2, -5),
              scale: 1.5,
              opacity: 0.7,
              speed: 0.5,
            },
            {
              position: new THREE.Vector3(-8, 1, -8),
              scale: 1.2,
              opacity: 0.5,
              speed: 0.3,
            },
            {
              position: new THREE.Vector3(8, 0, -10),
              scale: 1.4,
              opacity: 0.6,
              speed: 0.4,
            },
          ],
          sparkles: { count: 60, scale: 8, size: 2, speed: 0.3, color },
          backgroundColor: "rgba(0, 0, 0, 0.15)",
        };
      case "intro":
        return {
          clouds: [
            {
              position: new THREE.Vector3(-4, 0, -7),
              scale: 1.3,
              opacity: 0.5,
              speed: 0.35,
            },
            {
              position: new THREE.Vector3(5, 1, -9),
              scale: 1.1,
              opacity: 0.4,
              speed: 0.3,
            },
          ],
          sparkles: { count: 40, scale: 6, size: 1.8, speed: 0.2, color },
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        };
      case "description":
        return {
          clouds: [
            {
              position: new THREE.Vector3(0, 0, -7),
              scale: 1.2,
              opacity: 0.45,
              speed: 0.3,
            },
            {
              position: new THREE.Vector3(-6, -1, -9),
              scale: 1.0,
              opacity: 0.35,
              speed: 0.25,
            },
          ],
          sparkles: { count: 35, scale: 5, size: 1.5, speed: 0.25, color },
          backgroundColor: "rgba(0, 0, 0, 0.08)",
        };
      case "skills":
        return {
          clouds: [
            {
              position: new THREE.Vector3(3, 1, -8),
              scale: 1.3,
              opacity: 0.5,
              speed: 0.35,
            },
            {
              position: new THREE.Vector3(-5, 0, -9),
              scale: 1.1,
              opacity: 0.4,
              speed: 0.3,
            },
          ],
          sparkles: { count: 50, scale: 7, size: 1.7, speed: 0.35, color },
          backgroundColor: "rgba(0, 0, 0, 0.12)",
        };
      case "publications":
        return {
          clouds: [
            {
              position: new THREE.Vector3(-3, 0, -7),
              scale: 1.25,
              opacity: 0.5,
              speed: 0.3,
            },
            {
              position: new THREE.Vector3(6, -1, -9),
              scale: 1.1,
              opacity: 0.4,
              speed: 0.25,
            },
          ],
          sparkles: { count: 45, scale: 6, size: 1.6, speed: 0.3, color },
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        };
      case "certifications":
        return {
          clouds: [
            {
              position: new THREE.Vector3(0, 0, -7),
              scale: 1.2,
              opacity: 0.45,
              speed: 0.3,
            },
            {
              position: new THREE.Vector3(-7, 1, -9),
              scale: 1.0,
              opacity: 0.35,
              speed: 0.25,
            },
          ],
          sparkles: { count: 40, scale: 5, size: 1.5, speed: 0.25, color },
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        };
      case "contact":
        return {
          clouds: [
            {
              position: new THREE.Vector3(4, 0, -7),
              scale: 1.3,
              opacity: 0.5,
              speed: 0.35,
            },
            {
              position: new THREE.Vector3(-4, -1, -9),
              scale: 1.1,
              opacity: 0.4,
              speed: 0.3,
            },
          ],
          sparkles: { count: 55, scale: 6, size: 1.8, speed: 0.35, color },
          backgroundColor: "rgba(0, 0, 0, 0.15)",
        };
      default:
        return {
          clouds: [
            {
              position: new THREE.Vector3(0, 0, -7),
              scale: 1.2,
              opacity: 0.45,
              speed: 0.3,
            },
          ],
          sparkles: { count: 35, scale: 5, size: 1.5, speed: 0.3, color },
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        };
    }
  }, [section, color]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        height: `${height}%`,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.8s ease-in-out",
        backgroundColor: sectionConfig.backgroundColor,
      }}
    >
      {isVisible && (
        <Canvas
          style={{
            background: "transparent",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 10], fov: 45 }}
          dpr={[1, 1.5]}
        >
          {/* Ambient light for basic illumination */}
          <ambientLight intensity={1.2} />

          {/* Main directional light */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            color="#ffffff"
          />

          {/* Animated clouds specific to this section */}
          {sectionConfig.clouds.map((cloud, index) => (
            <AnimatedCloud
              key={`${section}-cloud-${index}`}
              position={cloud.position}
              scale={cloud.scale}
              opacity={cloud.opacity}
              speed={cloud.speed}
              color={color}
            />
          ))}

          {/* Sparkles for magical effect */}
          <Sparkles
            count={sectionConfig.sparkles.count}
            scale={sectionConfig.sparkles.scale}
            size={sectionConfig.sparkles.size}
            speed={sectionConfig.sparkles.speed}
            opacity={0.25}
            color={sectionConfig.sparkles.color}
          />

          {/* Environment lighting */}
          <Environment preset="dawn" />
        </Canvas>
      )}
    </div>
  );
};

export default SectionClouds;
