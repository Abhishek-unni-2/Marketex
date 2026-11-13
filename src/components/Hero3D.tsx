import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const ROWS = 23;
const MID = Math.floor(ROWS / 2);

type Pointer = { x: number; y: number; isDown: boolean; startX: number; startY: number };
export type VisualizerMode = 'profile' | 'footprint' | 'liquidity';

interface ProfileProps {
  pointer: React.MutableRefObject<Pointer>;
  reduce: boolean;
  mode: VisualizerMode;
  hoveredLevel: number | null;
  setHoveredLevel: (level: number | null) => void;
}

/** 3D Market Profile & Order Flow Volumetric Chamber */
const ProfileChamber: React.FC<ProfileProps> = ({
  pointer,
  reduce,
  mode,
  hoveredLevel,
  setHoveredLevel,
}) => {
  const group = useRef<THREE.Group>(null!);
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  const candlesGroup = useRef<THREE.Group>(null!);
  const footprintGroup = useRef<THREE.Group>(null!);
  const liquidityMesh = useRef<THREE.Mesh>(null!);

  // Gaussian Auction Bell curve data
  const rows = useMemo(
    () =>
      Array.from({ length: ROWS }, (_, i) => {
        const t = (i - MID) / MID;
        const noise = (Math.abs(Math.sin(i * 91.7)) % 1) * 0.4;
        const isPOC = i === MID;
        const isVAH = i === MID + 4;
        const isVAL = i === MID - 4;
        const isValueArea = Math.abs(t) <= 0.45;
        const price = 24100 + (i - MID) * 20;
        const volume = Math.round((Math.exp(-t * t * 2.8) * 32000 + 3500 + noise * 4000) / 10) * 10;
        const delta = Math.round((Math.sin(i * 1.3) * 3200 + (isPOC ? 5420 : 800)) / 10) * 10;
        return {
          idx: i,
          price,
          volume,
          delta,
          w: Math.exp(-t * t * 2.8) * 3.6 + 0.4 + noise,
          va: isValueArea,
          poc: isPOC,
          vah: isVAH,
          val: isVAL,
        };
      }),
    []
  );

  // Floating 3D Candlesticks data
  const candleData = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const up = (Math.abs(Math.sin(i * 12.3)) % 1) > 0.42;
        const base = Math.sin(i * 0.52) * 1.2 + (i - 8) * 0.08;
        const body = 0.28 + (Math.abs(Math.sin(i * 7.7)) % 1) * 0.65;
        const wick = body + 0.4 + (Math.abs(Math.sin(i * 3.1)) % 1) * 0.35;
        return {
          x: -3.8 + i * 0.52,
          y: base,
          body,
          wick,
          up,
        };
      }),
    []
  );

  // 3D Footprint blocks data
  const footprintBlocks = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => {
        const pIndex = i - 5;
        const bidVol = 120 + Math.floor((Math.abs(Math.sin(i * 2.7)) % 1) * 640);
        const askVol = 140 + Math.floor((Math.abs(Math.cos(i * 1.9)) % 1) * 720);
        const delta = askVol - bidVol;
        return {
          y: pIndex * 0.36,
          bidVol,
          askVol,
          delta,
          isImbalance: Math.abs(delta) > 280,
          isPOC: i === 5,
        };
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = typeof window !== 'undefined'
      ? Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.5)
      : 0;

    // Animate Volume Bars
    rows.forEach((r, i) => {
      const m = bars.current[i];
      if (!m) return;
      const isHovered = hoveredLevel === i;
      const targetScale = mode === 'profile' ? 1 : mode === 'footprint' ? 0.35 : 0.6;
      const grow = reduce ? 1 : Math.min(1, Math.max(0, (t - 0.2 - i * 0.035) / 1.0));
      const eased = 1 - Math.pow(1 - grow, 4);
      const breathe = reduce ? 1 : 1 + (r.poc ? 0.08 : 0.03) * Math.sin(t * 1.4 + i * 0.5);
      const hoverBoost = isHovered ? 1.25 : 1.0;

      const width = Math.max(0.001, r.w * eased * breathe * targetScale * hoverBoost);
      m.scale.x = THREE.MathUtils.lerp(m.scale.x, width, 0.12);
      m.position.x = THREE.MathUtils.lerp(m.position.x, -2.5 + width / 2, 0.12);

      // Depth scaling based on mode
      m.scale.z = THREE.MathUtils.lerp(
        m.scale.z,
        r.poc ? (mode === 'profile' ? 1.4 : 1.0) : 1.0,
        0.1
      );
    });

    // Animate Candlestick stream
    if (candlesGroup.current) {
      candlesGroup.current.children.forEach((c, i) => {
        const grow = reduce ? 1 : Math.min(1, Math.max(0, (t - 0.5 - i * 0.04) / 0.85));
        c.scale.y = Math.max(0.001, 1 - Math.pow(1 - grow, 3));
        if (!reduce) {
          c.position.y += Math.sin(t * 1.5 + i * 0.8) * 0.0015;
        }
      });
      candlesGroup.current.visible = mode !== 'footprint';
    }

    // Footprint visualizer visibility & pulse
    if (footprintGroup.current) {
      footprintGroup.current.visible = mode === 'footprint';
      if (mode === 'footprint' && !reduce) {
        footprintGroup.current.rotation.y = Math.sin(t * 0.6) * 0.15;
      }
    }

    // Liquidity terrain wave
    if (liquidityMesh.current) {
      liquidityMesh.current.visible = mode === 'liquidity';
      if (mode === 'liquidity' && !reduce) {
        const pos = liquidityMesh.current.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const u = pos.getX(i);
          const v = pos.getY(i);
          pos.setZ(i, Math.sin(u * 2 + t * 2) * Math.cos(v * 2 + t * 1.5) * 0.28);
        }
        pos.needsUpdate = true;
      }
    }

    // Camera / scene smooth rotation tracking mouse & scroll
    if (group.current) {
      const targetY = -0.45 + pointer.current.x * 0.45 + (reduce ? 0 : Math.sin(t * 0.3) * 0.06) + scroll * 0.4;
      const targetX = 0.15 - pointer.current.y * 0.2 + scroll * 0.15;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.06;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.06;
      group.current.position.y = reduce ? 0 : Math.sin(t * 0.8) * 0.08;
    }
  });

  return (
    <group ref={group} position={[0.2, 0, 0]}>
      {/* 1. Volumetric Market Profile Stack */}
      <group position={[0, 0, 0]}>
        {rows.map((r, i) => {
          const isHovered = hoveredLevel === i;
          return (
            <mesh
              key={i}
              ref={(el) => {
                bars.current[i] = el;
              }}
              position={[-2.5, (i - MID) * 0.24, 0]}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredLevel(i);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                if (hoveredLevel === i) setHoveredLevel(null);
              }}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[1, 0.18, r.poc ? 0.65 : r.vah || r.val ? 0.48 : 0.38]} />
              <meshStandardMaterial
                color={
                  r.poc
                    ? '#C9A24B'
                    : isHovered
                    ? '#0E8A63'
                    : r.vah || r.val
                    ? '#9A7420'
                    : r.va
                    ? '#1A1A1A'
                    : '#D6D6D2'
                }
                roughness={r.poc ? 0.2 : 0.45}
                metalness={r.poc ? 0.75 : r.vah || r.val ? 0.5 : 0.15}
                emissive={
                  r.poc
                    ? '#C9A24B'
                    : isHovered
                    ? '#0E8A63'
                    : r.vah || r.val
                    ? '#9A7420'
                    : '#000000'
                }
                emissiveIntensity={r.poc ? 0.35 : isHovered ? 0.4 : r.vah || r.val ? 0.2 : 0}
              />
            </mesh>
          );
        })}
      </group>

      {/* 2. POC Glowing Marker Beam */}
      <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 3.6, 16]} />
        <meshBasicMaterial color="#C9A24B" transparent opacity={0.8} />
      </mesh>

      {/* 3. VAH / VAL Boundary Indicator Rings */}
      <mesh position={[-1.2, 4 * 0.24, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 2.8, 16]} />
        <meshBasicMaterial color="#9A7420" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-1.2, -4 * 0.24, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 2.8, 16]} />
        <meshBasicMaterial color="#9A7420" transparent opacity={0.6} />
      </mesh>

      {/* 4. Candlesticks behind the profile */}
      <group ref={candlesGroup} position={[1.4, 0.1, -1.5]} scale={0.85}>
        {candleData.map((c, i) => (
          <group key={i} position={[c.x, c.y, 0]}>
            {/* Candle Wick */}
            <mesh>
              <boxGeometry args={[0.035, c.wick, 0.035]} />
              <meshStandardMaterial color="#888888" metalness={0.5} roughness={0.3} />
            </mesh>
            {/* Candle Body */}
            <mesh>
              <boxGeometry args={[0.26, c.body, 0.26]} />
              <meshStandardMaterial
                color={c.up ? '#0E8A63' : '#C4323F'}
                roughness={0.25}
                metalness={0.4}
                emissive={c.up ? '#0E8A63' : '#C4323F'}
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* 5. 3D Order Flow Footprint Chamber (Active in Footprint Mode) */}
      <group ref={footprintGroup} position={[0.8, 0, 0]} scale={0.9}>
        {footprintBlocks.map((b, i) => (
          <group key={i} position={[0, b.y, 0]}>
            {/* Bid Volume Slab (Red / Sell absorption) */}
            <mesh position={[-0.6, 0, 0]}>
              <boxGeometry args={[0.9, 0.28, 0.4]} />
              <meshStandardMaterial
                color={b.delta < 0 ? '#C4323F' : '#2A2A2A'}
                roughness={0.3}
                metalness={0.3}
                emissive={b.delta < 0 ? '#C4323F' : '#000000'}
                emissiveIntensity={b.isImbalance ? 0.35 : 0.05}
              />
            </mesh>
            {/* Ask Volume Slab (Green / Buy initiative) */}
            <mesh position={[0.6, 0, 0]}>
              <boxGeometry args={[0.9, 0.28, 0.4]} />
              <meshStandardMaterial
                color={b.delta > 0 ? '#0E8A63' : '#2A2A2A'}
                roughness={0.3}
                metalness={0.3}
                emissive={b.delta > 0 ? '#0E8A63' : '#000000'}
                emissiveIntensity={b.isImbalance ? 0.35 : 0.05}
              />
            </mesh>
            {/* Center Delta Core */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.2, 0.28, 0.45]} />
              <meshStandardMaterial
                color={b.isPOC ? '#C9A24B' : '#FFFFFF'}
                roughness={0.2}
                metalness={0.8}
                emissive={b.isPOC ? '#C9A24B' : '#444444'}
                emissiveIntensity={b.isPOC ? 0.4 : 0.1}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* 6. Liquidity Depth Surface Mesh (Active in Liquidity Mode) */}
      <mesh
        ref={liquidityMesh}
        position={[0.5, -0.2, -0.6]}
        rotation={[-Math.PI / 2.5, 0, 0]}
        scale={[1.1, 1.1, 1]}
      >
        <planeGeometry args={[4.8, 3.8, 24, 24]} />
        <meshStandardMaterial
          color="#9A7420"
          wireframe
          roughness={0.3}
          metalness={0.7}
          emissive="#C9A24B"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* 7. Institutional Price Axis Pillar */}
      <mesh position={[-2.55, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, ROWS * 0.24 + 0.4, 16]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* 8. Ground Reflection Grid Disc */}
      <mesh position={[0, -(MID * 0.24) - 0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 4.2, 32]} />
        <meshBasicMaterial color="#EAEAEA" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

interface Hero3DProps {
  reduce?: boolean;
}

export 
/** Pulls the camera back on narrow canvases so the whole profile stays in frame. */
const FitCamera: React.FC = () => {
  const { camera, size } = useThree();
  React.useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    const tan = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const z = Math.max(7.8, 4.1 / (tan * aspect));
    cam.position.set(0, 0.4, z);
    cam.updateProjectionMatrix();
  }, [camera, size]);
  return null;
};

const Hero3D: React.FC<Hero3DProps> = ({ reduce = false }) => {
  const pointer = useRef<Pointer>({ x: 0, y: 0, isDown: false, startX: 0, startY: 0 });
  const [mode, setMode] = useState<VisualizerMode>('profile');
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  const activeLevelData = useMemo(() => {
    if (hoveredLevel === null) return null;
    const price = 24100 + (hoveredLevel - MID) * 20;
    const isPOC = hoveredLevel === MID;
    const isVAH = hoveredLevel === MID + 4;
    const isVAL = hoveredLevel === MID - 4;
    return {
      price,
      label: isPOC ? 'POC (Point of Control)' : isVAH ? 'VAH (Value Area High)' : isVAL ? 'VAL (Value Area Low)' : 'Auction Node',
      volume: `${Math.round(24000 + Math.sin(hoveredLevel) * 12000).toLocaleString()} contracts`,
      delta: isPOC ? '+5,420 (Institutional Bias)' : '+1,840',
      action: isPOC ? 'Mean Reversion Magnet' : isVAH ? 'Upper Auction Resistance' : isVAL ? 'Institutional Limit Absorption' : 'Rotational Balance',
    };
  }, [hoveredLevel]);

  return (
    <div
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        pointer.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      }}
      onPointerLeave={() => {
        pointer.current.x = 0;
        pointer.current.y = 0;
        setHoveredLevel(null);
      }}
      aria-label="3D Interactive Market Profile and Order Flow visualizer"
    >
      {/* 3D Mode Switcher Overlay Controls */}
      <div className="absolute top-3 left-3 sm:left-4 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-white/80 backdrop-blur-md border border-[#E4E4E1] shadow-sm">
        <button
          type="button"
          onClick={() => setMode('profile')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            mode === 'profile'
              ? 'bg-[#0A0A0A] text-white shadow-sm font-semibold'
              : 'text-[#666666] hover:text-[#0A0A0A] hover:bg-[#F5F5F4]'
          }`}
        >
          3D Profile
        </button>
        <button
          type="button"
          onClick={() => setMode('footprint')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            mode === 'footprint'
              ? 'bg-[#0A0A0A] text-white shadow-sm font-semibold'
              : 'text-[#666666] hover:text-[#0A0A0A] hover:bg-[#F5F5F4]'
          }`}
        >
          Order Flow 3D
        </button>
        <button
          type="button"
          onClick={() => setMode('liquidity')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            mode === 'liquidity'
              ? 'bg-[#0A0A0A] text-white shadow-sm font-semibold'
              : 'text-[#666666] hover:text-[#0A0A0A] hover:bg-[#F5F5F4]'
          }`}
        >
          Liquidity Mesh
        </button>
      </div>

      {/* Floating 3D Hover Inspection HUD Pill */}
      {activeLevelData && (
        <div className="absolute top-16 left-3 sm:left-4 z-20 p-3 rounded-xl bg-[#0A0A0A]/95 text-white backdrop-blur-md border border-[#C9A24B]/40 shadow-xl max-w-[260px] animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between text-xs font-mono text-[#C9A24B] mb-1">
            <span>{activeLevelData.label}</span>
            <span className="font-semibold">{activeLevelData.price}</span>
          </div>
          <div className="text-xs text-[#E4E4E1] space-y-0.5">
            <div>Vol: <span className="text-white font-mono">{activeLevelData.volume}</span></div>
            <div>Delta: <span className="text-[#0E8A63] font-mono">{activeLevelData.delta}</span></div>
            <div className="text-xs text-[#A0A0A0] pt-1 border-t border-white/10 mt-1">
              Rule: {activeLevelData.action}
            </div>
          </div>
        </div>
      )}

      {/* Interactive 3D Canvas */}
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 7.8], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <FitCamera />
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 7, 6]} intensity={2.4} color="#FFF8E7" />
        <directionalLight position={[-6, 3, 4]} intensity={0.9} color="#D8F5E5" />
        <pointLight position={[0, 0, 3]} intensity={1.5} color="#C9A24B" distance={8} />

        {/* Ambient floating golden & emerald liquidity particles */}
        {!reduce && (
          <Sparkles
            count={42}
            scale={7.5}
            size={2.4}
            speed={0.4}
            opacity={0.65}
            color="#C9A24B"
          />
        )}

        <Float speed={reduce ? 0 : 1.2} rotationIntensity={0.15} floatIntensity={0.35}>
          <ProfileChamber
            pointer={pointer}
            reduce={reduce}
            mode={mode}
            hoveredLevel={hoveredLevel}
            setHoveredLevel={setHoveredLevel}
          />
        </Float>

        {/* Realistic ground shadow */}
        <ContactShadows
          position={[0, -2.8, 0]}
          opacity={0.4}
          scale={10}
          blur={2.4}
          far={4}
          color="#0A0A0A"
        />
      </Canvas>

      {/* Hint badge at bottom */}
      <div className="absolute bottom-2 right-3 sm:right-4 z-20 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#E4E4E1] text-xs font-mono text-[#666666]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A63] animate-pulse" />
        <span>Live 3D Auction Engine</span>
      </div>
    </div>
  );
};

export default Hero3D;