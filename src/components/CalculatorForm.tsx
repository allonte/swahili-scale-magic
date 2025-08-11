import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  productDensity: string;
  productTemperature: string;
  shellTemperature: string;
  height: string;
  pressure: string;
  applyPressureCorrection: boolean;
  showVCFTable: boolean;
}

const CalculatorForm = () => {
  const [formData, setFormData] = useState<FormData>({
    productDensity: "0.55",
    productTemperature: "20",
    shellTemperature: "20",
    height: "0",
    pressure: "17",
    applyPressureCorrection: false,
    showVCFTable: false,
  });

  const [results, setResults] = useState<string>("");

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    // Basic calculation logic - in a real app this would be more complex
    const height = parseFloat(formData.height);
    const density = parseFloat(formData.productDensity);
    
    if (height && density) {
      const volume = Math.PI * Math.pow(595, 2) * (height / 10) / 1000000; // Convert mm to m
      const mass = volume * density * 1000;
      setResults(`Calculated Volume: ${volume.toFixed(3)} L\nCalculated Mass: ${mass.toFixed(2)} kg`);
    } else {
      setResults("Please enter valid height and density values.");
    }
  };

  const handleReset = () => {
    setFormData({
      productDensity: "0.55",
      productTemperature: "20",
      shellTemperature: "20",
      height: "0",
      pressure: "17",
      applyPressureCorrection: false,
      showVCFTable: false,
    });
    setResults("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <Label htmlFor="height">Height (mm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pressure">Pressure (bar)</Label>
            <Input
              id="pressure"
              type="number"
              value={formData.pressure}
              onChange={(e) => handleInputChange("pressure", e.target.value)}
            />
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
            <Button variant="outline" size="sm">Shell Correction Factors</Button>
            <Button variant="outline" size="sm">Pressure Factors</Button>
            <Button variant="outline" size="sm">Height↔Capacity Table</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground whitespace-pre-line">
            {results || "Enter inputs and click Calculate to see results."}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorForm;