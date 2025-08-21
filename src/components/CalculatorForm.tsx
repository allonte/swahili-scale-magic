import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import HorizontalBulletTank3D from "@/components/HorizontalBulletTank3D";
import DataTableModals from "@/components/DataTableModals";
import { getVolumeCorrectionFactor } from "@/lib/volumeCorrection";
import { heightCapacityData } from "@/components/TankGauge";

const getCapacityFromHeight = (heightMm: number): number => {
  if (heightMm <= 0) return heightCapacityData[0];
  const maxHeight = 2954;
  if (heightMm >= maxHeight) return heightCapacityData[maxHeight];

  const lower = Math.floor(heightMm);
  const upper = Math.ceil(heightMm);
  const lowerCap = heightCapacityData[lower];
  const upperCap = heightCapacityData[upper];

  if (lowerCap === undefined || upperCap === undefined) {
    return heightCapacityData[lower] || 0;
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
  applyPressureCorrection: boolean;
  showVCFTable: boolean;
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
    applyPressureCorrection: false,
    showVCFTable: false,
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
  
  // Modal states
  const [showShellFactors, setShowShellFactors] = useState(false);
  const [showPressureFactors, setShowPressureFactors] = useState(false);
  const [showHeightCapacity, setShowHeightCapacity] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // If height in mm is changed manually, update the gauge
    if (field === 'heightMm' && typeof value === 'string') {
      const heightMm = parseFloat(value);
      if (!isNaN(heightMm)) {
        const percentage = (heightMm / 2955) * 100; // Convert mm to percentage
        setHeightPercentage(Math.min(100, Math.max(0, percentage)));

        // Also update capacity based on height using interpolation data
        setCapacity(getCapacityFromHeight(heightMm));
      }
    }
  };

  const handleHeightChange = (height: number) => {
    setHeightPercentage(height);
    // Auto-sync height in mm based on percentage
    const heightMm = (height / 100) * 2955; // Max height from tank specifications
    setFormData(prev => ({ ...prev, heightMm: heightMm.toString() }));
  };

  const handleCapacityChange = (newCapacity: number) => {
    setCapacity(newCapacity);
  };

  // Volume correction factors (VCF) - using calibration table data
  const getVCF = (temperature: number, density: number) => {
    return getVolumeCorrectionFactor(density, temperature);
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
      const correctedVolume = formData.applyPressureCorrection 
        ? referenceVolume * vcf * pcf * scf
        : referenceVolume * vcf * scf;
      
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
      applyPressureCorrection: false,
      showVCFTable: false,
    });
    setResults(null);
    setHeightPercentage(0);
    setCapacity(100);
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
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <HorizontalBulletTank3D
        heightPercentage={heightPercentage}
        onHeightChange={handleHeightChange}
        onCapacityChange={handleCapacityChange}
        selectedTank={selectedTank}
        onTankChange={onTankChange}
      />
      
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
                id="pressureCorrection"
                checked={formData.applyPressureCorrection}
                onCheckedChange={(checked) => handleInputChange("applyPressureCorrection", checked as boolean)}
              />
              <Label htmlFor="pressureCorrection">Apply Pressure Correction</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="vcfTable"
                checked={formData.showVCFTable}
                onCheckedChange={(checked) => handleInputChange("showVCFTable", checked as boolean)}
              />
              <Label htmlFor="vcfTable">Show Product Temperature (VCF) table</Label>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            <Button onClick={handleCalculate}>Calculate</Button>
            <Button variant="outline" onClick={handleReset}>Reset</Button>
            <Button variant="outline" size="sm" onClick={() => setShowShellFactors(true)}>
              Shell Correction Factors
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowPressureFactors(true)}>
              Pressure Factors
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowHeightCapacity(true)}>
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
                  <span className="text-xl font-bold text-primary">{results.mass.toFixed(3)}</span>
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
      
      <DataTableModals
        showShellFactors={showShellFactors}
        showPressureFactors={showPressureFactors}
        showHeightCapacity={showHeightCapacity}
        onOpenChange={handleModalOpen}
      />
    </div>
  );
};

export default CalculatorForm;