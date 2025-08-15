import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TankDescription = () => {
  const specifications = [
    { label: "Tank", value: "Tank 02", label2: "Date of Calibration", value2: "29/06/2025" },
    { label: "Tank Owner", value: "Total Energies Jinja", label2: "Validity", value2: "10 Years" },
    { label: "Location", value: "Jinja, Uganda", label2: "Overall Uncertainty", value2: "+0.012%" },
    { label: "Tank Description", value: "LPG Bullet Tank", label2: "Method of Calibration", value2: "API MPMS CHAPTER 2" },
    { label: "Nominal Diameter", value: "2422 mm", label2: "Tank calibrated by", value2: "Murban Engineering Limited" },
    { label: "Cylinder Length", value: "15000 mm", label2: "Certificate No.", value2: "20257001028TC-02" },
    { label: "Tank Nominal Capacity", value: "98682 Liters", label2: "", value2: "" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tank Description</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default TankDescription;