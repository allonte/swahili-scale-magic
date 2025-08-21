import AboutCalibrationDialog from "./AboutCalibrationDialog";
import HelpDialog from "./HelpDialog";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/murbanlogo.jpg"
            alt="Murban logo"
             className="w-8 h-8 object-cover rounded"
            className="w-18 h-18 object-contain"
          />
          <span className="font-semibold text-foreground">Total Energies Uganda</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/tank-view" className="text-sm font-medium text-foreground hover:text-primary">
            Tank view
          </Link>
          <HelpDialog />
          <AboutCalibrationDialog />
        </div>
      </div>
    </header>
  );
};

export default Header;
