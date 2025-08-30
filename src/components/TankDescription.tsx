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
        </div>
      </CardContent>
    </Card>
  );
};

export default TankDescription;