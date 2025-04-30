import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";

interface PhoenixModelProps {
  scrollY: number;
}

export const PhoenixModel = ({ scrollY }: PhoenixModelProps) => {
  // References
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/glb/phoenix_bird.glb");
  const { actions, names } = useAnimations(animations, group);
  const modelRef = useRef<Group>(null);
  const { camera } = useThree();

  // Initial model setup
  useEffect(() => {
    // Setup model scale and position
    if (scene) {
      scene.scale.set(0.006, 0.006, 0.006);
      scene.rotation.y = 0;
    }

    // Setup animation
    if (names.length > 0 && actions) {
      const animationName = names[0];
      const action = actions[animationName];
      if (action) {
        action.reset().play();
      }
    }
  }, [scene, actions, names]);

  // Animation frame
  useFrame(() => {
    if (!modelRef.current || !camera) return;

    // Get document dimensions
    const docHeight =
      typeof document !== "undefined"
        ? document.documentElement.scrollHeight
        : 5000;
    const windowHeight =
      typeof window !== "undefined" ? window.innerHeight : 800;
    const maxScroll = Math.max(docHeight - windowHeight, 1);

    // Normalized scroll position (0-1)
    const normalizedScrollY = Math.max(0, Math.min(scrollY / maxScroll, 1));

    // Simple vertical movement based on scroll
    modelRef.current.position.y = 5 - normalizedScrollY * 10;

    // Update camera
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.set(0, modelRef.current.position.y, 8);
      camera.lookAt(modelRef.current.position);
    }
  });

  return (
    <group ref={group}>
      <group ref={modelRef}>
        <primitive object={scene} dispose={null} />
      </group>
    </group>
  );
};

export default PhoenixModel;
