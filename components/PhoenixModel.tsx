import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";

interface PhoenixModelProps {
  scrollY: number;
  scrollDirection: number; // -1: up, 0: static, 1: down
  scrollSpeed: number;
}

export const PhoenixModel = ({
  scrollY,
  scrollDirection,
  scrollSpeed,
}: PhoenixModelProps) => {
  // References and resources
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/glb/phoenix_bird.glb");
  const { actions, names } = useAnimations(animations, group);
  const modelRef = useRef<Group>(null);
  const { size, viewport, camera } = useThree();

  // Debug loaded state
  useEffect(() => {
    console.log("PhoenixModel loaded", {
      scene: !!scene,
      animations: animations?.length,
      actions: Object.keys(actions || {}),
      animationNames: names,
    });
  }, [scene, animations, actions, names]);

  // Camera state
  const cameraOffset = useRef(new THREE.Vector3(0, 1, 8)); // Camera offset from model
  const cameraTargetPosition = useRef(new THREE.Vector3()); // Target position for camera
  const cameraTargetLookAt = useRef(new THREE.Vector3()); // Target look position for camera

  // Scroll state
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [lastXPosition, setLastXPosition] = useState(0);
  const [flyingSpeed, setFlyingSpeed] = useState(1);

  // Calculate flying speed based on provided scroll speed
  useEffect(() => {
    // Update flying speed based on scroll speed
    // Scale from 0.5 (minimum) to 3 (max speed)
    const newSpeed = scrollSpeed === 0 ? 1 : 0.5 + Math.min(scrollSpeed, 2.5);
    setFlyingSpeed(newSpeed);
  }, [scrollSpeed]);

  // Initial model setup
  useEffect(() => {
    console.log("Setting up model");

    // Setup the model
    if (scene) {
      console.log("Scene found, setting up");

      // Adjust scale - smaller size as requested
      scene.scale.set(0.006, 0.006, 0.006); // Reduced from 0.008 to 0.006
      scene.position.set(0, 0, 0);

      // Ensure all meshes have proper material settings
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.needsUpdate = true;
          }
        }
      });
    }

    // Setup animations
    if (names.length > 0) {
      console.log("Setting up animations:", names);

      // Find animations that look like wing flapping or flying
      const flyingAnimationName =
        names.find(
          (name) =>
            name.toLowerCase().includes("fly") ||
            name.toLowerCase().includes("flap") ||
            name.toLowerCase().includes("wing")
        ) || names[0];

      console.log("Selected animation:", flyingAnimationName);

      // Play animation
      if (actions[flyingAnimationName]) {
        const action = actions[flyingAnimationName];
        action?.reset().play();

        if (action) {
          action.setEffectiveTimeScale(1);
        }
      } else if (names.length > 0) {
        console.log("Falling back to first animation:", names[0]);
        actions[names[0]]?.reset().play();
      }
    }
  }, [scene, actions, names]);

  // Update animation speed based on scrolling
  useEffect(() => {
    if (names.length > 0) {
      const flyingAnimationName =
        names.find(
          (name) =>
            name.toLowerCase().includes("fly") ||
            name.toLowerCase().includes("flap") ||
            name.toLowerCase().includes("wing")
        ) || names[0];

      const action = actions[flyingAnimationName];
      if (action) {
        action.setEffectiveTimeScale(flyingSpeed);
      }
    }
  }, [flyingSpeed, actions, names]);

  // Zigzag movement, rotation and camera control based on scroll position
  useFrame(({ clock }) => {
    if (!modelRef.current || !camera) return;

    // Basic animation time
    const elapsedTime = clock.getElapsedTime();

    // Get document dimensions safely (for SSR compatibility)
    const docHeight =
      typeof document !== "undefined"
        ? Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
          )
        : 5000;
    const windowHeight =
      typeof window !== "undefined" ? window.innerHeight : 800;
    const maxScroll = Math.max(docHeight - windowHeight, 1);

    // Normalized scroll position (0-1)
    const normalizedScrollY = Math.max(0, Math.min(scrollY / maxScroll, 1));

    // ZIGZAG PATTERN SETTINGS
    // =======================
    const horizZigzagWidth = 4; // How wide the zigzag is horizontally
    const zigzagFrequency = 3; // How many zigzags across the page
    const verticalDropFactor = 15; // How far down the model moves during scroll

    // Calculate zigzag horizontal movement (X-axis)
    const xPosition =
      horizZigzagWidth *
      Math.sin(normalizedScrollY * Math.PI * zigzagFrequency);

    // Calculate vertical position (Y-axis)
    // Start higher (7) to be more visible initially and move down as user scrolls
    const yPosition =
      7 -
      normalizedScrollY * verticalDropFactor +
      Math.sin(elapsedTime * 1.2) * 0.3;

    // Calculate depth variation (Z-axis) with different phase than X
    const zPosition =
      -2 + Math.cos(normalizedScrollY * Math.PI * zigzagFrequency * 0.8) * 2;

    // Apply calculated position
    modelRef.current.position.x = xPosition;
    modelRef.current.position.y = yPosition;
    modelRef.current.position.z = zPosition;

    // ROTATION SETTINGS
    // ================

    // Determine movement direction based on change in x-position
    // This ensures bird faces the direction it's moving horizontally
    const isMovingRight = xPosition > lastXPosition;
    setLastXPosition(xPosition);

    // FIXED: Corrected direction - Now if moving right, face LEFT (0), if moving left, face RIGHT (PI)
    // This fixes the "flying backward" issue
    const targetRotationY = isMovingRight ? 0 : Math.PI;

    // Apply rotation with smooth lerping
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotationY, // Face direction of travel
      0.1 // Smoothing factor
    );

    // Adjust vertical tilt (pitch) based on scroll direction and intensity
    // More pronounced vertical tilt - stronger up/down based on scroll direction
    // Range from -0.6 to 0.6 radians for more dramatic effect
    const verticalTiltFactor = 0.6; // Increased from 0.3 to 0.6
    const tiltAmount =
      scrollDirection * verticalTiltFactor * (scrollSpeed || 0.5);

    // Apply vertical tilt with smooth lerping
    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      tiltAmount,
      0.15 // Increased smoothing factor for more responsive tilt
    );

    // Bank into turns (roll - tilt sideways when moving side to side)
    // Calculate banking based on how rapidly the x position is changing
    const bankAmount = -Math.sign(xPosition - lastXPosition) * 0.3;

    // Apply banking with smooth lerping
    modelRef.current.rotation.z = THREE.MathUtils.lerp(
      modelRef.current.rotation.z,
      bankAmount,
      0.08
    );

    // CAMERA CONTROL
    // =============

    // Calculate bird's forward direction vector based on its rotation
    const birdDirection = new THREE.Vector3(0, 0, -1);
    birdDirection.applyQuaternion(modelRef.current.quaternion);

    // Calculate desired camera position based on bird's position and orientation
    // Adjust dynamic offset for dramatic effect during up/down scrolling
    const dynamicOffset = new THREE.Vector3(
      cameraOffset.current.x,
      cameraOffset.current.y + scrollDirection * 0.5, // Move camera up/down based on scroll direction
      cameraOffset.current.z + Math.abs(scrollDirection) * 1 // Pull camera back during active scrolling
    );

    // Transform offset to bird's local space
    const worldOffset = dynamicOffset
      .clone()
      .applyQuaternion(modelRef.current.quaternion);

    // Calculate target camera position
    cameraTargetPosition.current
      .copy(modelRef.current.position)
      .add(worldOffset);

    // Calculate look-ahead point - bird position plus forward direction
    // Look ahead by different amounts based on scroll speed
    const lookAheadFactor = 2 + scrollSpeed * 0.5;
    cameraTargetLookAt.current
      .copy(modelRef.current.position)
      .add(birdDirection.clone().multiplyScalar(lookAheadFactor));

    // Smoothly move camera to target position (with adjusted lerping factor)
    // Use faster lerping (0.07 instead of 0.05) for more responsive camera
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.lerp(cameraTargetPosition.current, 0.07);

      // Create a temporary vector for the camera to look at
      const tempLookAt = new THREE.Vector3();
      tempLookAt.copy(cameraTargetLookAt.current);

      // Smoothly adjust camera look target
      camera.lookAt(tempLookAt);
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
