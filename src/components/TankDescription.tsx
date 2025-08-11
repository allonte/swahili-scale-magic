import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TankDescription = () => {
  const specifications = [
    { label: "Client", value: "Swahili Beach Hotel", label2: "Revision Date", value2: "30th July, 2025" },
    { label: "Project No.", value: "20257001032TC", label2: "Revision No.", value2: "rev 01" },
    { label: "Tank", value: "0160750", label2: "Tank Owner", value2: "Swahili Beach Hotel" },
    { label: "Location", value: "Diani Beach, Kenya", label2: "Tank Description", value2: "LPG Bullet Tank" },
    { label: "Nominal Diameter", value: "1190 mm", label2: "Cylinder Length", value2: "3700 mm" },
    { label: "Tank Nominal Capacity", value: "3898 Liters", label2: "Date of Calibration", value2: "30/07/2025" },
    { label: "Validity", value: "10 Years", label2: "Overall Uncertainty", value2: "+0.012%" },
    { label: "Method of Calibration", value: "API MPMS CHAPTER 2", label2: "Tank calibrated by", value2: "Murban Engineering Limited" },
    { label: "Certificate No.", value: "20257001032TC-0160750", label2: "", value2: "" },
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