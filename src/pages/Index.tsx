import { useState } from "react";
import Header from "@/components/Header";
import CalculatorForm from "@/components/CalculatorForm";
import TankDescription from "@/components/TankDescription";

const Index = () => {
  const [selectedTank, setSelectedTank] = useState<'tank1' | 'tank2'>('tank1');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {selectedTank === "tank1" ? "Total Energies Uganda" : "Total Energies Uganda"}
          </h1>
          <h2 className="text-2xl font-semibold text-black mb-1">Tank Mass Calculator</h2>
          <p className="text-muted-foreground">
            {selectedTank === "tank1"
              ? "Tank 01 — LPG Bullet Tank (Jinja, Uganda)"
              : "Tank 02 — LPG Bullet Tank (Jinja, Uganda)"}
          </p>
        </div>

        <div className="space-y-8">
          <CalculatorForm
            selectedTank={selectedTank}
            onTankChange={setSelectedTank}
          />
          <TankDescription selectedTank={selectedTank} />
        </div>
      </main>
    </div>
  );
};

export default Index;
