import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Group } from 'three';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { heightCapacityDataTank1 } from "@/components/TankGauge";
import { heightCapacityDataTank2 } from "@/data/tank2HeightCapacity";
import {
  getHeightFromPercentage,
  percentageHeightData,
} from "@/data/percentageHeightMapping";

interface HorizontalCylindricalTank3DProps {
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

const CylindricalTankMesh = ({
  fillLevel,
  capacity,
  referenceLevels,
  maxHeightMm,
}: {
  fillLevel: number;
  capacity: number;
  referenceLevels: { level: number; height: number }[];
  maxHeightMm: number;
}) => {
  const tankRef = useRef<Group>(null);
  const liquidRef = useRef<Group>(null);
  const tankRadius = 1.8;
  const cylinderLength = 8;
  const tankHeight = tankRadius * 2;
  const tankTotalLength = cylinderLength + tankRadius * 2;
  const currentFill = useRef(fillLevel);

  useFrame((state) => {
    if (tankRef.current) {
      tankRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
    currentFill.current += (fillLevel - currentFill.current) * 0.1;
    const liquidHeight = (currentFill.current / 100) * tankHeight;
    const scale = liquidHeight / tankHeight;
    if (liquidRef.current) {
      liquidRef.current.scale.x = scale;
      liquidRef.current.position.x = -tankRadius + tankRadius * scale;
    }
  });

  const supportOffset = cylinderLength / 2 + tankRadius - 0.2;

  return (
    <group>
      <group ref={tankRef}>
        <group rotation={[0, 0, Math.PI / 2]}>
          {/* Tank body */}
          <mesh>
            <cylinderGeometry args={[tankRadius, tankRadius, cylinderLength, 32]} />
            <meshStandardMaterial color="hsl(var(--muted))" transparent opacity={0.2} />
          </mesh>
          <mesh position={[0, cylinderLength / 2, 0]}>
            <sphereGeometry args={[tankRadius, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="hsl(var(--muted))" transparent opacity={0.2} />
          </mesh>
          <mesh position={[0, -cylinderLength / 2, 0]} rotation={[Math.PI, 0, 0]}>
            <sphereGeometry args={[tankRadius, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="hsl(var(--muted))" transparent opacity={0.2} />
          </mesh>

          {/* Liquid inside */}
          {fillLevel > 0 && (
            <group ref={liquidRef} position={[-tankRadius, 0, 0]} scale={[0, 1, 1]}>
              <mesh>
                <cylinderGeometry args={[tankRadius * 0.99, tankRadius * 0.99, cylinderLength, 32]} />
                <meshStandardMaterial color="#bbf7d0" transparent opacity={0.6} />
              </mesh>
              <mesh position={[0, cylinderLength / 2, 0]}>
                <sphereGeometry args={[tankRadius * 0.99, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#bbf7d0" transparent opacity={0.6} />
              </mesh>
              <mesh position={[0, -cylinderLength / 2, 0]} rotation={[Math.PI, 0, 0]}>
                <sphereGeometry args={[tankRadius * 0.99, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#bbf7d0" transparent opacity={0.6} />
              </mesh>
            </group>
          )}

          {/* Support bars */}
          {[-supportOffset, supportOffset].map((y) => (
            <mesh key={y} position={[-tankRadius - 0.3, y, 0]}>
              <boxGeometry args={[0.2, tankRadius * 2, 0.2]} />
              <meshStandardMaterial color="hsl(var(--muted))" />
            </mesh>
          ))}

          {/* Level indicators */}
          {referenceLevels.map(({ level, height }) => {
            const indicatorX = -tankHeight / 2 + (height / maxHeightMm) * tankHeight;
            const indicatorLevel = (height / maxHeightMm) * 100;
            return (
              <group key={level}>
                <mesh position={[indicatorX, -tankTotalLength / 2 - 0.2, 0]}>
                  <boxGeometry args={[0.05, 0.3, 0.05]} />
                  <meshStandardMaterial
                    color={Math.abs(indicatorLevel - fillLevel) < 5 ? '#4ade80' : 'hsl(var(--muted-foreground))'}
                  />
                </mesh>
                <mesh position={[indicatorX, tankTotalLength / 2 + 0.2, 0]}>
                  <boxGeometry args={[0.05, 0.3, 0.05]} />
                  <meshStandardMaterial
                    color={Math.abs(indicatorLevel - fillLevel) < 5 ? '#4ade80' : 'hsl(var(--muted-foreground))'}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
      </group>

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

const HorizontalCylindricalTank3D = ({
  heightPercentage,
  onHeightChange,
  onCapacityChange,
  selectedTank,
  onTankChange,
}: HorizontalCylindricalTank3DProps) => {
  const dataObj =
    selectedTank === 'tank2' ? heightCapacityDataTank2 : heightCapacityDataTank1;
  const maxHeight =
    percentageHeightData[selectedTank][
      percentageHeightData[selectedTank].length - 1
    ].height;

  const handleSliderChange = (value: number[]) => {
    const newPercentage = value[0];
    onHeightChange(newPercentage);

    const heightMm = getHeightFromPercentage(newPercentage, selectedTank);
    const capacity = getCapacityFromHeight(heightMm, dataObj, maxHeight);
    onCapacityChange(capacity);
  };

  const handleTankChange = (value: number[]) => {
    const tankValue = value[0] === 1 ? 'tank1' : 'tank2';
    onTankChange(tankValue);
  };

  // Calculate current height and capacity
  const currentHeightMm = getHeightFromPercentage(heightPercentage, selectedTank);
  const currentCapacity = getCapacityFromHeight(
    currentHeightMm,
    dataObj,
    maxHeight
  );

  const referenceLevels = percentageHeightData[selectedTank]
    .filter((p) => p.percentage !== 0 && p.percentage !== 100)
    .map((p) => ({ level: p.percentage, height: p.height }));

  const displayMaxHeight = maxHeight;

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Horizontal Cylindrical Tank Gauge</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tank selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Tank</label>
          <Slider
            value={[selectedTank === 'tank1' ? 1 : 2]}
            onValueChange={handleTankChange}
            min={1}
            max={2}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs">
            <span>Tank One</span>
            <span>Tank Two</span>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="h-80 w-full border rounded-lg bg-gradient-to-b from-background to-muted/20">
          <Canvas camera={{ position: [8, 4, 6], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-5, 10, 5]} intensity={0.8} />
            <directionalLight position={[5, -5, -5]} intensity={0.3} />
            <CylindricalTankMesh
              fillLevel={heightPercentage}
              capacity={currentCapacity}
              referenceLevels={referenceLevels}
              maxHeightMm={maxHeight}
            />
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

export default HorizontalCylindricalTank3D;
