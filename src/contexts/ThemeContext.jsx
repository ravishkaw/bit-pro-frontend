import { createContext, useContext, useState } from "react";

// create theme context
const ThemeContext = createContext();

// Provider to handle user auth
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to easily use theme context
export const useThemeContext = () => useContext(ThemeContext);
