"use client";

import { useCar } from "@/context/CarContext";
import { useState } from "react";

const colors = [
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#000000", // Black
  "#FFFFFF", // White
  "#808080", // Gray
  "#800000", // Maroon
  "#008000", // Dark Green
  "#000080", // Navy
  "#808000", // Olive
  "#800080", // Purple
  "#008080", // Teal
  "#FFA500", // Orange
  "#A52A2A", // Brown
  "#DDA0DD", // Plum
  "#F0E68C", // Khaki
  "#E6E6FA", // Lavender
];

export default function ColorSidebar() {
  const { bodyColor, setBodyColor } = useCar();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`fixed left-0 top-0 h-full transition-all duration-300 ease-in-out ${
        isHovered ? "w-40" : "w-10"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full">
        {/* Blurred background */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />

        {/* Content */}
        <div className="relative h-full p-2 flex flex-col items-center gap-2">
          <h2
            className={`text-white font-bold text-xs transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Cor do Carro
          </h2>
          <div className="grid grid-cols-2 gap-1 w-full">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setBodyColor(color)}
                className={`w-full aspect-square rounded-sm transition-transform hover:scale-110 ${
                  bodyColor === color ? "ring-1 ring-white" : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
