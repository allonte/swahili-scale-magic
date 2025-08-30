import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { heightCapacityDataTank1 } from "./TankGauge";
import { heightCapacityDataTank2 } from "@/data/tank2HeightCapacity";

interface DataTableModalsProps {
  showShellFactors: boolean;
  showPressureFactors: boolean;
  showHeightCapacity: boolean;
  showVCFTable: boolean;
  onOpenChange: (type: string, open: boolean) => void;
  selectedTank: 'tank1' | 'tank2';
}

const shellFactors = [
  [15, 0.999890], [16, 0.999912], [17, 0.999934], [18, 0.999956], [19, 0.999978],
  [20, 1.000000], [21, 1.000022], [22, 1.000044], [23, 1.000066], [24, 1.000088]
];

const pressureFactors = [
  [15, 0.999890], [16, 0.999912], [17, 0.999934], [18, 0.999956], [19, 0.999978],
  [20, 1.000000], [21, 1.000022], [22, 1.000044], [23, 1.000066], [24, 1.000088]
];

const tankDetails: Record<'tank1' | 'tank2', { label: string; value: string }[]> = {
  tank1: [
    { label: "Tank", value: "Tank 01" },
    { label: "Tank Owner", value: "Total Energies Uganda" },
    { label: "Location", value: "Jinja, Uganda" },
    { label: "Tank Description", value: "LPG Bullet Tank" },
    { label: "Nominal Diameter", value: "2955 mm" },
    { label: "Cylinder Length", value: "15000 mm" },
    { label: "Tank Nominal Capacity", value: "98,695 Liters" },
    { label: "Date of Calibration", value: "27/06/2025" },
    { label: "Validity", value: "10 Years" },
    { label: "Overall Uncertainty", value: "+0.013%" },
    { label: "Method of Calibration", value: "API MPMS CHAPTER 2" },
    { label: "Tank calibrated by", value: "Murban Engineering Limited" },
    { label: "Certificate No.", value: "20257001028TC-01" },
  ],
  tank2: [
    { label: "Tank", value: "Tank 02" },
    { label: "Tank Owner", value: "Total Energies Uganda" },
    { label: "Location", value: "Jinja, Uganda" },
    { label: "Tank Description", value: "LPG Bullet Tank" },
    { label: "Nominal Diameter", value: "2422 mm" },
    { label: "Cylinder Length", value: "15000 mm" },
    { label: "Tank Nominal Capacity", value: "98,682 Liters" },
    { label: "Date of Calibration", value: "29/06/2025" },
    { label: "Validity", value: "10 Years" },
    { label: "Overall Uncertainty", value: "+0.012%" },
    { label: "Method of Calibration", value: "API MPMS CHAPTER 2" },
    { label: "Tank calibrated by", value: "Murban Engineering Limited" },
    { label: "Certificate No.", value: "20257001028TC-02" },
  ],
};

const volumeCorrectionFactors = {
  densities: [0.500, 0.510, 0.520, 0.530, 0.540, 0.550, 0.560, 0.570, 0.580, 0.590],
  temperatures: [
    0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 
    8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 15.0,
    15.5, 16.0, 16.5, 17.0, 17.5, 18.0, 18.5, 19.0, 19.5, 20.0, 20.5, 21.0, 21.5, 22.0,
    22.5, 23.0, 23.5, 24.0, 24.5, 25.0, 25.5, 26.0, 26.5, 27.0, 27.5, 28.0, 28.5, 29.0, 29.5, 30.0
  ],
  factors: [
    // Temperature 0.0°C to 30.0°C with corresponding factors
    [1.070, 1.065, 1.060, 1.059, 1.056, 1.051, 1.050, 1.047, 1.046, 1.042],
    [1.068, 1.063, 1.059, 1.058, 1.054, 1.050, 1.049, 1.045, 1.045, 1.041],
    [1.066, 1.061, 1.057, 1.056, 1.053, 1.048, 1.048, 1.044, 1.044, 1.040],
    [1.064, 1.060, 1.056, 1.055, 1.051, 1.047, 1.046, 1.043, 1.042, 1.039],
    [1.062, 1.058, 1.054, 1.053, 1.050, 1.046, 1.045, 1.042, 1.041, 1.038],
    [1.060, 1.056, 1.052, 1.052, 1.048, 1.044, 1.044, 1.041, 1.040, 1.037],
    [1.059, 1.055, 1.051, 1.050, 1.047, 1.043, 1.043, 1.039, 1.039, 1.036],
    [1.057, 1.053, 1.049, 1.048, 1.045, 1.042, 1.041, 1.038, 1.038, 1.034],
    [1.055, 1.051, 1.048, 1.047, 1.044, 1.040, 1.040, 1.037, 1.036, 1.033],
    [1.053, 1.050, 1.046, 1.045, 1.043, 1.039, 1.039, 1.036, 1.035, 1.032],
    [1.051, 1.048, 1.045, 1.044, 1.041, 1.038, 1.037, 1.035, 1.034, 1.031],
    [1.049, 1.046, 1.043, 1.042, 1.040, 1.037, 1.036, 1.033, 1.033, 1.030],
    [1.048, 1.045, 1.041, 1.041, 1.038, 1.035, 1.035, 1.032, 1.032, 1.029],
    [1.046, 1.043, 1.040, 1.039, 1.037, 1.034, 1.033, 1.031, 1.031, 1.028],
    [1.044, 1.041, 1.038, 1.038, 1.035, 1.033, 1.032, 1.030, 1.029, 1.027],
    [1.042, 1.040, 1.037, 1.036, 1.034, 1.031, 1.031, 1.029, 1.028, 1.026],
    [1.041, 1.038, 1.035, 1.035, 1.033, 1.030, 1.030, 1.027, 1.027, 1.025],
    [1.039, 1.036, 1.034, 1.033, 1.031, 1.029, 1.028, 1.026, 1.026, 1.024],
    [1.037, 1.035, 1.032, 1.032, 1.030, 1.027, 1.027, 1.025, 1.025, 1.023],
    [1.035, 1.033, 1.031, 1.030, 1.028, 1.026, 1.026, 1.024, 1.024, 1.022],
    [1.034, 1.031, 1.029, 1.029, 1.027, 1.025, 1.025, 1.023, 1.022, 1.021],
    [1.032, 1.030, 1.028, 1.027, 1.026, 1.024, 1.023, 1.022, 1.021, 1.020],
    [1.030, 1.028, 1.026, 1.026, 1.024, 1.022, 1.022, 1.020, 1.020, 1.019],
    [1.028, 1.027, 1.025, 1.024, 1.023, 1.021, 1.021, 1.019, 1.019, 1.017],
    [1.027, 1.025, 1.023, 1.023, 1.022, 1.020, 1.020, 1.018, 1.018, 1.016],
    [1.025, 1.023, 1.022, 1.021, 1.020, 1.019, 1.018, 1.017, 1.017, 1.015],
    [1.023, 1.022, 1.020, 1.020, 1.019, 1.017, 1.017, 1.016, 1.016, 1.014],
    [1.022, 1.020, 1.019, 1.019, 1.017, 1.016, 1.016, 1.015, 1.015, 1.013],
    [1.020, 1.019, 1.017, 1.017, 1.016, 1.015, 1.015, 1.014, 1.013, 1.012],
    [1.018, 1.017, 1.016, 1.016, 1.015, 1.014, 1.013, 1.012, 1.012, 1.011],
    [1.017, 1.015, 1.014, 1.014, 1.013, 1.012, 1.012, 1.011, 1.011, 1.010],
    [1.015, 1.014, 1.013, 1.013, 1.012, 1.011, 1.011, 1.010, 1.010, 1.009],
    [1.013, 1.012, 1.012, 1.011, 1.011, 1.010, 1.010, 1.009, 1.009, 1.008],
    [1.012, 1.011, 1.010, 1.010, 1.009, 1.009, 1.008, 1.008, 1.008, 1.007],
    [1.010, 1.009, 1.009, 1.008, 1.008, 1.007, 1.007, 1.007, 1.007, 1.006],
    [1.008, 1.008, 1.007, 1.007, 1.007, 1.006, 1.006, 1.006, 1.006, 1.005],
    [1.007, 1.006, 1.006, 1.006, 1.005, 1.005, 1.005, 1.004, 1.004, 1.004],
    [1.005, 1.005, 1.004, 1.004, 1.004, 1.004, 1.004, 1.003, 1.003, 1.003],
    [1.003, 1.003, 1.003, 1.003, 1.003, 1.002, 1.002, 1.002, 1.002, 1.002],
    [1.002, 1.002, 1.001, 1.001, 1.001, 1.001, 1.001, 1.001, 1.001, 1.001],
    [1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000], // 20°C baseline
    [0.998, 0.998, 0.999, 0.999, 0.999, 0.999, 0.999, 0.999, 0.999, 0.999],
    [0.997, 0.997, 0.997, 0.997, 0.997, 0.998, 0.998, 0.998, 0.998, 0.998],
    [0.995, 0.995, 0.996, 0.996, 0.996, 0.996, 0.996, 0.997, 0.997, 0.997],
    [0.994, 0.994, 0.994, 0.994, 0.995, 0.995, 0.995, 0.996, 0.996, 0.996],
    [0.992, 0.992, 0.993, 0.993, 0.993, 0.994, 0.994, 0.994, 0.995, 0.995],
    [0.990, 0.991, 0.992, 0.992, 0.992, 0.993, 0.993, 0.993, 0.993, 0.994],
    [0.989, 0.989, 0.990, 0.990, 0.991, 0.992, 0.992, 0.992, 0.992, 0.993],
    [0.987, 0.988, 0.989, 0.989, 0.990, 0.990, 0.990, 0.991, 0.991, 0.992],
    [0.986, 0.986, 0.987, 0.988, 0.988, 0.989, 0.989, 0.990, 0.990, 0.991],
    [0.984, 0.985, 0.986, 0.986, 0.987, 0.988, 0.988, 0.989, 0.989, 0.990],
    [0.982, 0.984, 0.985, 0.985, 0.986, 0.987, 0.987, 0.988, 0.988, 0.989],
    [0.981, 0.982, 0.983, 0.983, 0.984, 0.986, 0.986, 0.987, 0.987, 0.988],
    [0.979, 0.981, 0.982, 0.982, 0.983, 0.984, 0.985, 0.986, 0.986, 0.987],
    [0.978, 0.979, 0.980, 0.981, 0.982, 0.983, 0.983, 0.985, 0.985, 0.986],
    [0.976, 0.978, 0.979, 0.979, 0.981, 0.982, 0.982, 0.984, 0.984, 0.985],
    [0.975, 0.976, 0.978, 0.978, 0.979, 0.981, 0.981, 0.982, 0.983, 0.984],
    [0.973, 0.975, 0.976, 0.977, 0.978, 0.980, 0.980, 0.981, 0.982, 0.983],
    [0.972, 0.973, 0.975, 0.975, 0.977, 0.979, 0.979, 0.980, 0.981, 0.982],
    [0.970, 0.972, 0.974, 0.974, 0.976, 0.977, 0.978, 0.979, 0.980, 0.981],
    [0.969, 0.970, 0.972, 0.973, 0.974, 0.976, 0.977, 0.978, 0.978, 0.980] // 30°C
  ]
};

const DataTableModals = ({ showShellFactors, showPressureFactors, showHeightCapacity, showVCFTable, onOpenChange, selectedTank }: DataTableModalsProps) => {
  const dataObj = selectedTank === 'tank2' ? heightCapacityDataTank2 : heightCapacityDataTank1;
  const tankData: [number, number][] = Object.entries(dataObj).map(([height, capacity]) => [
    Number(height),
    capacity as number,
  ]);
  const description = tankDetails[selectedTank];

  return (
    <>
      {/* Shell Correction Factors Modal */}
      <Dialog open={showShellFactors} onOpenChange={(open) => onOpenChange('shell', open)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Shell Correction Factors</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Shell correction factors are applied based on tank shell temperature to account for thermal expansion.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Temperature (°C)</TableHead>
                  <TableHead>Shell Correction Factor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shellFactors.map(([temp, factor]) => (
                  <TableRow key={temp}>
                    <TableCell>{temp}</TableCell>
                    <TableCell>{factor.toFixed(6)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pressure Factors Modal */}
      <Dialog open={showPressureFactors} onOpenChange={(open) => onOpenChange('pressure', open)}>
        <DialogContent className="max-w-xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Pressure Correction Factors</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Pressure correction factors (PCF) are applied based on tank pressure to account for pressure effects.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Temperature (°C)</TableHead>
                  <TableHead>Correction Factor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pressureFactors.map(([temp, factor]) => (
                  <TableRow key={temp}>
                    <TableCell>{temp}</TableCell>
                    <TableCell>{factor.toFixed(6)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Temperature (VCF) Table Modal */}
      <Dialog open={showVCFTable} onOpenChange={(open) => onOpenChange('vcf', open)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Product Temperature (VCF) Table</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Volume correction factors based on density and temperature.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Temp (°C)</TableHead>
                  {volumeCorrectionFactors.densities.map((d) => (
                    <TableHead key={d}>{d.toFixed(3)}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {volumeCorrectionFactors.temperatures.map((temp, i) => (
                  <TableRow key={temp}>
                    <TableCell>{temp.toFixed(1)}</TableCell>
                    {volumeCorrectionFactors.factors[i].map((factor, j) => (
                      <TableCell key={j}>{factor.toFixed(3)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Height↔Capacity Table Modal */}
      <Dialog open={showHeightCapacity} onOpenChange={(open) => onOpenChange('height', open)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Height ↔ Capacity Table</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {description.map((item, index) => (
                <div key={index}>
                  <strong>{item.label}:</strong> {item.value}
                </div>
              ))}
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Height (mm)</TableHead>
                  <TableHead>Capacity (L)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tankData.map(([height, capacity], index) => (
                  <TableRow key={index}>
                    <TableCell>{height}</TableCell>
                    <TableCell>{capacity.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DataTableModals;