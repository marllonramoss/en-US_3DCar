"use client";

import { useCar } from "@/context/CarContext";

export default function CarSelector() {
  const { availableCars, selectedCar, setSelectedCar } = useCar();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md p-4">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-white text-sm font-medium text-center mb-3">
          Select Your Car
        </h3>
        <div className="flex justify-center gap-4">
          {availableCars.map((car) => (
            <button
              key={car.id}
              onClick={() => setSelectedCar(car)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCar.id === car.id
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {car.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
