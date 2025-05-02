import { useEffect, useRef, useState } from "react";
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
    position: { x: 4, y: -1.5, z: 0 },
    rotation: { x: 0.1, y: -0.8, z: 0.05 },
    entranceRotation: { x: Math.PI * 2, y: 0, z: 0 }, // Lộn ngược 360 độ theo trục x
  },
  {
    id: "intro",
    position: { x: -6, y: -2, z: -2 },
    rotation: { x: 0.2, y: 0.8, z: -0.05 },
    entranceRotation: { x: 0, y: 0, z: Math.PI * 2 }, // Lộn vòng 360 độ theo trục z
  },
  {
    id: "description",
    position: { x: 7, y: -2.5, z: -3 },
    rotation: { x: -0.1, y: -0.8, z: 0.1 },
    entranceRotation: { x: -Math.PI, y: 0, z: Math.PI }, // Lộn ngược nửa vòng theo trục x và z
  },
  {
    id: "skills",
    position: { x: -4, y: -1, z: 0 },
    rotation: { x: 0.3, y: 0.8, z: 0.1 },
    entranceRotation: { x: Math.PI, y: Math.PI, z: 0 }, // Lộn ngược và xoay 180 độ
  },
  {
    id: "publications",
    position: { x: 6, y: -2, z: -2 }, // Cột phải
    rotation: { x: 0.1, y: -0.8, z: 0.05 },
    entranceRotation: { x: 0, y: Math.PI * 2, z: 0 }, // Xoay 360 độ theo trục y
  },
  {
    id: "certifications",
    position: { x: -5.5, y: -1.5, z: -1 }, // Cột trái
    rotation: { x: 0.2, y: 0.8, z: 0 },
    entranceRotation: { x: Math.PI, y: 0, z: -Math.PI }, // Lộn ngược và xoay ngược
  },
  {
    id: "approach",
    position: { x: 4, y: -2, z: -1 }, // Cột phải
    rotation: { x: 0, y: -0.9, z: 0.1 },
    entranceRotation: { x: 0, y: 0, z: Math.PI * 2 }, // Xoay 360 độ theo trục z
  },
];

export const PhoenixModel = ({
  scrollY,
  currentSection,
}: PhoenixModelProps) => {
  // References
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/glb/helicopter.glb");
  const { actions, names } = useAnimations(animations, group);
  const modelRef = useRef<Group>(null);
  const { camera } = useThree();
  const [hovering, setHovering] = useState(false);
  const [lastSection, setLastSection] = useState("");

  // Initial model setup
  useEffect(() => {
    // Setup model scale and position
    if (scene) {
      scene.scale.set(1.4, 1.4, 1.4);
      scene.rotation.y = 0;
    }

    // Setup animation
    if (names.length > 0 && actions) {
      const helicopterAnimationName = names[0]; // Use the first animation available

      const action = actions[helicopterAnimationName];
      if (action) {
        action.reset().play();
        action.setEffectiveTimeScale(0.8);
      }
    }
  }, [scene, actions, names]);

  // Move model to the position for the current section
  useEffect(() => {
    if (!modelRef.current || !currentSection) return;

    // Lưu section trước đó
    const isFirstTransition = lastSection === "";
    const previousSection = lastSection;
    setLastSection(currentSection);

    const targetPosition = sectionPositions.find(
      (section) => section.id === currentSection
    );

    if (targetPosition) {
      // Tạo hiệu ứng bay lộn ngược khi chuyển section
      if (!isFirstTransition) {
        // Timeline để phối hợp các animation
        const tl = gsap.timeline();

        // Chuẩn bị cho động tác lộn ngược - bay lên cao vừa phải
        const midPointY = modelRef.current.position.y + 1; // Giảm độ cao khi bay (từ +2 xuống +1)

        // Bắt đầu với việc di chuyển sang ngang một chút để tạo đà
        tl.to(modelRef.current.position, {
          x:
            modelRef.current.position.x +
            (targetPosition.position.x > 0 ? -1 : 1), // Di chuyển ngược hướng để lấy đà
          y: midPointY, // Bay lên cao vừa phải
          duration: 0.6,
          ease: "power1.in",
        });

        // Thực hiện động tác lộn ngược nhanh
        tl.to(
          modelRef.current.rotation,
          {
            x: targetPosition.entranceRotation.x,
            y: targetPosition.entranceRotation.y,
            z: targetPosition.entranceRotation.z,
            duration: 1.2, // Nhanh hơn một chút để tạo cảm giác mạnh mẽ
            ease: "power1.inOut",
          },
          "-=0.3"
        );

        // Đồng thời di chuyển đến gần vị trí đích
        tl.to(
          modelRef.current.position,
          {
            x: targetPosition.position.x * 0.7, // Tiến gần đến vị trí cuối
            y: targetPosition.position.y + 0.5, // Hơi cao hơn vị trí cuối
            z: targetPosition.position.z,
            duration: 1,
            ease: "power1.out",
          },
          "-=1"
        );

        // Hoàn thành chuyển động đến vị trí cuối cùng
        tl.to(modelRef.current.position, {
          x: targetPosition.position.x,
          y: targetPosition.position.y,
          z: targetPosition.position.z,
          duration: 0.7,
          ease: "power2.out",
        });

        // Đồng thời hoàn thành xoay đến góc cuối cùng
        tl.to(
          modelRef.current.rotation,
          {
            x: targetPosition.rotation.x,
            y: targetPosition.rotation.y,
            z: targetPosition.rotation.z,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.7"
        );
      } else {
        // Nếu là lần đầu tiên, chỉ đặt vị trí
        gsap.to(modelRef.current.position, {
          x: targetPosition.position.x,
          y: targetPosition.position.y,
          z: targetPosition.position.z,
          duration: 2.5,
          ease: "power2.inOut",
        });

        gsap.to(modelRef.current.rotation, {
          x: targetPosition.rotation.x,
          y: targetPosition.rotation.y,
          z: targetPosition.rotation.z,
          duration: 2.5,
          ease: "power2.inOut",
        });
      }
    }
  }, [currentSection, lastSection]);

  // Animation frame - thêm hiệu ứng lơ lửng liên tục
  useFrame(({ clock }) => {
    if (!modelRef.current || !camera) return;

    // Thêm hiệu ứng lơ lửng nhẹ nhàng cho trực thăng
    if (modelRef.current) {
      // Tạo chuyển động lên xuống nhẹ nhàng - giảm biên độ
      const hoverOffset = Math.sin(clock.getElapsedTime() * 1.5) * 0.05; // Giảm từ 0.08 xuống 0.05
      modelRef.current.position.y +=
        hoverOffset - (modelRef.current.userData.lastHoverOffset || 0);
      modelRef.current.userData.lastHoverOffset = hoverOffset;

      // Tạo hiệu ứng nghiêng nhẹ theo thời gian - tăng biên độ để thấy rõ chuyển động
      const tiltOffset = Math.sin(clock.getElapsedTime() * 0.8) * 0.05; // Tăng từ 0.03 lên 0.05
      modelRef.current.rotation.z +=
        tiltOffset - (modelRef.current.userData.lastTiltOffset || 0);
      modelRef.current.userData.lastTiltOffset = tiltOffset;

      // Hiệu ứng quay nhẹ theo trục y
      const rotationOffset = Math.sin(clock.getElapsedTime() * 0.5) * 0.02;
      modelRef.current.rotation.y +=
        rotationOffset - (modelRef.current.userData.lastRotationOffset || 0);
      modelRef.current.userData.lastRotationOffset = rotationOffset;
    }

    // Update camera to maintain a central fixed position
    if (camera instanceof THREE.PerspectiveCamera) {
      // Set a fixed camera position that views the entire scene
      const fixedCameraPosition = new THREE.Vector3(
        0, // Keep camera centered on x-axis
        0.5, // Giảm camera thấp hơn (từ 1 xuống 0.5)
        8 // Giữ nguyên giá trị z
      );

      // Gradually move camera to fixed position
      camera.position.lerp(fixedCameraPosition, 0.05);

      // Look at center of scene, but slightly lower
      const lookAtPoint = new THREE.Vector3(0, -1.5, 0);
      camera.lookAt(lookAtPoint);
    }
  });

  return (
    <group ref={group}>
      <group
        ref={modelRef}
        onPointerOver={() => setHovering(true)}
        onPointerOut={() => setHovering(false)}
      >
        <primitive object={scene} dispose={null} />
      </group>
    </group>
  );
};

export default PhoenixModel;
