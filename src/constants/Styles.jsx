import { useThemeContext } from "../contexts/ThemeContext";

const Styles = () => {
  const { isDarkMode } = useThemeContext();

  // box shadow property based on dark mode
  const boxShadow = {
    boxShadow: isDarkMode
      ? "0 .25rem .875rem 0 rgba(16,17,33,.26)"
      : "0 .25rem .875rem 0 rgba(38,43,67,.16)",
  };

  return { boxShadow };
};

export default Styles;
