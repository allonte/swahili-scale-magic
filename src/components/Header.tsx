import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <img
          src="/murban-logo.svg"
          alt="Murban Engineering logo"
          className="h-10 w-auto"
        />
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">Help</Button>
          <Button variant="ghost" size="sm">About / Calibration</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;