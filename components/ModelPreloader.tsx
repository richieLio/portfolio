"use client";

import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

// This component is used to preload GLB/GLTF models before they're needed
const ModelPreloader = () => {
  useEffect(() => {
    // Preload Helicopter model
    useGLTF.preload("/glb/helicopter.glb");

    return () => {
      // Dispose cache when component unmounts
      useGLTF.clear("/glb/helicopter.glb");
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default ModelPreloader;
