import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mesh, Plane, Vector3 } from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { heightCapacityDataTank1 } from '@/components/TankGauge';
import { heightCapacityDataTank2 } from '@/data/tank2HeightCapacity';

interface Tank3DProps {
  heightPercentage: number;
  onHeightChange: (height: number) => void;
  onCapacityChange: (capacity: number) => void;
  selectedTank: 'tank1' | 'tank2';
}

// Interpolate capacity from height using selected tank data
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

// Bullet tank mesh rendered in the 3D scene
const BulletTankMesh = ({ fillLevel }: { fillLevel: number }) => {
  const tankRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (tankRef.current) {
      // Gentle sway for a dynamic look
      tankRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  const tankLength = 8;
  const tankRadius = 1.2;
  const hemisphereRadius = tankRadius;

  const liquidHeight = (fillLevel / 100) * (tankRadius * 2);
  const clipPlane = new Plane(new Vector3(0, -1, 0), -tankRadius + liquidHeight);

  return (
    <group>
      {/* Cylindrical body */}
      <mesh ref={tankRef} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[tankRadius, tankRadius, tankLength, 32]} />
        <meshStandardMaterial
          color="hsl(var(--muted))"
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Hemispherical ends */}
      <mesh position={[-tankLength / 2, 0, 0]}>
        <sphereGeometry args={[hemisphereRadius, 16, 8, 0, Math.PI]} />
        <meshStandardMaterial color="hsl(var(--muted))" transparent opacity={0.2} />
      </mesh>
      <mesh position={[tankLength / 2, 0, 0]} rotation={[0, Math.PI, 0]}>
        <sphereGeometry args={[hemisphereRadius, 16, 8, 0, Math.PI]} />
        <meshStandardMaterial color="hsl(var(--muted))" transparent opacity={0.2} />
      </mesh>

      {/* Liquid */}
      {fillLevel > 0 && (
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[tankRadius * 0.99, tankRadius * 0.99, tankLength, 32]} />
          <meshStandardMaterial
            color="#bbf7d0"
            transparent
            opacity={0.6}
            clippingPlanes={[clipPlane]}
          />
        </mesh>
      )}

      {/* Level indicators */}
      {[5, 10, 85, 90, 95].map((level) => {
        const indicatorY = -tankRadius + (level / 100) * (tankRadius * 2);
        return (
          <group key={level}>
            <mesh position={[-tankLength / 2 - 0.2, indicatorY, 0]}>
              <boxGeometry args={[0.3, 0.05, 0.05]} />
              <meshStandardMaterial color={Math.abs(level - fillLevel) < 5 ? '#4ade80' : 'hsl(var(--muted-foreground))'} />
            </mesh>
            <mesh position={[tankLength / 2 + 0.2, indicatorY, 0]}>
              <boxGeometry args={[0.3, 0.05, 0.05]} />
              <meshStandardMaterial color={Math.abs(level - fillLevel) < 5 ? '#4ade80' : 'hsl(var(--muted-foreground))'} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// 3D bullet tank gauge component
const Tank3DGauge = ({ heightPercentage, onHeightChange, onCapacityChange, selectedTank }: Tank3DProps) => {
  const dataObj = selectedTank === 'tank2' ? heightCapacityDataTank2 : heightCapacityDataTank1;
  const maxHeight = selectedTank === 'tank2' ? 2960 : 2954;
  const displayMaxHeight = selectedTank === 'tank2' ? 2960 : 2955;

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

  const handleSliderChange = (value: number[]) => {
    const newPercentage = value[0];
    onHeightChange(newPercentage);

    const heightMm = (newPercentage / 100) * maxHeight; // Max height from specifications
    const capacity = getCapacityFromHeight(heightMm, dataObj, maxHeight);
    onCapacityChange(capacity);
  };

  const currentHeightMm = (heightPercentage / 100) * maxHeight;
  const currentCapacity = getCapacityFromHeight(currentHeightMm, dataObj, maxHeight);

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D Bullet Tank Gauge</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 3D Canvas */}
        <div className="h-80 w-full border rounded-lg bg-gradient-to-b from-background to-muted/20">
          <Canvas camera={{ position: [8, 4, 6], fov: 50 }} gl={{ localClippingEnabled: true }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-5, 10, 5]} intensity={0.8} />
            <directionalLight position={[5, -5, -5]} intensity={0.3} />
            <BulletTankMesh fillLevel={heightPercentage} />
            <OrbitControls enablePan={false} enableZoom={true} maxDistance={15} minDistance={5} />
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

export default Tank3DGauge;

