import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">Help</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact Information</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <p>
                  <strong>Address:</strong> Tudor, Tom Mboya, P.O. BOX 99215-80100,
                  Mombasa Kenya
                </p>
                <p>
                  <strong>City/Town:</strong> Mombasa
                </p>
                <p>
                  <strong>Telephone Number:</strong> + 254 20 265 0617/8
                </p>
                <p>
                  <strong>Email Address:</strong> info@murban-eng.com
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://murban-eng.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://murban-eng.com/
                  </a>
                </p>
                <p>
                  <strong>Category:</strong> Engineers and Engineering Firms
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="sm">About / Calibration</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
