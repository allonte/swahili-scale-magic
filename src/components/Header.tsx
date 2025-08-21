import { Button } from "@/components/ui/button";
import AboutCalibrationDialog from "./AboutCalibrationDialog";

const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/murbanlogo.jpg"
            alt="Murban logo"
            className="w-8 h-8 object-cover rounded"
          />
          <span className="font-semibold text-foreground">Total Energies Uganda</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">Help</Button>
          <AboutCalibrationDialog />
        </div>
      </div>
    </header>
  );
};

export default Header;
