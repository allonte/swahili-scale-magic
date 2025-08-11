import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          <span className="font-semibold text-foreground">Murban Engineering</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">Help</Button>
          <Button variant="ghost" size="sm">About / Calibration</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;