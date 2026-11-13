import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Award, Layers } from '../icons';

export interface MarketAsset {
  id: string;
  name: string;
  code: string;
  price: string;
  change: string;
  isPositive: boolean;
  delta: string;
  status: string;
  malayalamNote: string;
  concept: string;
  pos: [number, number, number];
  color: string;
}

const ASSETS: MarketAsset[] = [
  {
    id: 'nifty',
    name: 'NIFTY 50 INDEX',
    code: 'NSE: NIFTY',
    price: '24,180.50',
    change: '+0.64%',
    isPositive: true,
    delta: '+8,420 Lots',
    status: 'Value Area High Acceptance',
    malayalamNote: 'ഇൻസ്റ്റിറ്റ്യൂഷണൽ വാങ്ങലുകൾ POC മുകളിൽ സ്ഥിരീകരിച്ചു.',
    concept: 'Auction Market Theory & TPO Profile',
    pos: [2.6, 0.8, 0],
    color: '#0E8A63',
  },
  {
    id: 'banknifty',
    name: 'BANK NIFTY',
    code: 'NSE: BANKNIFTY',
    price: '51,840.20',
    change: '+1.12%',
    isPositive: true,
    delta: '+14,890 Lots',
    status: 'Stacked Buying Imbalance',
    malayalamNote: 'മൂന്ന് തുടർച്ചയായ ഫുട്പ്രിന്റ് ഇംബാലൻസുകൾ കണ്ടെത്തി.',
    concept: 'Order Flow Footprint Delta',
    pos: [-2.6, 0.7, 0.5],
    color: '#0E8A63',
  },
  {
    id: 'gold',
    name: 'MCX GOLD',
    code: 'MCX: GOLD',
    price: '₹78,420 / 10g',
    change: '+0.38%',
    isPositive: true,
    delta: '+1,620 Lots',
    status: 'Responsive Absorption at VAL',
    malayalamNote: 'താഴ്ന്ന വിലയിൽ വലിയ ബയേഴ്സ് സജീവമായി.',
    concept: 'Passive Bid Absorption',
    pos: [1.8, -1.6, 1.2],
    color: '#C9A24B',
  },
  {
    id: 'crude',
    name: 'CRUDE OIL',
    code: 'MCX: CRUDEOIL',
    price: '$71.60',
    change: '-0.85%',
    isPositive: false,
    delta: '-2,410 Lots',
    status: 'Single Print Rejection',
    malayalamNote: 'മുകളിലെ ലെവലിൽ പെട്ടെന്നുള്ള സെല്ലേഴ്സ് റിജക്ഷൻ.',
    concept: 'Excess & Unfair High',
    pos: [-1.9, -1.5, -0.8],
    color: '#C4323F',
  },
  {
    id: 'btc',
    name: 'BITCOIN',
    code: 'BINANCE: BTCUSDT',
    price: '$92,340',
    change: '+3.45%',
    isPositive: true,
    delta: '+5,280 BTC',
    status: 'Initiative Volume Expansion',
    malayalamNote: 'റേഞ്ച് ബ്രേക്കൗട്ടിന് ശേഷം വോളിയം സ്ഥിരീകരണം.',
    concept: 'Composite Volume Profile',
    pos: [0, 2.3, -1.2],
    color: '#0E8A63',
  },
  {
    id: 'forex',
    name: 'EUR / USD',
    code: 'FOREX: EURUSD',
    price: '1.0842',
    change: '-0.14%',
    isPositive: false,
    delta: '-890 Contracts',
    status: 'London Open Liquidity Sweep',
    malayalamNote: 'സ്റ്റോപ്പ് ഹണ്ട് നടത്തിയ ശേഷം തിരിച്ചുവരവ്.',
    concept: 'Liquidity Pools & Traps',
    pos: [0, -2.4, 1.1],
    color: '#C9A24B',
  },
];

const AssetNode: React.FC<{
  asset: MarketAsset;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ asset, isSelected, onSelect }) => {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.position.y = asset.pos[1] + Math.sin(t * 1.5 + asset.pos[0]) * 0.12;
      meshRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group
      ref={meshRef}
      position={asset.pos}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* 3D Asset Sphere */}
      <mesh castShadow>
        <sphereGeometry args={[isSelected ? 0.42 : 0.34, 32, 32]} />
        <meshStandardMaterial
          color={asset.color}
          roughness={0.25}
          metalness={0.7}
          emissive={asset.color}
          emissiveIntensity={isSelected ? 0.6 : 0.25}
        />
      </mesh>

      {/* Orbit Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[isSelected ? 0.52 : 0.42, isSelected ? 0.56 : 0.45, 32]} />
        <meshBasicMaterial color={asset.color} transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

/** Central Institutional Core */
const CoreEngine: React.FC = () => {
  const coreRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.3;
      coreRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Core Icosahedron */}
      <mesh>
        <octahedronGeometry args={[1.0, 1]} />
        <meshStandardMaterial
          color="#C9A24B"
          wireframe
          roughness={0.2}
          metalness={0.9}
          emissive="#C9A24B"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Internal Pulse Sphere */}
      <mesh>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#0A0A0A"
          roughness={0.4}
          metalness={0.8}
          emissive="#C9A24B"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

export const MultiMarket3D: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset>(ASSETS[0]);

  return (
    <section id="markets-3d" className="py-24 md:py-32 bg-[#F5F5F4] relative border-t border-[#E4E4E1] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <div className="text-sm font-medium text-[#9A7420] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9A7420]" />
              <span>Multi-Asset Institutional Reach</span>
            </div>
            <h2 className="heading-3 text-[#0A0A0A]">
              One Auction Law. Every Global Asset.
            </h2>
            <p className="body-3 text-[#666666] mt-3 max-w-2xl">
              Auction Market Theory isn’t limited to stocks. Learn how Dr. Sherlymon Abraham executes identical volume footprint principles across Indices, Forex, Gold, Commodities, and Crypto.
            </p>
          </div>

          <div className="mt-6 lg:mt-0 flex items-center gap-2 p-1.5 rounded-xl bg-white border border-[#E4E4E1] shadow-sm font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-[#0E8A63] animate-pulse" />
            <span className="text-[#0A0A0A] font-medium">Interactive 3D Asset Matrix</span>
          </div>
        </div>

        {/* 3D Visualizer + Asset Breakdown Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-[#E4E4E1] p-6 sm:p-8 shadow-sm">
          {/* Left: 3D Universe Canvas (7 cols) */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] rounded-2xl bg-[#0A0A0A] overflow-hidden border border-[#E4E4E1]">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-white font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-ping" />
              <span>Interactive 3D Asset Orbit</span>
            </div>

            <div className="absolute top-4 right-4 z-10 text-xs font-mono text-[#CFCFCB] px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md hidden sm:block">
              Click node to inspect • Drag to rotate
            </div>

            <Canvas camera={{ position: [0, 0, 6.8], fov: 42 }} gl={{ antialias: true, alpha: true }}>
              <ambientLight intensity={1.1} />
              <directionalLight position={[6, 8, 5]} intensity={2.2} color="#FFF8E7" />
              <directionalLight position={[-6, -4, -3]} intensity={0.9} color="#90D5FF" />
              <pointLight position={[0, 0, 0]} intensity={2.5} color="#C9A24B" distance={6} />

              <Sparkles count={45} scale={8} size={2.5} speed={0.4} color="#C9A24B" opacity={0.65} />

              <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
                <CoreEngine />
                {ASSETS.map((asset) => (
                  <AssetNode
                    key={asset.id}
                    asset={asset}
                    isSelected={selectedAsset.id === asset.id}
                    onSelect={() => setSelectedAsset(asset)}
                  />
                ))}
              </Float>

              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 3.2} />
            </Canvas>

            {/* Quick Node Navigator Buttons at bottom */}
            <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap gap-1.5 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
              {ASSETS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelectedAsset(a)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                    selectedAsset.id === a.id
                      ? 'bg-[#C9A24B] text-black font-semibold shadow-sm'
                      : 'text-[#CFCFCB] hover:text-white hover:bg-white/10'
                  }`}
                >
                  {a.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Asset Detail Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E4E4E1]">
                <div>
                  <span className="text-xs font-mono text-[#9A7420] block mb-1">
                    {selectedAsset.code}
                  </span>
                  <h3 className="heading-4 text-[#0A0A0A]">{selectedAsset.name}</h3>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xl font-bold text-[#0A0A0A]">
                    {selectedAsset.price}
                  </div>
                  <span
                    className={`inline-block text-xs font-mono font-semibold px-2 py-0.5 rounded-full ${
                      selectedAsset.isPositive
                        ? 'bg-[#0E8A63]/10 text-[#0E8A63]'
                        : 'bg-[#C4323F]/10 text-[#C4323F]'
                    }`}
                  >
                    {selectedAsset.change}
                  </span>
                </div>
              </div>

              {/* Data Matrix */}
              <div className="grid grid-cols-2 gap-3 my-6 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#F5F5F4] border border-[#E4E4E1]">
                  <span className="text-[#666666] block mb-1">Order Flow Delta</span>
                  <span className="text-sm font-bold text-[#0E8A63]">
                    {selectedAsset.delta}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#F5F5F4] border border-[#E4E4E1]">
                  <span className="text-[#666666] block mb-1">Institutional Setup</span>
                  <span className="text-sm font-bold text-[#0A0A0A] truncate block">
                    {selectedAsset.concept}
                  </span>
                </div>
              </div>

              {/* Market State Alert */}
              <div className="p-4 rounded-xl bg-[#F5F5F4] border-l-4 border-l-[#9A7420] border border-[#E4E4E1] mb-6">
                <div className="text-xs font-mono text-[#9A7420] font-semibold mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Current Auction Phase</span>
                </div>
                <p className="text-sm font-medium text-[#0A0A0A]">
                  {selectedAsset.status}
                </p>
              </div>

              {/* Malayalam Explanation Box */}
              <div className="p-4 rounded-xl bg-[#0A0A0A] text-white">
                <div className="text-xs font-mono text-[#C9A24B] mb-1.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Malayalam Masterclass Insight</span>
                </div>
                <p className="text-sm text-[#E4E4E1] leading-relaxed">
                  {selectedAsset.malayalamNote}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E4E4E1] flex items-center justify-between text-xs font-mono text-[#666666]">
              <span>Taught in 6-Week Cohort</span>
              <span className="text-[#9A7420] font-medium">Calicut Lab & Live Stream</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MultiMarket3D;
