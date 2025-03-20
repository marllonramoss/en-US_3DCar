"use client";

import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Group, MeshStandardMaterial, Mesh, MeshPhysicalMaterial } from "three";
import { useCar } from "@/context/CarContext";

export default function CarModel() {
  const group = useRef<Group>(null);
  const { selectedCar } = useCar();
  const { nodes } = useGLTF(selectedCar.path);
  const { bodyColor } = useCar();

  useEffect(() => {
    // Adjust car position and rotation based on the selected model
    if (group.current) {
      // Find the lowest Y position among all meshes
      let minY = Infinity;
      let maxY = -Infinity;
      Object.values(nodes).forEach((node) => {
        if (node instanceof Mesh) {
          const geometry = node.geometry;
          const position = geometry.attributes.position;
          for (let i = 0; i < position.count; i++) {
            const y = position.getY(i);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
          }
        }
      });

      // Calculate the center point of the model
      const modelHeight = maxY - minY;

      // Apply specific adjustments based on the car model
      switch (selectedCar.id) {
        case "byd":
          group.current.rotation.x = -Math.PI / 2; // Rotate 90 degrees to fix upside down
          group.current.position.y = -modelHeight / 4; // Move down to be closer to the ground
          break;
        case "vayanne":
        default:
          group.current.rotation.x = 0;
          group.current.position.y = -modelHeight / 1.2; // Move down even more by increasing the negative offset
          break;
      }
    }
  }, [nodes, selectedCar]);

  useEffect(() => {
    // Apply color to the main body of the car
    Object.entries(nodes).forEach(([name, node]) => {
      if (node instanceof Mesh) {
        // Find the main body part based on the car model
        const isMainBody =
          selectedCar.id === "vayanne"
            ? name ===
              "car_deus_vayannechassis_carpaint_chassis_carpaint_None_carPaint_0"
            : name.toLowerCase().includes("body") ||
              name.toLowerCase().includes("chassis");

        if (isMainBody) {
          const material = node.material;

          if (
            material instanceof MeshPhysicalMaterial ||
            material instanceof MeshStandardMaterial
          ) {
            // Preserve original textures
            const originalMap = material.map;
            const originalNormalMap = material.normalMap;
            const originalRoughnessMap = material.roughnessMap;
            const originalMetalnessMap = material.metalnessMap;
            const originalAOMap = material.aoMap;

            // Apply new color and adjust material properties based on the car model
            material.color.set(bodyColor);

            if (selectedCar.id === "byd") {
              material.roughness = 0.1; // Even less rough for more shine
              material.metalness = 1.0; // Maximum metallic
              material.envMapIntensity = 3.0; // Much stronger environment reflections
              if (material instanceof MeshPhysicalMaterial) {
                material.clearcoat = 1.0;
                material.clearcoatRoughness = 0.05; // Even smoother clearcoat
              }
            } else {
              material.roughness = 0.05; // Very smooth for maximum shine
              material.metalness = 1.0; // Maximum metallic
              material.envMapIntensity = 3.5; // Very strong environment reflections
              if (material instanceof MeshPhysicalMaterial) {
                material.clearcoat = 1.0;
                material.clearcoatRoughness = 0.05; // Very smooth clearcoat
              }
            }

            material.needsUpdate = true;

            // Restore textures
            material.map = originalMap;
            material.normalMap = originalNormalMap;
            material.roughnessMap = originalRoughnessMap;
            material.metalnessMap = originalMetalnessMap;
            material.aoMap = originalAOMap;
          }
        }
      }
    });
  }, [bodyColor, nodes, selectedCar]);

  return (
    <group ref={group} dispose={null} castShadow receiveShadow>
      {/* Render all available meshes */}
      {Object.values(nodes).map((node, index) => {
        if (node instanceof Mesh) {
          return (
            <mesh
              key={index}
              geometry={node.geometry}
              material={node.material}
              castShadow
              receiveShadow
            />
          );
        }
        return null;
      })}
    </group>
  );
}

// Preload all car models
useGLTF.preload("/Vayanne.glb");
useGLTF.preload("/byd.glb");
