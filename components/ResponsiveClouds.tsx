"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Import components with SSR disabled
const SectionClouds = dynamic(() => import("@/components/SectionClouds"), {
  ssr: false,
  loading: () => null,
});

const CloudMobile = dynamic(() => import("@/components/CloudMobile"), {
  ssr: false,
  loading: () => null,
});

interface ResponsiveCloudsProps {
  section: string;
  color?: string;
  height?: number;
}

/**
 * ResponsiveClouds - Renders the appropriate cloud effect based on device capabilities
 * Uses 3D clouds for desktop/high-performance devices and CSS clouds for mobile/low-performance devices
 */
const ResponsiveClouds = ({
  section,
  color = "white",
  height = 100,
}: ResponsiveCloudsProps) => {
  // Default to mobile version until we can detect capabilities
  const [useMobile, setUseMobile] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're running on client
    setIsClient(true);

    // Detect if device should use mobile version
    const shouldUseMobile = () => {
      // Check if it's a mobile device
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      // Check if screen is narrow
      const isNarrowScreen = window.innerWidth < 768;

      // Check for low-end devices (simplified check)
      const isLowEndDevice = navigator.hardwareConcurrency
        ? navigator.hardwareConcurrency <= 4
        : false;

      return isMobileDevice || isNarrowScreen || isLowEndDevice;
    };

    setUseMobile(shouldUseMobile());

    // Listen for resize events to update the view if necessary
    const handleResize = () => {
      setUseMobile(shouldUseMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Return null during SSR to avoid hydration mismatch
  if (!isClient) return null;

  // Colors for specific sections
  const getColor = () => {
    switch (section) {
      case "banner":
        return "white";
      case "intro":
        return "#f0f8ff";
      case "description":
        return "#f5f5f5";
      case "skills":
        return "#f0ffff";
      case "publications":
        return "#fff5f5";
      case "certifications":
        return "#f5fffa";
      case "contact":
        return "white";
      default:
        return color;
    }
  };

  // Render appropriate cloud component based on device capability
  return useMobile ? (
    <CloudMobile section={section} color={getColor()} height={height} />
  ) : (
    <SectionClouds section={section} color={getColor()} height={height} />
  );
};

export default ResponsiveClouds;
