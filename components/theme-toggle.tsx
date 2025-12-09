"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      const darkMode = saved === "dark";
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(darkMode);
      document.documentElement.classList.toggle("dark", darkMode);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-14 h-7 flex items-center rounded-full
        transition-colors duration-300 cursor-pointer
        ${isDark ? "bg-gray-700" : "bg-yellow-300"}
      `}
    >
      {/* Sliding Circle */}
      <span
        className={`
          absolute w-6 h-6 rounded-full bg-white flex items-center justify-center
          transition-transform duration-150 transform
          ${isDark ? "translate-x-1" : "translate-x-7"}
        `}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-gray-700" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </span>
    </button>
  );
}
