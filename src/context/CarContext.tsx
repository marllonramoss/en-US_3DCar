"use client";

import React, { createContext, useContext, useState } from "react";

interface CarModel {
  id: string;
  name: string;
  path: string;
  thumbnail: string;
}

interface CarContextType {
  bodyColor: string;
  setBodyColor: (color: string) => void;
  selectedCar: CarModel;
  setSelectedCar: (car: CarModel) => void;
  availableCars: CarModel[];
}

const availableCars: CarModel[] = [
  {
    id: "vayanne",
    name: "Deus Vayanne",
    path: "/Vayanne.glb",
    thumbnail: "/car-thumbnail.jpg", // You'll need to add this image
  },
  {
    id: "byd",
    name: "BYD",
    path: "/byd.glb",
    thumbnail: "/byd-thumbnail.jpg", // You'll need to add this image
  },
  // Add more cars here when available
];

const CarContext = createContext<CarContextType | undefined>(undefined);

export function CarProvider({ children }: { children: React.ReactNode }) {
  const [bodyColor, setBodyColor] = useState("#808080"); // Initial gray color
  const [selectedCar, setSelectedCar] = useState(availableCars[0]);

  return (
    <CarContext.Provider
      value={{
        bodyColor,
        setBodyColor,
        selectedCar,
        setSelectedCar,
        availableCars,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

export function useCar() {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error("useCar must be used within a CarProvider");
  }
  return context;
}
