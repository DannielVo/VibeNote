import React, { useCallback, useEffect, useRef, useState } from "react";

const useDarkMode = () => {
  //   let localTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const themeIconMobile = useRef(null);
  const themeToggleDesktop = useRef(null);

  const toggleTheme = useCallback(() => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      if (themeIconMobile.current) {
        themeIconMobile.current.className = "bx bx-moon";
      }
      if (themeToggleDesktop.current) {
        themeToggleDesktop.current.className = "bx bx-moon";
      }
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      if (themeIconMobile.current) {
        themeIconMobile.current.className = "bx bx-sun";
      }
      if (themeToggleDesktop.current) {
        themeToggleDesktop.current.className = "bx bx-sun";
      }
    }
  }, [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("darkmode");
    } else {
      document.body.classList.remove("darkmode");
    }
  }, [theme]);

  return { themeIconMobile, themeToggleDesktop, toggleTheme };
};

export default useDarkMode;
