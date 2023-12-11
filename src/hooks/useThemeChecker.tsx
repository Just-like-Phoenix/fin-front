import { useEffect, useState } from "react";

export function useThemeChecker() {
  const [preferredTheme, setPreferredTheme] = useState("light");

  useEffect(() => {
    console.log(preferredTheme);
    setPreferredTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }, [preferredTheme]);

  return preferredTheme;
}
