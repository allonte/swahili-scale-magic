import Header from "@/components/Header";

const TankView = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Tank view</h1>
        <img
          src="/uganda tank 1.jpg"
          alt="Tank view"
          className="w-full rounded-lg"
        />
      </main>
    </div>
  );
};

export default TankView;
