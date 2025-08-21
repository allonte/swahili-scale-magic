import AboutCalibrationDialog from "./AboutCalibrationDialog";
import HelpDialog from "./HelpDialog";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex flex-col items-center gap-1">
          <img
            src="/murbanlogo.jpg"
            alt="Murban logo"
            className="w-16 h-16 object-contain rounded"
          />
          <span className="font-bold text-foreground">Murban</span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-4">
            <AboutCalibrationDialog />
            <HelpDialog />
          </div>
          <Link to="/tank-view" className="text-sm font-medium text-foreground hover:text-primary">
            Tank view
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
