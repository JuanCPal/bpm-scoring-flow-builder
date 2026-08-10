"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle({ className = "" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";
  const label = !mounted
    ? "Cambiar tema"
    : isDark
      ? "Cambiar a claro"
      : "Cambiar a oscuro";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      disabled={!mounted}
      aria-pressed={mounted ? isDark : undefined}
      aria-label={label}
      title={label}
      className={`relative inline-flex h-8 w-12 items-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] p-[3px] text-[var(--muted)] transition hover:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-[3px] top-[3px] flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--accent)] shadow-sm transition-transform ${mounted && isDark ? "translate-x-4" : "translate-x-0"}`}
      >
        {mounted && isDark ? <FaMoon size={11} /> : <FaSun size={11} />}
      </span>
    </button>
  );
}
