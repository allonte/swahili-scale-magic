import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TankDescription = () => {
  const specifications = [
    { label: "Tank", value: "Tank 01", label2: "Date of Calibration", value2: "27/06/2025" },
    { label: "Tank Owner", value: "Total Energies Uganda", label2: "Validity", value2: "10 Years" },
    { label: "Location", value: "Jinja, Uganda", label2: "Overall Uncertainty", value2: "+0.013%" },
    { label: "Tank Description", value: "LPG Bullet Tank", label2: "Method of Calibration", value2: "API MPMS CHAPTER 2" },
    { label: "Nominal Diameter", value: "2955 mm", label2: "Tank calibrated by", value2: "Murban Engineering Limited" },
    { label: "Cylinder Length", value: "15000 mm", label2: "Certificate No.", value2: "20257001028TC-01" },
    { label: "Tank Nominal Capacity", value: "98695 Liters", label2: "", value2: "" },
  ];

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
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <div><strong>5%:</strong> 154.45 mm</div>
                <div><strong>10%:</strong> 308.90 mm</div>
                <div><strong>85%:</strong> 2625.65 mm</div>
              </div>
              <div className="space-y-1">
                <div><strong>90%:</strong> 2780.1 mm</div>
                <div><strong>95%:</strong> 2934.55 mm</div>
                <div><strong>Max:</strong> 2955 mm</div>
              </div>
            </div>
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