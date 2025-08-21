import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TankDescriptionProps {
  selectedTank: 'tank1' | 'tank2';
}

const tankSpecifications: Record<'tank1' | 'tank2', { label: string; value: string; label2?: string; value2?: string }[]> = {
  tank1: [
    { label: "Tank", value: "Tank 01", label2: "Date of Calibration", value2: "27/06/2025" },
    { label: "Tank Owner", value: "Total Energies Uganda", label2: "Validity", value2: "10 Years" },
    { label: "Location", value: "Jinja, Uganda", label2: "Overall Uncertainty", value2: "+0.013%" },
    { label: "Tank Description", value: "LPG Bullet Tank", label2: "Method of Calibration", value2: "API MPMS CHAPTER 2" },
    { label: "Nominal Diameter", value: "2955 mm", label2: "Tank calibrated by", value2: "Murban Engineering Limited" },
    { label: "Cylinder Length", value: "15000 mm", label2: "Certificate No.", value2: "20257001028TC-01" },
    { label: "Tank Nominal Capacity", value: "98695 Liters" },
  ],
  tank2: [
    { label: "Tank", value: "Tank 02", label2: "Date of Calibration", value2: "29/06/2025" },
    { label: "Tank Owner", value: "Total Energies Jinja.", label2: "Validity", value2: "10 Years" },
    { label: "Location", value: "Jinja, Uganda", label2: "Overall Uncertainty", value2: "+0.012%" },
    { label: "Tank Description", value: "LPG Bullet Tank", label2: "Method of Calibration", value2: "API MPMS CHAPTER 2" },
    { label: "Nominal Diameter", value: "2422 mm", label2: "Tank calibrated by", value2: "Murban Engineering Limited" },
    { label: "Cylinder Length", value: "15000 mm", label2: "Certificate No.", value2: "20257001028TC-02" },
    { label: "Tank Nominal Capacity", value: "98682 Liters" },
  ],
};

const referenceLevels: Record<'tank1' | 'tank2', { level: number; height: number }[]> = {
  tank1: [
    { level: 5, height: 154.45 },
    { level: 10, height: 308.9 },
    { level: 85, height: 2625.65 },
    { level: 90, height: 2780.1 },
    { level: 95, height: 2934.55 },
  ],
  tank2: [
    { level: 5, height: 121.1 },
    { level: 10, height: 242.2 },
    { level: 85, height: 2058.7 },
    { level: 90, height: 2179.8 },
    { level: 95, height: 2300.9 },
  ],
};

const TankDescription = ({ selectedTank }: TankDescriptionProps) => {
  const specifications = tankSpecifications[selectedTank];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tank Description</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {specifications.map((spec, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">{spec.label}</span>
                <span className="font-medium text-sm">{spec.value}</span>
              </div>
              {spec.label2 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">{spec.label2}</span>
                  <span className="font-medium text-sm">{spec.value2}</span>
                </div>
              )}
            </div>
          ))}
          
          <div className="border-t pt-4">
            <h4 className="font-semibold text-sm mb-3">Capacity Chart Information</h4>
            <p className="text-xs text-muted-foreground mb-2">
              This document provides a capacity chart for the tank, showing the corresponding liquid volume in liters based on the liquid height. 
              The percentage levels below are based on the total calibrated internal height of the tank, and for estimating product volume 
              relative to the tank's fill level during operations, inspections, or inventory management.
            </p>
            {(() => {
              const levels = referenceLevels[selectedTank];
              const maxHeight = selectedTank === 'tank2' ? 2960 : 2955;
              return (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    {levels.slice(0, 3).map(({ level, height }) => (
                      <div key={level}><strong>{level}%:</strong> {height} mm</div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {levels.slice(3).map(({ level, height }) => (
                      <div key={level}><strong>{level}%:</strong> {height} mm</div>
                    ))}
                    <div><strong>Max:</strong> {maxHeight} mm</div>
                  </div>
                </div>
              );
            })()}
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-semibold text-sm mb-2">Thermal Expansion Coefficients</h4>
            <p className="text-xs text-muted-foreground">
              The thermal expansion coefficients indicate the rate of volumetric change of LPG with respect to temperature variations 
              and are based on the product's density at 20°C. These values are derived from standard industry data and align with 
              those found in API MPMS Chapter 11.2.4, ASTM D1250, and ISO 91.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TankDescription;