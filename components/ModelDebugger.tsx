"use client";

import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Component to help debug model loading issues
export default function ModelDebugger() {
  // Load model directly with the hook
  const { scene, animations } = useGLTF("/glb/phoenix_bird.glb");

  const [modelInfo, setModelInfo] = useState<{
    loaded: boolean;
    error: string | null;
    details: any;
  }>({
    loaded: false,
    error: null,
    details: null,
  });

  useEffect(() => {
    console.log("ModelDebugger: Checking phoenix_bird.glb...");

    // Check if model loads properly
    try {
      if (scene) {
        console.log("Model loaded successfully:", {
          scene: !!scene,
          animations: animations?.length || 0,
          materialCount: countMaterials(scene),
          geometryCount: countGeometries(scene),
        });

        setModelInfo({
          loaded: true,
          error: null,
          details: {
            scene: !!scene,
            animations: animations?.length || 0,
            materialCount: countMaterials(scene),
            geometryCount: countGeometries(scene),
          },
        });
      } else {
        throw new Error("Scene not loaded");
      }
    } catch (error) {
      console.error("Error loading model:", error);
      setModelInfo({
        loaded: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: null,
      });
    }
  }, [scene, animations]);

  // Helper functions to count scene objects
  const countMaterials = (scene: THREE.Object3D) => {
    let count = 0;
    if (!scene) return 0;

    scene.traverse((node: THREE.Object3D) => {
      if ((node as THREE.Mesh).material) count++;
    });

    return count;
  };

  const countGeometries = (scene: THREE.Object3D) => {
    let count = 0;
    if (!scene) return 0;

    scene.traverse((node: THREE.Object3D) => {
      if ((node as THREE.Mesh).geometry) count++;
    });

    return count;
  };

  // Return a simple debugging panel
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        zIndex: 1000,
        maxWidth: "300px",
        fontSize: "12px",
        fontFamily: "monospace",
      }}
    >
      <h3>Model Debugger</h3>
      <div>
        <strong>Status:</strong>{" "}
        {modelInfo.loaded ? "✅ Loaded" : "❌ Not Loaded"}
      </div>
      {modelInfo.error && (
        <div>
          <strong>Error:</strong> {modelInfo.error}
        </div>
      )}
      {modelInfo.details && (
        <div>
          <strong>Details:</strong>
          <pre>{JSON.stringify(modelInfo.details, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
