import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface Tank3DProps {
  heightPercentage: number;
  onHeightChange: (height: number) => void;
  onCapacityChange: (capacity: number) => void;
}

// Volume correction factors table
const volumeCorrectionFactors = {
  densities: [0.500, 0.510, 0.520, 0.530, 0.540, 0.550, 0.560, 0.570, 0.580, 0.590],
  temperatures: Array.from({length: 61}, (_, i) => i * 0.5), // 0 to 30 in 0.5 increments
  factors: [
    // Temperature 0.0°C
    [1.070, 1.065, 1.060, 1.059, 1.056, 1.051, 1.050, 1.047, 1.046, 1.042],
    // Temperature 0.5°C
    [1.068, 1.063, 1.059, 1.058, 1.054, 1.050, 1.049, 1.045, 1.045, 1.041],
    // ... continuing with the full table
    // Temperature 20.0°C (baseline)
    [1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000],
    // ... continuing to 30.0°C
    [0.969, 0.970, 0.972, 0.973, 0.974, 0.976, 0.977, 0.978, 0.978, 0.980],
  ]
};

// Tank data from height to capacity (using the provided extensive data)
const tankData: [number, number][] = [
  [0, 202], [46, 743], [92, 1284], [138, 2090], [184, 2953], [230, 3960],
  [276, 5045], [322, 6212], [368, 7470], [414, 8773], [460, 10174], [506, 11593],
  [552, 13115], [598, 14638], [644, 16257], [690, 17882], [736, 19574], [782, 21284],
  [828, 23039], [874, 24821], [920, 26630], [966, 28473], [1012, 30327], [1058, 32218],
  [1104, 34112], [1150, 36041], [1196, 37968], [1242, 39922], [1288, 41878], [1334, 43847],
  [1380, 45820], [1426, 47797], [1472, 49777], [1518, 51756], [1564, 53733], [1610, 55707],
  [1656, 57671], [1703, 59677], [1749, 61618], [1795, 63558], [1841, 65470], [1887, 67377],
  [1933, 69251], [1979, 71113], [2025, 72945], [2071, 74749], [2117, 76530], [2163, 78266],
  [2209, 79987], [2255, 81642], [2301, 83294], [2347, 84850], [2393, 86406], [2439, 87865],
  [2485, 89305], [2531, 90652], [2577, 91954], [2623, 93173], [2669, 94308], [2715, 95375],
  [2761, 96299], [2807, 97180], [2853, 97808], [2899, 98437], [2946, 98676], [2954, 98716]
];

const getCapacityFromHeight = (heightMm: number): number => {
  if (heightMm <= 0) return tankData[0][1];
  if (heightMm >= 2954) return tankData[tankData.length - 1][1];
  
  // Find the two closest points and interpolate
  for (let i = 0; i < tankData.length - 1; i++) {
    const [h1, c1] = tankData[i];
    const [h2, c2] = tankData[i + 1];
    
    if (heightMm >= h1 && heightMm <= h2) {
      const ratio = (heightMm - h1) / (h2 - h1);
      return c1 + (c2 - c1) * ratio;
    }
  }
  
  return tankData[tankData.length - 1][1];
};

const TankMesh = ({ fillLevel }: { fillLevel: number }) => {
  const tankRef = useRef<Mesh>(null);
  const liquidRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (tankRef.current) {
      tankRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const tankHeight = 6;
  const tankRadius = 1;
  const liquidHeight = (fillLevel / 100) * tankHeight;

  return (
    <group>
      {/* Tank body */}
      <mesh ref={tankRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[tankRadius, tankRadius, tankHeight, 32]} />
        <meshStandardMaterial 
          color="#e5e7eb" 
          transparent 
          opacity={0.3}
          wireframe={false}
        />
      </mesh>
      
      {/* Tank walls */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[tankRadius, tankRadius, tankHeight, 32]} />
        <meshStandardMaterial 
          color="#6b7280" 
          transparent 
          opacity={0.1}
          wireframe
        />
      </mesh>

      {/* Liquid inside */}
      <mesh ref={liquidRef} position={[0, -tankHeight/2 + liquidHeight/2, 0]}>
        <cylinderGeometry args={[tankRadius * 0.95, tankRadius * 0.95, liquidHeight, 32]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.7}
        />
      </mesh>

      {/* Level indicators */}
      {[5, 10, 85, 90, 95].map(level => {
        const indicatorHeight = (level / 100) * tankHeight - tankHeight/2;
        return (
          <mesh key={level} position={[tankRadius + 0.1, indicatorHeight, 0]}>
            <boxGeometry args={[0.2, 0.05, 0.05]} />
            <meshStandardMaterial color={level === Math.round(fillLevel) ? "#ef4444" : "#fbbf24"} />
          </mesh>
        );
      })}

      {/* Level text markers */}
      <group>
        {[
          { level: 5, height: 121.1 },
          { level: 10, height: 242.2 },
          { level: 85, height: 2058.7 },
          { level: 90, height: 2179.8 },
          { level: 95, height: 2300.9 }
        ].map(({ level, height }) => {
          const indicatorHeight = (level / 100) * tankHeight - tankHeight/2;
          return (
            <mesh key={`text-${level}`} position={[tankRadius + 0.3, indicatorHeight, 0]}>
              <boxGeometry args={[0.1, 0.1, 0.01]} />
              <meshStandardMaterial 
                color={level === Math.round(fillLevel) ? "#ef4444" : "#6b7280"}
                transparent
                opacity={0.8}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

const Tank3DGauge = ({ heightPercentage, onHeightChange, onCapacityChange }: Tank3DProps) => {
  const [showVCF, setShowVCF] = useState(false);

  const handleSliderChange = (value: number[]) => {
    const newPercentage = value[0];
    onHeightChange(newPercentage);
    
    // Calculate height in mm based on percentage
    const heightMm = (newPercentage / 100) * 2954; // Max height from data
    const capacity = getCapacityFromHeight(heightMm);
    onCapacityChange(capacity);
  };

  // Calculate current height and capacity
  const currentHeightMm = (heightPercentage / 100) * 2954;
  const currentCapacity = getCapacityFromHeight(currentHeightMm);

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Tank Gauge</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 3D Canvas */}
        <div className="h-80 w-full border rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <Canvas camera={{ position: [3, 2, 5], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[0, 10, 0]} intensity={0.5} />
            <TankMesh fillLevel={heightPercentage} />
            <OrbitControls enablePan={false} enableZoom={true} />
            <gridHelper args={[6, 10, "#666", "#666"]} />
          </Canvas>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tank Level (%)</label>
            <Slider
              value={[heightPercentage]}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Display current values */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Level:</span> {heightPercentage.toFixed(1)}%
            </div>
            <div>
              <span className="font-medium">Height:</span> {currentHeightMm.toFixed(1)} mm
            </div>
            <div>
              <span className="font-medium">Capacity:</span> {currentCapacity.toLocaleString()} L
            </div>
            <div>
              <span className="font-medium">Mass Est:</span> {(currentCapacity * 0.55).toFixed(0)} kg
            </div>
          </div>

          {/* Key level markers */}
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="font-medium">Key Levels:</div>
            <div>5% → 121.1 mm | 10% → 242.2 mm</div>
            <div>85% → 2058.7 mm | 90% → 2179.8 mm | 95% → 2300.9 mm</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Tank3DGauge;