"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

// This component is used to preload GLB/GLTF models before they're needed
const ModelPreloader = () => {
  useEffect(() => {
    // Preload Phoenix model
    useGLTF.preload("/glb/phoenix_bird.glb");

    return () => {
      // Dispose cache when component unmounts
      useGLTF.clear("/glb/phoenix_bird.glb");
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default ModelPreloader;
