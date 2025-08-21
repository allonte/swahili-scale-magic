import Header from "@/components/Header";

const TankView = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Tank view</h1>
        <div className="relative">
          <img
            src="/uganda-tank1.jpg"
            alt="Tank view"
            className="w-full rounded-lg"
          />
          <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded shadow text-sm font-medium">
            TANK 1
          </span>
        </div>
      </main>
    </div>
  );
};

export default TankView;
