import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { getCapacityFromHeight } from '@/lib/heightCapacity';

// Convert height percentage (0-100) to millimeters and get capacity
function getCapacityFromPercentage(percentage: number): number {
  const heightMM = Math.round((percentage / 100) * 2954);
  return getCapacityFromHeight(heightMM);
}

interface TankGaugeProps {
  heightPercentage: number;
  onHeightChange: (height: number) => void;
  onCapacityChange: (capacity: number) => void;
}

const TankGauge: React.FC<TankGaugeProps> = ({ heightPercentage, onHeightChange, onCapacityChange }) => {
  const capacity = getCapacityFromPercentage(heightPercentage);

  const handleSliderChange = (values: number[]) => {
    const newHeight = values[0];
    const newCapacity = getCapacityFromPercentage(newHeight);
    onHeightChange(newHeight);
    onCapacityChange(newCapacity);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Tank Level Gauge</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual Tank Gauge */}
        <div className="flex justify-center">
          <div className="relative w-80 h-32">
            {/* Tank Outline */}
            <div className="w-full h-full border-4 border-emerald-700 rounded-full bg-emerald-50 relative overflow-hidden shadow">
              {/* Liquid Level */}
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-600 to-green-400 transition-all duration-300 ease-out"
                style={{ width: `${heightPercentage}%` }}
              />
              {/* Percentage Labels */}
              <div className="absolute inset-0 flex items-center justify-between px-3 text-[10px] font-bold text-emerald-900/70">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Current Level Indicator */}
            <div
              className="absolute -top-6 transform -translate-x-1/2 transition-all duration-300"
              style={{ left: `${heightPercentage}%` }}
            >
              <div className="bg-emerald-700 text-white text-xs px-2 py-1 rounded-md shadow">
                {heightPercentage}%
              </div>
            </div>
          </div>
        </div>

        {/* Slider Control */}
        <div className="space-y-4">
          <div className="text-center">
            <label className="text-sm font-medium text-foreground/70">
              Height Percentage
            </label>
          </div>
          <Slider
            value={[heightPercentage]}
            onValueChange={handleSliderChange}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
        </div>

        {/* Display Values */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-secondary/20 rounded-lg border">
            <div className="text-2xl font-bold text-primary">{heightPercentage}%</div>
            <div className="text-sm text-muted-foreground">Height</div>
          </div>
          <div className="text-center p-4 bg-secondary/20 rounded-lg border">
            <div className="text-2xl font-bold text-primary">{capacity.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Capacity (L)</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TankGauge;
