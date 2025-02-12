import { useState, createContext, useContext } from "react";

const HeaderTitleContext = createContext();

// Based on the sider content selected, show the app header title
export const HeaderTitleProvider = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState("Villa Water Lilly");

  // Find the label from sider items and set it as header title
  const findLabel = (key, items) => {
    const searchLabel = (items, key) => {
      for (const item of items) {
        // return label from top level
        if (item.key === key) {
          return item.label;
        }
        // Nested search for type = group / nested menu items
        if (item.children) {
          const foundLabel = searchLabel(item.children, key);
          if (foundLabel) {
            return foundLabel;
          }
        }
      }
      return "Villa Waterlilly"; // Default label
    };

    const label = searchLabel(items, key);
    setHeaderTitle(label);
  };

  return (
    <HeaderTitleContext.Provider value={{ headerTitle, findLabel }}>
      {children}
    </HeaderTitleContext.Provider>
  );
};

export const useHeaderTitleContext = () => useContext(HeaderTitleContext);
