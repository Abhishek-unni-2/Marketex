import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

export interface Level3D {
  price: string;
  type: 'VAH' | 'POC' | 'VAL' | 'SINGLE_PRINT' | 'NORMAL';
  tpoLetters: string;
  volume: string;
  delta: string;
  isPositive: boolean;
  institutionNote: string;
  retailTrap: string;
  actionRule: string;
}

interface Chamber3DProps {
  levels: Level3D[];
  selectedLevel: Level3D;
  onSelectLevel: (lvl: Level3D) => void;
}

const SliceMesh: React.FC<{
  level: Level3D;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ level, index, isSelected, onSelect }) => {
  const meshRef = useRef<THREE.Group>(null!);
  const y = (2.5 - index) * 0.72;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      // Gentle floating/breathing effect
      const targetZ = isSelected ? 0.35 : 0;
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
      
      if (level.type === 'POC') {
        const pulse = 1 + 0.04 * Math.sin(t * 3);
        meshRef.current.scale.set(pulse, 1, pulse);
      }
    }
  });

  const isPOC = level.type === 'POC';
  const isVAH = level.type === 'VAH';
  const isVAL = level.type === 'VAL';
  const isSinglePrint = level.type === 'SINGLE_PRINT';

  const baseColor = isPOC
    ? '#C9A24B'
    : isSinglePrint
    ? '#C4323F'
    : isVAH || isVAL
    ? '#9A7420'
    : level.isPositive
    ? '#0E8A63'
    : '#4A4A4A';

  return (
    <group
      ref={meshRef}
      position={[0, y, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* 3D Price Slab */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[isPOC ? 3.4 : 2.8, 0.48, isPOC ? 1.4 : 1.1]} />
        <meshStandardMaterial
          color={baseColor}
          metalness={isPOC ? 0.8 : 0.3}
          roughness={isPOC ? 0.2 : 0.4}
          emissive={baseColor}
          emissiveIntensity={isSelected ? 0.45 : isPOC ? 0.25 : 0.08}
        />
      </mesh>

      {/* Bid Volume Indicator (Left Bar) */}
      <mesh position={[-1.7, 0, 0]}>
        <boxGeometry args={[0.3, 0.36, 0.4]} />
        <meshStandardMaterial
          color="#C4323F"
          metalness={0.4}
          roughness={0.3}
          emissive="#C4323F"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Ask Volume Indicator (Right Bar) */}
      <mesh position={[1.7, 0, 0]}>
        <boxGeometry args={[0.3, 0.36, 0.4]} />
        <meshStandardMaterial
          color="#0E8A63"
          metalness={0.4}
          roughness={0.3}
          emissive="#0E8A63"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Highlight outline wireframe when selected */}
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(isPOC ? 3.44 : 2.84, 0.52, isPOC ? 1.44 : 1.14)]} />
          <lineBasicMaterial color="#FFFFFF" linewidth={2} />
        </lineSegments>
      )}
    </group>
  );
};

export const Chamber3D: React.FC<Chamber3DProps> = ({
  levels,
  selectedLevel,
  onSelectLevel,
}) => {
  return (
    <div className="relative w-full h-[480px] rounded-2xl bg-[#0A0A0A] overflow-hidden border border-[#E4E4E1]/30">
      {/* Header controls overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#0E8A63] animate-pulse" />
        <span className="text-xs font-mono text-white tracking-wider font-semibold">
          3D VOLUMETRIC FOOTPRINT CHAMBER
        </span>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono text-[#CFCFCB] border border-white/15">
        <span>Click slab to inspect • Drag to rotate 360°</span>
      </div>

      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 1.2, 5.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={2.2} color="#FFF8E7" />
        <directionalLight position={[-5, 3, 3]} intensity={1.1} color="#C4E0F9" />
        <pointLight position={[0, 0, 2]} intensity={1.8} color="#C9A24B" />

        <Sparkles count={35} scale={6} size={2.2} speed={0.4} color="#C9A24B" opacity={0.6} />

        <group position={[0, 0, 0]}>
          {levels.map((lvl, idx) => (
            <SliceMesh
              key={lvl.price}
              level={lvl}
              index={idx}
              isSelected={selectedLevel.price === lvl.price}
              onSelect={() => onSelectLevel(lvl)}
            />
          ))}

          {/* Central Vertical Liquidity Axis */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 5.2, 16]} />
            <meshStandardMaterial color="#C9A24B" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.8}
        />

        <ContactShadows
          position={[0, -2.6, 0]}
          opacity={0.6}
          scale={7}
          blur={2.2}
          far={3.5}
          color="#000000"
        />
      </Canvas>

      {/* Selected Level Quick Badge */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-[#C9A24B] text-black font-bold">
            {selectedLevel.price}
          </span>
          <span className="text-[#CFCFCB]">{selectedLevel.type}</span>
          <span className="text-[#0E8A63] font-semibold">Delta: {selectedLevel.delta}</span>
        </div>
        <div className="text-xs text-[#EDEDEB] truncate max-w-md hidden sm:block">
          {selectedLevel.institutionNote}
        </div>
      </div>
    </div>
  );
};
