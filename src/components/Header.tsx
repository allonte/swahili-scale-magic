import { Link } from "react-router-dom";
import AboutCalibrationDialog from "./AboutCalibrationDialog";
import HelpDialog from "./HelpDialog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/murbanlogo.jpg"
            alt="Murban logo"
            className="w-12 h-12 object-contain rounded"
          />
          <span className="font-bold text-foreground">Murban Engineering</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden sm:flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/tank-view">Tank view</Link>
            </Button>
            <AboutCalibrationDialog />
            <HelpDialog />
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-6">
                <Button variant="ghost" asChild>
                  <Link to="/tank-view">Tank view</Link>
                </Button>
                <AboutCalibrationDialog />
                <HelpDialog />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
