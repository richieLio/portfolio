"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CloudMobileProps {
  section: string;
  height?: number;
  color?: string;
}

/**
 * CloudMobile - A lightweight cloud animation for mobile devices
 * Uses CSS animations instead of Three.js for better performance
 */
const CloudMobile = ({
  section,
  height = 100,
  color = "#ffffff",
}: CloudMobileProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only render when visible in viewport
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

  // Section-specific configuration
  const getSectionConfig = () => {
    switch (section) {
      case "banner":
        return {
          cloudCount: 2,
          backgroundColor: "rgba(0, 0, 0, 0.15)",
          sparkleCount: 6,
        };
      case "intro":
        return {
          cloudCount: 1,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          sparkleCount: 5,
        };
      case "description":
        return {
          cloudCount: 1,
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          sparkleCount: 4,
        };
      case "skills":
        return {
          cloudCount: 2,
          backgroundColor: "rgba(0, 0, 0, 0.12)",
          sparkleCount: 5,
        };
      case "publications":
        return {
          cloudCount: 1,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          sparkleCount: 4,
        };
      case "certifications":
        return {
          cloudCount: 1,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          sparkleCount: 4,
        };
      case "contact":
        return {
          cloudCount: 2,
          backgroundColor: "rgba(0, 0, 0, 0.15)",
          sparkleCount: 5,
        };
      default:
        return {
          cloudCount: 1,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          sparkleCount: 4,
        };
    }
  };

  const config = getSectionConfig();

  // Generate array of clouds based on count
  const generateClouds = () => {
    return Array.from({ length: config.cloudCount }, (_, i) => {
      // Distribute clouds across the container
      const left = 10 + (i * 80) / config.cloudCount;

      // Vary sizes and animation speeds
      const size = 45 + Math.random() * 20;
      const duration = 25 + Math.random() * 5;
      const delay = Math.random() * 3;

      // Vary vertical position
      const top = 20 + Math.random() * 60;

      return { left, top, size, duration, delay };
    });
  };

  // Generate sparkles
  const generateSparkles = () => {
    return Array.from({ length: config.sparkleCount }, (_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = 2 + Math.random() * 2;
      const duration = 1.5 + Math.random() * 1;
      const delay = Math.random() * 2;

      return { left, top, size, duration, delay };
    });
  };

  const clouds = generateClouds();
  const sparkles = generateSparkles();

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        height: `${height}%`,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.8s ease-in-out",
        backgroundColor: config.backgroundColor,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      {isVisible && (
        <>
          {/* Render CSS-based clouds */}
          {clouds.map((cloud, index) => (
            <motion.div
              key={`cloud-${section}-${index}`}
              className="absolute rounded-full opacity-50"
              style={{
                backgroundColor: color,
                width: `${cloud.size}px`,
                height: `${cloud.size * 0.6}px`,
                left: `${cloud.left}%`,
                top: `${cloud.top}%`,
                filter: "blur(8px)",
              }}
              animate={{
                x: [0, 5, -5, 0],
                y: [0, 3, -3, 0],
              }}
              transition={{
                duration: cloud.duration,
                ease: "easeInOut",
                delay: cloud.delay,
                repeat: Infinity,
              }}
            />
          ))}

          {/* Render sparkles */}
          {sparkles.map((sparkle, index) => (
            <motion.div
              key={`sparkle-${section}-${index}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: sparkle.duration,
                delay: sparkle.delay,
                repeat: Infinity,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CloudMobile;
