import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const info = [
  {
    label: "Address",
    value: "Tudor, Tom Mboya, P.O. BOX 99215-80100, Mombasa Kenya",
  },
  { label: "City/Town", value: "Mombasa" },
  { label: "Telephone Number", value: "+ 254 20 265 0617/8" },
  { label: "Email Address", value: "info@murban-eng.com" },
  { label: "Website", value: "https://murban-eng.com/" },
  { label: "Category", value: "Engineers and Engineering Firms" },
];

const HelpDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Help
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Murban engineering</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {info.map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              {item.label === "Website" ? (
                <a
                  href={item.value}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {item.value}
                </a>
              ) : (
                <span className="font-medium">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;

