"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []); // espera a que el componente se monte

  if (!mounted) return null; // evita render prematuro

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 transition-colors duration-300 ease-in-out"
    >
      {theme === "dark" ? "🌞 Claro" : "🌙 Oscuro"}
    </button>
  );
}