import { createContext, useContext, useState } from "react";

// create theme context
const ThemeContext = createContext();

// to handle theme
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkThemeEnabled")) || false
  );

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem("darkThemeEnabled", JSON.stringify(!prev));
      return !prev;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
