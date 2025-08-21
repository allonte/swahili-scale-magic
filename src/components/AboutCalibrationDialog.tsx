import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const specs = [
  { label: "Tank", value: "Tank 02" },
  { label: "Tank Owner", value: "Total Energies Uganda" },
  { label: "Location", value: "Jinja, Uganda" },
  { label: "Tank Description", value: "LPG Bullet Tank" },
  { label: "Nominal Diameter", value: "2422 mm" },
  { label: "Cylinder Length", value: "15000 mm" },
  { label: "Tank Nominal Capacity", value: "98695 Liters" },
  { label: "Date of Calibration", value: "27/06/2025" },
  { label: "Validity", value: "10 Years" },
  { label: "Overall Uncertainty", value: "+0.013%" },
  { label: "Method of Calibration", value: "API MPMS CHAPTER 2" },
  { label: "Tank calibrated by", value: "Murban Engineering Limited" },
  { label: "Certificate No.", value: "20257001028TC-01" },
];

const AboutCalibrationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          About / Calibration
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tank Calibration Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {specs.map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutCalibrationDialog;
