"use client";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";

function MyThemeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  return (
    <button
      className="mt-16 px-4 py-2 text-white dark:text-black bg-black dark:bg-white font-semibold rounded-md"
      onClick={() => {
        window.localStorage.setItem("theme", theme);
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "dark" ? "light" : "dark"}
    </button>
  );
}

export default MyThemeToggle;
