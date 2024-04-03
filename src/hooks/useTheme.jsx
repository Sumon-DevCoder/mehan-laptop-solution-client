import { useEffect, useState } from "react";

const useTheme = () => {
  const [mode, setMode] = useState("light");

  const ChangedTheme = () => {
    const html = document.documentElement;

    if (mode == "light") {
      html.classList.remove("light");
      html.classList.add("dark");
      localStorage.setItem("mode", "dark");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
      localStorage.setItem("mode", "light");
    }
  };

  useEffect(() => {
    const currentMode = localStorage.getItem("mode") || "light";
    if (currentMode) {
      setMode(currentMode);
      document.documentElement.classList.add(currentMode);
    }
  }, []);

  return { ChangedTheme, mode };
};

export default useTheme;
