import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

// Capacity lookup table based on height percentage
const capacityData: { [key: number]: number } = {
  0: 100, 1: 124.29, 2: 149.44, 3: 175.44, 4: 202.3, 5: 230, 6: 258.54, 7: 287.92, 8: 318.12, 9: 349.15,
  10: 381, 11: 413.66, 12: 447.1, 13: 481.32, 14: 516.28, 15: 551.97, 16: 588.36, 17: 625.44, 18: 663.18, 19: 701.55,
  20: 740.55, 21: 780.14, 22: 820.31, 23: 861.03, 24: 902.28, 25: 944.04, 26: 986.29, 27: 1029, 28: 1072.16, 29: 1115.75,
  30: 1159.74, 31: 1204.11, 32: 1248.83, 33: 1293.9, 34: 1339.28, 35: 1384.95, 36: 1430.9, 37: 1477.1, 38: 1523.53, 39: 1570.16,
  40: 1616.99, 41: 1663.97, 42: 1711.1, 43: 1758.36, 44: 1805.71, 45: 1853.14, 46: 1900.63, 47: 1948.15, 48: 1995.69, 49: 2043.21,
  50: 2090.71, 51: 2138.16, 52: 2185.54, 53: 2232.82, 54: 2279.99, 55: 2327.02, 56: 2373.89, 57: 2420.57, 58: 2467.06, 59: 2513.33,
  60: 2559.34, 61: 2605.1, 62: 2650.56, 63: 2695.71, 64: 2740.54, 65: 2785, 66: 2829.1, 67: 2872.8, 68: 2916.08, 69: 2958.92,
  70: 3001.3, 71: 3043.19, 72: 3084.59, 73: 3125.45, 74: 3165.77, 75: 3205.53, 76: 3244.69, 77: 3283.23, 78: 3321.15, 79: 3358.41,
  80: 3394.99, 81: 3430.88, 82: 3466.04, 83: 3500.46, 84: 3534.12, 85: 3567, 86: 3599.05, 87: 3630.13, 88: 3660.09, 89: 3688.76,
  90: 3716, 91: 3741.66, 92: 3765.71, 93: 3788.13, 94: 3808.89, 95: 3828, 96: 3845.43, 97: 3861.15, 98: 3875.17, 99: 3887.46,
  100: 3898
};

interface TankGaugeProps {
  heightPercentage: number;
  onHeightChange: (height: number) => void;
  onCapacityChange: (capacity: number) => void;
}

const TankGauge: React.FC<TankGaugeProps> = ({ heightPercentage, onHeightChange, onCapacityChange }) => {
  const capacity = capacityData[heightPercentage] || 0;
  
  const handleSliderChange = (values: number[]) => {
    const newHeight = values[0];
    const newCapacity = capacityData[newHeight] || 0;
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
          <div className="relative">
            {/* Tank Outline */}
            <div className="w-32 h-64 border-4 border-primary rounded-lg bg-secondary/20 relative overflow-hidden">
              {/* Liquid Level */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/70 transition-all duration-300 ease-out"
                style={{ height: `${heightPercentage}%` }}
              />
              {/* Percentage Labels */}
              <div className="absolute inset-0 flex flex-col justify-between py-2 px-1">
                <div className="text-xs font-bold text-foreground/70">100%</div>
                <div className="text-xs font-bold text-foreground/70">50%</div>
                <div className="text-xs font-bold text-foreground/70">0%</div>
              </div>
            </div>
            
            {/* Current Level Indicator */}
            <div 
              className="absolute right-0 w-6 h-1 bg-accent border border-accent-foreground rounded-r transform -translate-y-1/2 transition-all duration-300"
              style={{ bottom: `${heightPercentage}%` }}
            >
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-background border border-accent-foreground rounded px-2 py-1 text-xs font-bold whitespace-nowrap">
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