import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";
import gsap from "gsap";

interface PhoenixModelProps {
  scrollY: number;
  currentSection: string;
}

// Define positions and rotations for each section
const sectionPositions = [
  {
    id: "banner",
    position: { x: 0, y: 2, z: 0 },
    rotation: { x: 0, y: -1, z: 0 },
  },
  {
    id: "intro",
    position: { x: 1, y: 0, z: -2 },
    rotation: { x: 0.5, y: -0.5, z: 0 },
  },
  {
    id: "description",
    position: { x: -1, y: -1, z: -3 },
    rotation: { x: 0, y: 0.5, z: 0 },
  },
  {
    id: "contact",
    position: { x: 0.8, y: 1, z: 0 },
    rotation: { x: 0.3, y: -0.5, z: 0 },
  },
];

export const PhoenixModel = ({
  scrollY,
  currentSection,
}: PhoenixModelProps) => {
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
      const flyingAnimationName =
        names.find(
          (name) =>
            name.toLowerCase().includes("fly") ||
            name.toLowerCase().includes("flap") ||
            name.toLowerCase().includes("wing")
        ) || names[0];

      const action = actions[flyingAnimationName];
      if (action) {
        action.reset().play();
        action.setEffectiveTimeScale(0.8);
      }
    }
  }, [scene, actions, names]);

  // Move model to the position for the current section
  useEffect(() => {
    if (!modelRef.current || !currentSection) return;

    const targetPosition = sectionPositions.find(
      (section) => section.id === currentSection
    );

    if (targetPosition) {
      // Animate to new position and rotation using gsap
      gsap.to(modelRef.current.position, {
        x: targetPosition.position.x,
        y: targetPosition.position.y,
        z: targetPosition.position.z,
        duration: 1.5,
        ease: "power2.out",
      });

      gsap.to(modelRef.current.rotation, {
        x: targetPosition.rotation.x,
        y: targetPosition.rotation.y,
        z: targetPosition.rotation.z,
        duration: 1.5,
        ease: "power2.out",
      });
    }
  }, [currentSection]);

  // Animation frame
  useFrame(() => {
    if (!modelRef.current || !camera) return;

    // Update camera to follow the model
    if (camera instanceof THREE.PerspectiveCamera) {
      // Create an offset position for the camera
      const cameraTargetPosition = new THREE.Vector3(
        modelRef.current.position.x,
        modelRef.current.position.y,
        modelRef.current.position.z + 6
      );

      // Smoothly move the camera to look at the model
      camera.position.lerp(cameraTargetPosition, 0.05);
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
