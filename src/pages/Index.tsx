import Header from "@/components/Header";
import CalculatorForm from "@/components/CalculatorForm";
import TankDescription from "@/components/TankDescription";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Total Energies Uganda</h1>
          <h2 className="text-2xl font-semibold text-primary mb-1">Tank Mass Calculator</h2>
          <p className="text-muted-foreground">Tank 01 — LPG Bullet Tank (Jinja, Uganda)</p>
          <img
            src="/uganda%20tank%201.jpg"
            alt="Uganda tank"
            className="mt-4 w-full rounded-lg"
          />
        </div>
        
        <div className="space-y-8">
          <CalculatorForm />
          <TankDescription />
        </div>
      </main>
    </div>
  );
};

export default Index;
