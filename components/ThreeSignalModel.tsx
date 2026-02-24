'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Orb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.y = state.clock.elapsedTime * 0.35;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.7} floatIntensity={1.4}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 8]} />
        <MeshDistortMaterial color="#7c3aed" emissive="#38bdf8" emissiveIntensity={0.6} roughness={0.1} metalness={0.85} distort={0.38} speed={1.8} />
      </mesh>
    </Float>
  );
}

export default function ThreeSignalModel() {
  return (
    <div className="h-[280px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl lg:h-[340px]">
      <Canvas camera={{ position: [0, 0, 4.6], fov: 55 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 4, 4]} intensity={2.2} color="#a78bfa" />
        <pointLight position={[-4, -2, 1]} intensity={1.4} color="#22d3ee" />
        <Orb />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}
