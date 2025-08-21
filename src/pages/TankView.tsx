import Header from "@/components/Header";

const TankView = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="relative">
          <img
            src="/tank1.jpg"
            alt="Tank 1 view"
            className="w-full rounded-lg"
          />
          <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded shadow text-sm font-medium">
            TANK 1
          </span>
        </div>
        <div className="relative mt-8">
          <img
            src="/tank2.jpg"
            alt="Tank 2 view"
            className="w-full rounded-lg"
          />
          <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded shadow text-sm font-medium">
            TANK 2
          </span>
        </div>
      </main>
    </div>
  );
};

export default TankView;
