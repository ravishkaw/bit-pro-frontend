import { useState, createContext, useContext } from "react";

// Context to manage the app header title
const HeaderTitleContext = createContext();

// Provider to update the header title based on the selected sider item
export const HeaderTitleProvider = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState("Villa Water Lilly"); // Default title

  // Function to find the label for the selected key in sider items
  const findLabel = (key, items) => {
    const searchLabel = (items, key) => {
      for (const item of items) {
        // If key matches, return the label
        if (item.key === key) return item.label;

        // If item has children, search recursively
        if (item.children) {
          const foundLabel = searchLabel(item.children, key);
          if (foundLabel) return foundLabel;
        }
      }
      return "Villa Waterlilly"; // Default if no match
    };

    // Update header title with the found label
    const label = searchLabel(items, key);
    setHeaderTitle(label);
  };

  // Pass header title and findLabel function to the app
  return (
    <HeaderTitleContext.Provider value={{ headerTitle, findLabel }}>
      {children}
    </HeaderTitleContext.Provider>
  );
};

// Hook to easily use the header title context
export const useHeaderTitleContext = () => useContext(HeaderTitleContext);
