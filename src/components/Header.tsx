import { Link } from "react-router-dom";
import AboutCalibrationDialog from "./AboutCalibrationDialog";
import HelpDialog from "./HelpDialog";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/murbanlogo.jpg"
            alt="Murban logo"
            className="w-16 h-16 object-contain rounded"
          />
          <span className="font-bold text-foreground">Murban Engineering</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/tank-view">Tank view</Link>
          </Button>
          <AboutCalibrationDialog />
          <HelpDialog />
        </nav>
      </div>
    </header>
  );
};

export default Header;
