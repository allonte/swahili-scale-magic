import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import TankGauge from "@/components/TankGauge";
import DataTableModals from "@/components/DataTableModals";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cylinder } from "lucide-react";
import { getVolumeCorrectionFactor as getVCFTank1 } from "@/lib/volumeCorrection";
import { getVolumeCorrectionFactor as getVCFTank2 } from "@/lib/volumeCorrectionTank2";
import { heightCapacityDataTank1 } from "@/components/TankGauge";
import { heightCapacityDataTank2 } from "@/data/tank2HeightCapacity";
import {
  getHeightFromPercentage,
  getPercentageFromHeight,
  percentageHeightData,
} from "@/data/percentageHeightMapping";

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

interface FormData {
  productDensity: string;
  productTemperature: string;
  shellTemperature: string;
  height: string;
  heightMm: string;
  pressure: string;
}

interface CalculatorFormProps {
  selectedTank: 'tank1' | 'tank2';
  onTankChange: (tank: 'tank1' | 'tank2') => void;
}

interface CalculationResults {
  referenceVolume: number;
  vcf: number;
  scf: number;
  correctedVolume: number;
  pcf: number;
  density: number;
  mass: number;
}

const CalculatorForm = ({ selectedTank, onTankChange }: CalculatorFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    productDensity: "0.55",
    productTemperature: "20",
    shellTemperature: "20",
    height: "0",
    heightMm: "0",
    pressure: "17",
  });

  // Pressure correction factors
  const pressureCorrectionFactors = {
    15: 0.999890,
    16: 0.999912,
    17: 0.999934,
    18: 0.999956,
    19: 0.999978,
    20: 1.000000,
    21: 1.000022,
    22: 1.000044,
    23: 1.000066,
    24: 1.000088,
  };

  const [results, setResults] = useState<CalculationResults | string | null>(null);
  const [heightPercentage, setHeightPercentage] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(100);

  const heightData =
    selectedTank === 'tank2' ? heightCapacityDataTank2 : heightCapacityDataTank1;
  const maxHeight =
    percentageHeightData[selectedTank][
      percentageHeightData[selectedTank].length - 1
    ].height;
  
  // Modal states
  const [showShellFactors, setShowShellFactors] = useState(false);
  const [showPressureFactors, setShowPressureFactors] = useState(false);
  const [showHeightCapacity, setShowHeightCapacity] = useState(false);
  const [showVCFTable, setShowVCFTable] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // If height in mm is changed manually, update the gauge
    if (field === 'heightMm' && typeof value === 'string') {
      const heightMm = parseFloat(value);
      if (!isNaN(heightMm)) {
        const percentage = getPercentageFromHeight(heightMm, selectedTank);
        setHeightPercentage(Math.min(100, Math.max(0, percentage)));

        setCapacity(getCapacityFromHeight(heightMm, heightData, maxHeight));
      }
    }
  };

  const handleHeightChange = (height: number) => {
    setHeightPercentage(height);
    // Auto-sync height in mm based on percentage
    const heightMm = getHeightFromPercentage(height, selectedTank);
    setFormData((prev) => ({ ...prev, heightMm: heightMm.toString() }));
    setCapacity(getCapacityFromHeight(heightMm, heightData, maxHeight));
  };

  const handleTankSelection = (tankValue: 'tank1' | 'tank2') => {
    onTankChange(tankValue);
    const heightMm = getHeightFromPercentage(heightPercentage, tankValue);
    setFormData((prev) => ({ ...prev, heightMm: heightMm.toString() }));
    const dataObj = tankValue === 'tank2' ? heightCapacityDataTank2 : heightCapacityDataTank1;
    const maxHeightValue =
      percentageHeightData[tankValue][
        percentageHeightData[tankValue].length - 1
      ].height;
    setCapacity(getCapacityFromHeight(heightMm, dataObj, maxHeightValue));
  };

  // Volume correction factors (VCF) - using calibration table data
  const getVCF = (temperature: number, density: number) => {
    const fn = selectedTank === 'tank2' ? getVCFTank2 : getVCFTank1;
    return fn(density, temperature);
  };

  const handleCalculate = () => {
    const density = parseFloat(formData.productDensity);
    const productTemp = parseFloat(formData.productTemperature);
    const pressure = parseFloat(formData.pressure);
    
    if (capacity && density && !isNaN(productTemp) && !isNaN(pressure)) {
      const referenceVolume = capacity; // Volume in liters from gauge
      
      // Get correction factors
      const vcf = getVCF(productTemp, density);
      const pcf = pressureCorrectionFactors[pressure as keyof typeof pressureCorrectionFactors] || 1.000000;
      const scf = 1.000000; // Shell correction factor (simplified)
      
      // Calculate corrected volume
      const correctedVolume = referenceVolume * vcf * pcf * scf;
      
      // Calculate mass
      const mass = correctedVolume * density;
      
      setResults({
        referenceVolume: referenceVolume,
        vcf: vcf,
        scf: scf,
        correctedVolume: correctedVolume,
        pcf: pcf,
        density: density,
        mass: mass
      });
    } else {
      setResults("Please set gauge position and enter valid values.");
    }
  };

  const handleReset = () => {
    setFormData({
      productDensity: "0.55",
      productTemperature: "20",
      shellTemperature: "20",
      height: "0",
      heightMm: "0",
      pressure: "17",
    });
    setResults(null);
    setHeightPercentage(0);
    setCapacity(100);
    setShowVCFTable(false);
  };

  const handleModalOpen = (type: string, open: boolean) => {
    switch (type) {
      case 'shell':
        setShowShellFactors(open);
        break;
      case 'pressure':
        setShowPressureFactors(open);
        break;
      case 'height':
        setShowHeightCapacity(open);
        break;
      case 'vcf':
        setShowVCFTable(open);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="rounded-xl bg-gray-100 p-6 text-black space-y-4">
          <h2 className="text-xl font-semibold text-black">Mass Calculator</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Cylinder className="h-4 w-4" />
              <span>Select Tank</span>
            </div>
            <Select value={selectedTank} onValueChange={handleTankSelection}>
            <SelectTrigger className="w-full bg-white/20 text-black border-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Choose tank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tank1" className="text-black">Tank One</SelectItem>
                <SelectItem value="tank2" className="text-black">Tank Two</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <TankGauge
          heightPercentage={heightPercentage}
          onHeightChange={handleHeightChange}
          capacity={capacity}
          selectedTank={selectedTank}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manual Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productDensity">Product Density (kg/L)</Label>
              <Input
                id="productDensity"
                type="number"
                step="0.01"
                value={formData.productDensity}
                onChange={(e) => handleInputChange("productDensity", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productTemperature">Product Temperature (°C)</Label>
              <Input
                id="productTemperature"
                type="number"
                value={formData.productTemperature}
                onChange={(e) => handleInputChange("productTemperature", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shellTemperature">Shell Temperature (°C)</Label>
              <Input
                id="shellTemperature"
                type="number"
                value={formData.shellTemperature}
                onChange={(e) => handleInputChange("shellTemperature", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heightMm">Tank Height (mm)</Label>
              <Input
                id="heightMm"
                type="number"
                value={formData.heightMm}
                onChange={(e) => handleInputChange("heightMm", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pressure">Pressure (bar)</Label>
              <Input
                id="pressure"
                type="number"
                value={formData.pressure}
                onChange={(e) => handleInputChange("pressure", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="vcfTable"
                checked={showVCFTable}
                onCheckedChange={(checked) => setShowVCFTable(checked as boolean)}
              />
              <Label htmlFor="vcfTable">Show Product Temperature (VCF) table</Label>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            <Button variant="outline" onClick={handleCalculate}>Calculate</Button>
            <Button variant="outline" onClick={handleReset}>Reset</Button>
            <Button variant="outline" onClick={() => setShowShellFactors(true)}>
              Shell Correction Factors
            </Button>
            <Button variant="outline" onClick={() => setShowPressureFactors(true)}>
              Pressure Factors
            </Button>
            <Button variant="outline" onClick={() => setShowHeightCapacity(true)}>
              Height↔Capacity Table
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          {results && typeof results === 'object' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference Volume (L)</span>
                  <span className="font-medium">{results.referenceVolume.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product Temperature Factor (VCF)</span>
                  <span className="font-medium">{results.vcf.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shell Correction Factor (SCF)</span>
                  <span className="font-medium">{results.scf.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Corrected Volume (L)</span>
                  <span className="font-medium">{results.correctedVolume.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PCF used</span>
                  <span className="font-medium">{results.pcf.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product Density used (kg/L)</span>
                  <span className="font-medium">{results.density.toFixed(3)}</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Mass (kg)</span>
                  <span className="text-xl font-bold text-black">{results.mass.toFixed(3)}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Copy results
                </Button>
                <Button variant="outline" size="sm">
                  Export CSV
                </Button>
                <Button variant="outline" size="sm">
                  Print
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              {typeof results === 'string' ? results : "Use the gauge to set tank level and click Calculate to see results."}
            </div>
          )}
        </CardContent>
      </Card>
      </div>

      <DataTableModals
        showShellFactors={showShellFactors}
        showPressureFactors={showPressureFactors}
        showHeightCapacity={showHeightCapacity}
        showVCFTable={showVCFTable}
        onOpenChange={handleModalOpen}
        selectedTank={selectedTank}
      />
    </div>
  );
};

export default CalculatorForm;