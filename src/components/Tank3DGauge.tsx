import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Mesh } from 'three';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { heightCapacityData } from "@/components/TankGauge";

interface Tank3DProps {
  heightPercentage: number; // capacity percentage
  onHeightChange: (height: number) => void;
  onCapacityChange: (capacity: number) => void;
}

const heightCapacityArray = Object.entries(heightCapacityData)
  .map(([h, c]) => [Number(h), c] as [number, number])
  .sort((a, b) => a[0] - b[0]);
const maxHeight = heightCapacityArray[heightCapacityArray.length - 1][0];
const maxCapacity = heightCapacityArray[heightCapacityArray.length - 1][1];

const getCapacityFromHeight = (heightMm: number): number => {
  if (heightMm <= 0) return heightCapacityArray[0][1];
  if (heightMm >= maxHeight) return maxCapacity;
  const lower = Math.floor(heightMm);
  const upper = Math.ceil(heightMm);
  const c1 = heightCapacityData[lower];
  const c2 = heightCapacityData[upper];
  const ratio = (heightMm - lower) / (upper - lower);
  return c1 + (c2 - c1) * ratio;
};

const getHeightFromCapacity = (capacity: number): number => {
  if (capacity <= heightCapacityArray[0][1]) return heightCapacityArray[0][0];
  if (capacity >= maxCapacity) return maxHeight;
  for (let i = 0; i < heightCapacityArray.length - 1; i++) {
    const [h1, c1] = heightCapacityArray[i];
    const [h2, c2] = heightCapacityArray[i + 1];
    if (capacity >= c1 && capacity <= c2) {
      const ratio = (capacity - c1) / (c2 - c1);
      return h1 + (h2 - h1) * ratio;
    }
  }
  return maxHeight;
};

const keyLevels = [5, 10, 85, 90, 95].map(level => {
  const capacity = (level / 100) * maxCapacity;
  const height = getHeightFromCapacity(capacity);
  return { level, height, percent: height / maxHeight };
});

const TankMesh = ({ fillLevel, activeLevel }: { fillLevel: number; activeLevel: number }) => {
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
      {/* Base platform */}
      <mesh position={[0, -tankHeight / 2 - 0.05, 0]}>
        <cylinderGeometry args={[tankRadius * 1.2, tankRadius * 1.2, 0.1, 64]} />
        <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Tank body */}
      <mesh ref={tankRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[tankRadius, tankRadius, tankHeight, 64]} />
        <meshPhysicalMaterial
          color="#d1d5db"
          metalness={0.6}
          roughness={0.2}
          transmission={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Liquid inside */}
      <mesh ref={liquidRef} position={[0, -tankHeight / 2 + liquidHeight / 2, 0]}>
        <cylinderGeometry args={[tankRadius * 0.95, tankRadius * 0.95, liquidHeight, 64]} />
        <meshPhysicalMaterial
          color="#065f46"
          emissive="#064e3b"
          emissiveIntensity={0.2}
          metalness={0}
          roughness={0.1}
          transparent
          opacity={0.7}
          transmission={0.9}
        />
      </mesh>

      {/* Level indicators */}
      {keyLevels.map(({ level, percent }) => {
        const indicatorHeight = percent * tankHeight - tankHeight / 2;
        return (
          <mesh key={level} position={[tankRadius + 0.1, indicatorHeight, 0]}>
            <boxGeometry args={[0.2, 0.05, 0.05]} />
            <meshStandardMaterial color={level === Math.round(activeLevel) ? "#064e3b" : "#065f46"} />
          </mesh>
        );
      })}

      {/* Level text markers */}
      <group>
        {keyLevels.map(({ level, percent }) => {
          const indicatorHeight = percent * tankHeight - tankHeight / 2;
          return (
            <mesh key={`text-${level}`} position={[tankRadius + 0.3, indicatorHeight, 0]}>
              <boxGeometry args={[0.1, 0.1, 0.01]} />
              <meshStandardMaterial
                color={level === Math.round(activeLevel) ? "#064e3b" : "#065f46"}
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
  const handleSliderChange = (value: number[]) => {
    const newPercentage = value[0];
    onHeightChange(newPercentage);
    const capacity = (newPercentage / 100) * maxCapacity;
    onCapacityChange(capacity);
  };

  // Calculate current height and capacity
  const currentCapacity = (heightPercentage / 100) * maxCapacity;
  const currentHeightMm = getHeightFromCapacity(currentCapacity);
  const fillHeightPercent = (currentHeightMm / maxHeight) * 100;

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
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[0, 5, 0]} intensity={0.5} />
            <TankMesh fillLevel={fillHeightPercent} activeLevel={heightPercentage} />
            <OrbitControls enablePan={false} enableZoom />
            <Environment preset="city" />
            <ContactShadows position={[0, -3, 0]} opacity={0.25} scale={10} blur={2} far={10} />
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
            <div>
              {keyLevels
                .slice(0, 2)
                .map(k => `${k.level}% → ${k.height.toFixed(1)} mm`)
                .join(' | ')}
            </div>
            <div>
              {keyLevels
                .slice(2)
                .map(k => `${k.level}% → ${k.height.toFixed(1)} mm`)
                .join(' | ')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Tank3DGauge;
