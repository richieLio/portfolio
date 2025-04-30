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

  // Camera state - Using fixed camera offset to prevent zooming
  const cameraOffset = useRef(new THREE.Vector3(0, 1, 8)); // Fixed camera offset
  const cameraTargetPosition = useRef(new THREE.Vector3()); // Target position for camera
  const cameraTargetLookAt = useRef(new THREE.Vector3()); // Target look position for camera

  // Last calculated movement direction - stored as ref to persist between renders without causing re-renders
  const movementDirection = useRef<{ x: number; z: number }>({ x: 0, z: 0 });

  // Default direction the bird should face
  const defaultDirection = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 1)); // Forward is positive Z

  // Boundary detection state
  const isAtBoundary = useRef(false);
  const boundaryTimer = useRef(0);
  const boundaryDirection = useRef(0); // -1: top, 1: bottom

  // Side edge detection state
  const isAtSideEdge = useRef(false);
  const sideEdgeTimer = useRef(0);
  const sideEdgeDirection = useRef(0); // -1: left, 1: right
  const sideEdgeReactionStrength = useRef(0);
  const lastSpiralAngle = useRef(0);
  const lastEdgeHitTime = useRef(0);

  // Current horizontal bounds
  const horizontalBounds = useRef<{ min: number; max: number }>({
    min: -5,
    max: 5,
  });

  // Smooth animation for idle state
  const idleTimer = useRef(0);
  const idleAmplitude = useRef(0.2);
  const boundaryReactionStrength = useRef(0);

  // Spring motion parameters
  const springAmplitude = useRef(3); // Spring amplitude
  const springFrequency = useRef(3); // Spring frequency factor
  const springPhase = useRef(0); // Spring phase offset

  // Scroll state
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [lastXPosition, setLastXPosition] = useState(0);
  const [lastZPosition, setLastZPosition] = useState(0);
  const [flyingSpeed, setFlyingSpeed] = useState(1);

  // Calculate flying speed based on provided scroll speed
  useEffect(() => {
    // Update flying speed based on scroll speed
    // Scale from 0.5 (minimum) to 3 (max speed)
    const newSpeed = scrollSpeed === 0 ? 1 : 0.5 + Math.min(scrollSpeed, 2.5);
    setFlyingSpeed(newSpeed);

    // Reset idle timer when scrolling
    if (scrollSpeed > 0.1) {
      idleTimer.current = 0;
    }
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

      // Set initial rotation to make bird face forward
      scene.rotation.y = Math.PI; // Rotate 180 degrees to face forward

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

  // ZigZag movement, rotation and camera control based on scroll position
  useFrame(({ clock }) => {
    if (!modelRef.current || !camera) return;

    // Basic animation time
    const elapsedTime = clock.getElapsedTime();

    // Update idle timer when not scrolling
    if (scrollSpeed < 0.1) {
      idleTimer.current += 0.016; // Approximately one frame at 60fps
    } else {
      idleTimer.current = 0;
    }

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

    // BOUNDARY DETECTION
    // =================
    // Check if we're at the top or bottom boundary (with a small threshold)
    const boundaryThreshold = 0.03; // 3% from edges
    const wasAtBoundary = isAtBoundary.current;

    if (normalizedScrollY <= boundaryThreshold && scrollDirection === -1) {
      // At top boundary and still trying to scroll up
      isAtBoundary.current = true;
      boundaryDirection.current = -1; // top

      // If we just hit the boundary, reset the timer and start reaction
      if (!wasAtBoundary) {
        boundaryTimer.current = 0;
        boundaryReactionStrength.current = Math.min(scrollSpeed * 2, 1);
      }
    } else if (
      normalizedScrollY >= 1 - boundaryThreshold &&
      scrollDirection === 1
    ) {
      // At bottom boundary and still trying to scroll down
      isAtBoundary.current = true;
      boundaryDirection.current = 1; // bottom

      // If we just hit the boundary, reset the timer and start reaction
      if (!wasAtBoundary) {
        boundaryTimer.current = 0;
        boundaryReactionStrength.current = Math.min(scrollSpeed * 2, 1);
      }
    } else {
      // Not at a boundary
      isAtBoundary.current = false;
    }

    // Update boundary timer if we're at a boundary
    if (isAtBoundary.current) {
      boundaryTimer.current += 0.016; // Increment timer (approximately one frame)

      // Decay the reaction strength over time
      if (boundaryTimer.current > 0.5) {
        // After 0.5 seconds, start decay
        boundaryReactionStrength.current *= 0.95; // Gradual decay
      }
    }

    // SPRING ZIGZAG PATTERN SETTINGS
    // ==============================

    // Update spring phase based on scroll position
    springPhase.current = normalizedScrollY * Math.PI * springFrequency.current;

    // Calculate zigzag pattern (spring-like left-right movement)
    // Use sine waves for natural spring motion
    const springX =
      springAmplitude.current * Math.sin(springPhase.current * 2.5);

    // Add breathing effect when idle
    const idleBreathingEffect =
      Math.sin(elapsedTime * 0.5) * 0.1 +
      (idleTimer.current > 1 ? Math.sin(elapsedTime * 0.8) * 0.15 : 0);

    // Calculate x position with spring-like zigzag effect
    const xPosition =
      springX + (idleTimer.current > 1 ? Math.sin(elapsedTime * 0.3) * 0.5 : 0);

    // Calculate z position with smaller oscillation (for depth)
    const zPosition = Math.sin(springPhase.current * 1.5) * 2;

    // SIDE EDGE DETECTION
    // =================
    // Check if we're at a side edge (left or right)
    const wasAtSideEdge = isAtSideEdge.current;
    const currentTime = elapsedTime;
    const edgeHitCooldown = 1.0; // Prevent rapid edge hits (in seconds)

    // Check for edge hits if not in cooldown
    if (currentTime - lastEdgeHitTime.current > edgeHitCooldown) {
      // Left edge hit
      if (xPosition <= horizontalBounds.current.min && springX < 0) {
        isAtSideEdge.current = true;
        sideEdgeDirection.current = -1; // left edge

        // If we just hit the edge, start the reaction
        if (!wasAtSideEdge) {
          sideEdgeTimer.current = 0;
          sideEdgeReactionStrength.current = Math.min(
            Math.abs(scrollSpeed) * 5,
            1
          );
          lastEdgeHitTime.current = currentTime;
        }
      }
      // Right edge hit
      else if (xPosition >= horizontalBounds.current.max && springX > 0) {
        isAtSideEdge.current = true;
        sideEdgeDirection.current = 1; // right edge

        // If we just hit the edge, start the reaction
        if (!wasAtSideEdge) {
          sideEdgeTimer.current = 0;
          sideEdgeReactionStrength.current = Math.min(
            Math.abs(scrollSpeed) * 5,
            1
          );
          lastEdgeHitTime.current = currentTime;
        }
      } else {
        // Not at a side edge
        isAtSideEdge.current = false;
      }
    }

    // Update side edge timer and reaction
    if (isAtSideEdge.current) {
      sideEdgeTimer.current += 0.016; // Increment timer

      // Decay the reaction strength over time for smoother transition
      if (sideEdgeTimer.current > 0.3) {
        sideEdgeReactionStrength.current *= 0.9; // Decay faster than boundary reactions

        // Clear the edge state after enough decay
        if (sideEdgeReactionStrength.current < 0.05) {
          isAtSideEdge.current = false;
        }
      }
    }

    // Y position - start higher and move down as user scrolls
    // Add a slight oscillation for more natural movement - enhanced when idle
    const idleHoverAmount =
      idleTimer.current > 1 ? Math.sin(elapsedTime * 1.5) * 0.3 : 0;

    // Add boundary reaction for Y position - bounce effect when hitting boundaries
    const boundaryBounce = isAtBoundary.current
      ? Math.sin(boundaryTimer.current * 12) *
        boundaryReactionStrength.current *
        (boundaryDirection.current === -1 ? -0.8 : 0.8)
      : 0;

    // Add side edge bounce - small vertical bounce when hitting side edges
    const sideEdgeBounce = isAtSideEdge.current
      ? Math.sin(sideEdgeTimer.current * 15) *
        sideEdgeReactionStrength.current *
        0.3
      : 0;

    const yPosition =
      7 -
      normalizedScrollY * 15 + // Linear vertical movement with scroll
      Math.sin(elapsedTime * 1.2) * 0.2 + // Small natural up/down movement
      idleHoverAmount +
      boundaryBounce +
      sideEdgeBounce;

    // Apply calculated position
    modelRef.current.position.x = xPosition;
    modelRef.current.position.y = yPosition;
    modelRef.current.position.z = zPosition;

    // ROTATION SETTINGS
    // ================

    // Calculate movement delta
    const deltaX = xPosition - lastXPosition;
    const deltaZ = zPosition - lastZPosition;

    // Only update movement direction when there is significant movement
    // This prevents the bird from rapidly changing direction when almost stationary
    const movementThreshold = 0.001;
    if (
      Math.abs(deltaX) > movementThreshold ||
      Math.abs(deltaZ) > movementThreshold
    ) {
      movementDirection.current = { x: deltaX, z: deltaZ };
    }

    // Store last positions for next frame
    setLastXPosition(xPosition);
    setLastZPosition(zPosition);

    // Calculate facing angle based on movement direction on the XZ plane
    // If not moving significantly (idle), maintain last direction
    let targetRotationY;

    if (isAtSideEdge.current) {
      // Special rotation when hitting side edges - sharp turn away from the edge
      const baseRotation = Math.atan2(
        movementDirection.current.x,
        movementDirection.current.z
      );

      // Calculate reversal angle - rotate sharply away from the edge
      // For left edge hits, rotate right, and vice versa
      const reverseAngle =
        sideEdgeDirection.current === -1 ? Math.PI / -2 : Math.PI / 2;

      // Add a wobble to the rotation for more natural reaction
      const wobbleFactor = Math.sin(sideEdgeTimer.current * 10) * 0.3;

      // Apply the edge hit rotation with stronger effect at start, fading over time
      const edgeRotationStrength =
        Math.max(0, 1 - sideEdgeTimer.current * 2) *
        sideEdgeReactionStrength.current;

      targetRotationY =
        baseRotation + reverseAngle * edgeRotationStrength + wobbleFactor;
    } else if (isAtBoundary.current) {
      // Special rotation when hitting boundaries - looking around as if confused or frustrated
      const lookAroundFactor = boundaryReactionStrength.current * 0.6;
      const baseRotation = Math.atan2(
        movementDirection.current.x,
        movementDirection.current.z
      );

      // At top, look more upward and around
      if (boundaryDirection.current === -1) {
        targetRotationY =
          baseRotation + Math.sin(boundaryTimer.current * 4) * lookAroundFactor;
      }
      // At bottom, look more downward and around
      else {
        targetRotationY =
          baseRotation + Math.cos(boundaryTimer.current * 4) * lookAroundFactor;
      }
    } else if (scrollSpeed < 0.1 && idleTimer.current > 1) {
      // When idle, ensure the bird is facing forward by default with gentle swaying
      const idleRotation = Math.sin(elapsedTime * 0.2) * 0.2;

      // Use a consistent forward direction in the idle state
      // We add Pi because our model's forward direction is +Z in this case
      targetRotationY = Math.PI + idleRotation;
    } else {
      // When moving, face the direction of movement
      // Add PI because we want to face the direction we're moving, not away from it
      targetRotationY = Math.atan2(
        movementDirection.current.x,
        movementDirection.current.z
      );
    }

    // Apply rotation with smooth lerping for horizontal direction
    // Use faster lerping when actively scrolling, slower when idle
    // Even faster when at boundary or side edge for quicker reaction
    const rotationLerpFactor = isAtSideEdge.current
      ? 0.3 // Fastest for side edge hits - need quick reaction
      : isAtBoundary.current
      ? 0.2 // Fast for boundary hits
      : scrollSpeed > 0.1
      ? 0.1 // Medium for active scrolling
      : 0.05; // Slowest when idle

    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotationY,
      rotationLerpFactor
    );

    // Adjust vertical tilt (pitch) based on scroll direction and intensity
    let tiltAmount;

    if (isAtSideEdge.current) {
      // Add a side tilt when hitting side edges - tilt into the direction of the turn
      // This creates a more dramatic banking effect
      const edgeTiltStrength = sideEdgeReactionStrength.current * 0.4;
      tiltAmount = sideEdgeDirection.current * edgeTiltStrength;
    } else if (isAtBoundary.current) {
      // Special tilt at boundaries - looking up at top boundary, down at bottom
      const boundaryCurveFactor =
        Math.sin(boundaryTimer.current * 6) * boundaryReactionStrength.current;

      // More extreme tilt at boundaries
      if (boundaryDirection.current === -1) {
        // At top - look up more dramatically (negative pitch)
        tiltAmount = -0.8 + boundaryCurveFactor * 0.3; // Exaggerated upward tilt with oscillation
      } else {
        // At bottom - look down more dramatically (positive pitch)
        tiltAmount = 0.8 + boundaryCurveFactor * 0.3; // Exaggerated downward tilt with oscillation
      }
    } else if (scrollSpeed < 0.1 && idleTimer.current > 1) {
      // Add gentle bobbing motion when idle
      tiltAmount = Math.sin(elapsedTime * 0.7) * 0.1;
    } else {
      // Use scroll direction for tilt when scrolling
      const verticalTiltFactor = 0.6;
      tiltAmount = scrollDirection * verticalTiltFactor * (scrollSpeed || 0.5);
    }

    // Apply vertical tilt with smooth lerping
    // Faster response at boundaries and side edges
    const tiltLerpFactor = isAtSideEdge.current
      ? 0.35 // Fastest for side edge hits
      : isAtBoundary.current
      ? 0.25 // Fast for boundary hits
      : scrollSpeed > 0.1
      ? 0.15 // Medium for active scrolling
      : 0.05; // Slowest when idle

    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      tiltAmount,
      tiltLerpFactor
    );

    // Bank into turns (roll - tilt sideways when moving through the spiral)
    let bankAmount;

    if (isAtSideEdge.current) {
      // Enhanced banking when hitting side edges
      // This creates a dramatic rolling effect when the bird hits an edge and changes direction
      const sideBankFactor = 0.7; // More extreme banking on side hits
      bankAmount =
        sideEdgeDirection.current *
        sideBankFactor *
        sideEdgeReactionStrength.current *
        Math.sin(sideEdgeTimer.current * 8);
    } else if (isAtBoundary.current) {
      // Add a wobble effect at boundaries as if pushing against a barrier
      bankAmount =
        Math.sin(boundaryTimer.current * 8) *
        boundaryReactionStrength.current *
        0.4;
    } else if (scrollSpeed < 0.1 && idleTimer.current > 1) {
      // Gentle banking when idle
      bankAmount = Math.sin(elapsedTime * 0.3) * 0.1;
    } else {
      // Normal banking when moving
      bankAmount =
        -Math.sign(deltaX) * 0.3 * Math.min(Math.abs(deltaX) * 10, 1);
    }

    // Apply banking with smooth lerping
    // Faster reaction at boundaries and edges
    const bankLerpFactor = isAtSideEdge.current
      ? 0.35 // Fastest for side edges
      : isAtBoundary.current
      ? 0.2 // Fast for boundaries
      : scrollSpeed > 0.1
      ? 0.08 // Medium for active scrolling
      : 0.03; // Slowest when idle

    modelRef.current.rotation.z = THREE.MathUtils.lerp(
      modelRef.current.rotation.z,
      bankAmount,
      bankLerpFactor
    );

    // CAMERA CONTROL
    // =============
    // Fixed camera control to prevent unwanted zoom effect

    // Calculate bird's forward direction vector based on its rotation
    const birdDirection = new THREE.Vector3(0, 0, -1);
    birdDirection.applyQuaternion(modelRef.current.quaternion);

    // Use fixed camera offset to prevent zooming effect
    const fixedCameraPosition = new THREE.Vector3();
    fixedCameraPosition
      .copy(modelRef.current.position)
      .add(cameraOffset.current);

    // Only add very minor camera adjustments for dramatic movements
    if (isAtSideEdge.current) {
      // Add very small side adjustment when hitting edges
      fixedCameraPosition.x +=
        sideEdgeDirection.current * 0.2 * sideEdgeReactionStrength.current;
    }

    // Calculate look-ahead point for camera
    const fixedLookTarget = new THREE.Vector3();
    fixedLookTarget
      .copy(modelRef.current.position)
      .add(birdDirection.multiplyScalar(2));

    // Apply much slower camera motion to prevent jerky/zooming appearance
    if (camera instanceof THREE.PerspectiveCamera) {
      // Very slow camera movement for smoother transitions
      camera.position.lerp(fixedCameraPosition, 0.03);
      camera.lookAt(fixedLookTarget);
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
