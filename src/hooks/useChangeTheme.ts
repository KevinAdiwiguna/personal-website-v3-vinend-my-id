"use client";

import { useEffect, useState } from "react";

export const useChangeTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      if (!theme) {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
        setIsDark(true);
      } else if (theme === "dark") {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window !== "undefined") {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsDark(false);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDark(true);
      }
    }
  };

  return { toggleTheme, isDark };
};
