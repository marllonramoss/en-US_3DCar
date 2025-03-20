"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Environment } from "@react-three/drei";
import CarModel from "@/components/CarModel";
import ColorSidebar from "@/components/ColorSidebar";
import CarSelector from "@/components/CarSelector";
import { CarProvider } from "@/context/CarContext";

export default function CarPage() {
  return (
    <CarProvider>
      <div className="relative w-full h-screen">
        {/* Main Canvas */}
        <Canvas
          shadows
          camera={{ position: [0, 2, 5], fov: 50 }}
          className="w-full h-full"
        >
          <Sky
            distance={450000}
            sunPosition={[0, 1, 0]}
            inclination={0.5}
            azimuth={0.25}
          />
          <Environment preset="city" />
          <ambientLight intensity={2} />
          <directionalLight
            position={[15, 15, 15]}
            intensity={3}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <directionalLight
            position={[-15, 15, -15]}
            intensity={2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <directionalLight
            position={[0, 20, 0]}
            intensity={2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <CarModel />
          <OrbitControls
            target={[0, 0, 0]}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>

        {/* Color Sidebar */}
        <div className="absolute left-0 top-0 h-full">
          <ColorSidebar />
        </div>

        {/* Car Selector */}
        <div className="absolute bottom-0 left-0 right-0">
          <CarSelector />
        </div>
      </div>
    </CarProvider>
  );
}
