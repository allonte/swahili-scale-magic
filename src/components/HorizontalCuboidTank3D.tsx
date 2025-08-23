import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Mesh } from 'three';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { heightCapacityDataTank1 } from "@/components/TankGauge";
import { heightCapacityDataTank2 } from "@/data/tank2HeightCapacity";

interface HorizontalCuboidTank3DProps {
  heightPercentage: number;
  onHeightChange: (height: number) => void;
  onCapacityChange: (capacity: number) => void;
  selectedTank: 'tank1' | 'tank2';
  onTankChange: (tank: 'tank1' | 'tank2') => void;
}

const getCapacityFromHeight = (
  heightMm: number,
  data: { [key: number]: number },
  maxHeight: number
): number => {
  if (heightMm <= 0) return data[0];
  if (heightMm >= maxHeight) return data[maxHeight];

  const lower = Math.floor(heightMm);
  const upper = Math.ceil(heightMm);
  const lowerCap = data[lower];
  const upperCap = data[upper];

  if (lowerCap === undefined || upperCap === undefined) {
    return data[lower] || 0;
  }

  const ratio = heightMm - lower;
  return Math.round(lowerCap + (upperCap - lowerCap) * ratio);
};

const CuboidTankMesh = ({ fillLevel, capacity }: { fillLevel: number; capacity: number }) => {
  const tankRef = useRef<Mesh>(null);
  const liquidRef = useRef<Mesh>(null);
  const tankLength = 8;
  const tankWidth = 2;
  const tankHeight = 2.4;
  const currentFill = useRef(fillLevel);

  useFrame((state) => {
    if (tankRef.current) {
      tankRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
    // Smoothly animate liquid level toward target fill level
    currentFill.current += (fillLevel - currentFill.current) * 0.1;
    const liquidHeight = (currentFill.current / 100) * tankHeight;
    if (liquidRef.current) {
      liquidRef.current.scale.y = liquidHeight;
      liquidRef.current.position.y = -tankHeight / 2 + liquidHeight / 2;
    }
  });

  return (
    <group>
      {/* Main cuboid body */}
      <mesh ref={tankRef} position={[0, 0, 0]}>
        <boxGeometry args={[tankLength, tankHeight, tankWidth]} />
        <meshStandardMaterial
          color="hsl(var(--muted))"
          transparent
          opacity={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Liquid inside */}
      {fillLevel > 0 && (
        <mesh ref={liquidRef} position={[0, -tankHeight / 2, 0]} scale={[1, 0, 1]}>
          <boxGeometry args={[tankLength * 0.99, 1, tankWidth * 0.99]} />
          <meshStandardMaterial
            color="#bbf7d0"
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* Level indicators on the side */}
      {[5, 10, 85, 90, 95].map(level => {
        const indicatorY = -tankHeight / 2 + (level / 100) * tankHeight;
        return (
          <group key={level}>
            <mesh position={[-tankLength / 2 - 0.2, indicatorY, 0]}>
              <boxGeometry args={[0.3, 0.05, 0.05]} />
              <meshStandardMaterial
                color={Math.abs(level - fillLevel) < 5 ? "#4ade80" : "hsl(var(--muted-foreground))"}
              />
            </mesh>
            <mesh position={[tankLength / 2 + 0.2, indicatorY, 0]}>
              <boxGeometry args={[0.3, 0.05, 0.05]} />
              <meshStandardMaterial
                color={Math.abs(level - fillLevel) < 5 ? "#4ade80" : "hsl(var(--muted-foreground))"}
              />
            </mesh>
          </group>
        );
      })}

      {/* Level percentage text markers */}
      {[5, 10, 85, 90, 95].map(level => {
        const indicatorY = -tankHeight / 2 + (level / 100) * tankHeight;
        return (
          <mesh key={`text-${level}`} position={[-tankLength / 2 - 0.5, indicatorY, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.01]} />
            <meshStandardMaterial
              color={Math.abs(level - fillLevel) < 5 ? "#4ade80" : "hsl(var(--muted-foreground))"}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}

      {/* Capacity and percentage label */}
      <Text
        position={[0, tankHeight / 2 + 1.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {`${capacity.toLocaleString()} L (${fillLevel.toFixed(1)}%)`}
      </Text>
    </group>
  );
};

const HorizontalCuboidTank3D = ({
  heightPercentage,
  onHeightChange,
  onCapacityChange,
  selectedTank,
  onTankChange,
}: HorizontalCuboidTank3DProps) => {
  const dataObj = selectedTank === 'tank2' ? heightCapacityDataTank2 : heightCapacityDataTank1;
  const maxHeight = selectedTank === 'tank2' ? 2960 : 2954;

  const handleSliderChange = (value: number[]) => {
    const newPercentage = value[0];
    onHeightChange(newPercentage);

    // Calculate height in mm based on percentage
    const heightMm = (newPercentage / 100) * maxHeight; // Max height from specifications
    const capacity = getCapacityFromHeight(heightMm, dataObj, maxHeight);
    onCapacityChange(capacity);
  };

  const handleTankChange = (value: string) => {
    if (value) onTankChange(value);
  };

  // Calculate current height and capacity
  const currentHeightMm = (heightPercentage / 100) * maxHeight;
  const currentCapacity = getCapacityFromHeight(currentHeightMm, dataObj, maxHeight);

  const referenceLevels = selectedTank === 'tank2'
    ? [
        { level: 5, height: 121.1 },
        { level: 10, height: 242.2 },
        { level: 85, height: 2058.7 },
        { level: 90, height: 2179.8 },
        { level: 95, height: 2300.9 },
      ]
    : [
        { level: 5, height: 154.45 },
        { level: 10, height: 308.9 },
        { level: 85, height: 2625.65 },
        { level: 90, height: 2780.1 },
        { level: 95, height: 2934.55 },
      ];

  const displayMaxHeight = selectedTank === 'tank2' ? 2960 : 2955;

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Horizontal Cuboid Tank Gauge</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tank selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Tank</label>
          <ToggleGroup
            type="single"
            value={selectedTank}
            onValueChange={handleTankChange}
            className="w-full"
          >
            <ToggleGroupItem value="tank1" className="flex-1">
              Tank One
            </ToggleGroupItem>
            <ToggleGroupItem value="tank2" className="flex-1">
              Tank Two
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* 3D Canvas */}
        <div className="h-80 w-full border rounded-lg bg-gradient-to-b from-background to-muted/20">
          <Canvas camera={{ position: [8, 4, 6], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-5, 10, 5]} intensity={0.8} />
            <directionalLight position={[5, -5, -5]} intensity={0.3} />
            <CuboidTankMesh fillLevel={heightPercentage} capacity={currentCapacity} />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              maxDistance={15}
              minDistance={5}
            />
          </Canvas>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tank Fill Level (%)</label>
            <Slider
              value={[heightPercentage]}
              onValueChange={handleSliderChange}
              max={100}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Display current values */}
          <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-3 rounded-lg">
            <div>
              <span className="font-medium text-muted-foreground">Fill Level:</span>
              <div className="text-lg font-semibold text-primary">{heightPercentage.toFixed(1)}%</div>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Height:</span>
              <div className="text-lg font-semibold">{currentHeightMm.toFixed(0)} mm</div>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Volume:</span>
              <div className="text-lg font-semibold text-primary">{currentCapacity.toLocaleString()} L</div>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Est. Mass:</span>
              <div className="text-lg font-semibold">{(currentCapacity * 0.55).toFixed(0)} kg</div>
            </div>
          </div>

          {/* Key level indicators */}
          <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
            <div className="font-medium mb-1">Reference Levels:</div>
            <div className="grid grid-cols-2 gap-1">
              {referenceLevels.map(({ level, height }) => (
                <div key={level}>{level}% → {height} mm</div>
              ))}
              <div>Max → {displayMaxHeight} mm</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HorizontalCuboidTank3D;
