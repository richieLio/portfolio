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

  // Last calculated movement direction - stored as ref to persist between renders without causing re-renders
  const movementDirection = useRef<{ x: number; z: number }>({ x: 0, z: 0 });

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
    min: -4,
    max: 4,
  });

  // Smooth animation for idle state
  const idleTimer = useRef(0);
  const idleAmplitude = useRef(0.2);
  const boundaryReactionStrength = useRef(0);

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

  // Spiral movement, rotation and camera control based on scroll position
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

    // SPIRAL PATTERN SETTINGS
    // =======================
    const spiralRadius = 4; // Base radius of the spiral
    const spiralHeight = 15; // Total height of the spiral
    const spiralTurns = 2.5; // Number of full turns in the spiral

    // Calculate progress along the spiral (0 to 2π × number of turns)
    const spiralAngle = normalizedScrollY * Math.PI * 2 * spiralTurns;

    // Calculate horizontal bounds - these will define our "walls"
    // The spiral radius changes as we move up/down, so our bounds change too
    const horizontalBoundaryFactor = 1.05; // 5% outside the normal radius as threshold
    horizontalBounds.current = {
      min: -spiralRadius * horizontalBoundaryFactor,
      max: spiralRadius * horizontalBoundaryFactor,
    };

    // Calculate spiral radius with breathing effect
    // Add stronger breathing effect when idle for more interesting hover state
    const idleBreathingEffect =
      Math.sin(elapsedTime * 0.5) * 0.1 +
      (idleTimer.current > 1 ? Math.sin(elapsedTime * 0.8) * 0.15 : 0);

    // Calculate spiral radius that gets tighter as we progress
    const dynamicRadius =
      spiralRadius *
      (1 - normalizedScrollY * 0.3) * // Gradually reduce radius as we scroll down
      (1 + idleBreathingEffect); // Add breathing effect

    // Calculate position on spiral - X and Z form the circular part of the spiral
    const xPosition = dynamicRadius * Math.cos(spiralAngle);
    const zPosition = dynamicRadius * Math.sin(spiralAngle);

    // SIDE EDGE DETECTION
    // =================
    // Check if we're at a side edge (left or right of spiral)
    const wasAtSideEdge = isAtSideEdge.current;
    const spiralAngleDelta = spiralAngle - lastSpiralAngle.current;
    const currentTime = elapsedTime;
    const edgeHitCooldown = 1.0; // Prevent rapid edge hits (in seconds)

    // Only check for edge hits if we've moved enough along the spiral
    // and not during the cooldown period after a previous hit
    if (
      Math.abs(spiralAngleDelta) > 0.05 &&
      currentTime - lastEdgeHitTime.current > edgeHitCooldown
    ) {
      // Calculate an edge hit based on x-position compared to horizontal bounds
      // and direction of movement
      const isMovingRight = xPosition > lastXPosition;
      const isMovingLeft = xPosition < lastXPosition;

      // Left edge hit - we're at the left bound and still trying to move left
      if (xPosition <= horizontalBounds.current.min && isMovingLeft) {
        isAtSideEdge.current = true;
        sideEdgeDirection.current = -1; // left edge

        // If we just hit the edge, start the reaction
        if (!wasAtSideEdge) {
          sideEdgeTimer.current = 0;
          sideEdgeReactionStrength.current = Math.min(
            Math.abs(spiralAngleDelta) * 5,
            1
          );
          lastEdgeHitTime.current = currentTime;
        }
      }
      // Right edge hit - we're at the right bound and still trying to move right
      else if (xPosition >= horizontalBounds.current.max && isMovingRight) {
        isAtSideEdge.current = true;
        sideEdgeDirection.current = 1; // right edge

        // If we just hit the edge, start the reaction
        if (!wasAtSideEdge) {
          sideEdgeTimer.current = 0;
          sideEdgeReactionStrength.current = Math.min(
            Math.abs(spiralAngleDelta) * 5,
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

    // Store current spiral angle for next frame
    lastSpiralAngle.current = spiralAngle;

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
      normalizedScrollY * spiralHeight +
      Math.sin(elapsedTime * 1.2) * 0.2 +
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
      // When idle, slowly rotate to face a consistent direction or add gentle swaying
      // This creates a more natural "hovering" behavior
      const idleRotation = Math.sin(elapsedTime * 0.2) * 0.2;
      targetRotationY =
        Math.atan2(movementDirection.current.x, movementDirection.current.z) +
        idleRotation;
    } else {
      // When moving, face the direction of movement
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

    // Calculate bird's forward direction vector based on its rotation
    const birdDirection = new THREE.Vector3(0, 0, -1);
    birdDirection.applyQuaternion(modelRef.current.quaternion);

    // Calculate desired camera position based on bird's position and orientation
    // Adjust dynamic offset for dramatic effect during up/down scrolling or at boundaries
    let cameraYOffset = cameraOffset.current.y + scrollDirection * 0.5;
    let cameraZOffset = cameraOffset.current.z + Math.abs(scrollDirection) * 1;
    let cameraXOffset = cameraOffset.current.x;

    // Additional camera adjustments for boundary reactions
    if (isAtSideEdge.current) {
      // Pull camera back and to the side a bit to better see the edge reaction
      cameraZOffset += 2 * sideEdgeReactionStrength.current;
      cameraXOffset +=
        sideEdgeDirection.current * sideEdgeReactionStrength.current * 0.5;
    } else if (isAtBoundary.current) {
      if (boundaryDirection.current === -1) {
        // At top - pull camera back and higher to see bird looking up
        cameraYOffset += 1 * boundaryReactionStrength.current;
        cameraZOffset += 2 * boundaryReactionStrength.current;
      } else {
        // At bottom - pull camera back and lower to see bird looking down
        cameraYOffset -= 1 * boundaryReactionStrength.current;
        cameraZOffset += 2 * boundaryReactionStrength.current;
      }
    } else if (idleTimer.current > 1) {
      // Add gentle up/down when idle
      cameraYOffset += Math.sin(elapsedTime * 0.5) * 0.2;
    }

    const dynamicOffset = new THREE.Vector3(
      cameraXOffset,
      cameraYOffset,
      cameraZOffset
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
    // Look ahead by different amounts based on scroll speed or boundary state
    let lookAheadFactor = 2 + scrollSpeed * 0.5;

    // Adjust look-ahead for boundary reactions
    if (isAtSideEdge.current) {
      // Reduce look-ahead distance to focus more on the bird's side edge reaction
      lookAheadFactor = 1.2;
    } else if (isAtBoundary.current) {
      // Reduce look-ahead distance to focus more on the bird's reaction
      lookAheadFactor = 1.5;
    }

    cameraTargetLookAt.current
      .copy(modelRef.current.position)
      .add(birdDirection.clone().multiplyScalar(lookAheadFactor));

    // Smoothly move camera to target position
    // Faster camera response at boundaries for more dramatic effect
    const cameraLerpFactor = isAtSideEdge.current
      ? 0.15 // Fastest for side edges
      : isAtBoundary.current
      ? 0.12 // Fast for boundaries
      : 0.07; // Normal speed otherwise

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.lerp(cameraTargetPosition.current, cameraLerpFactor);

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
