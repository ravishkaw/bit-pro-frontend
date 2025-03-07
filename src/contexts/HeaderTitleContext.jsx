import { useState, createContext, useContext } from "react";

// Context to manage the app header title
const HeaderTitleContext = createContext();

// update the header title based on the selected sider item
export const HeaderTitleProvider = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState("Villa Water Lilly"); // Default title

  // Function to find the label for the selected key in sider items
  const findLabel = (key, items) => {
    const defaultTitle = "Villa Waterlilly";

    // search for matching key in menu items
    const searchLabel = (items, targetKey) => {
      // Handle case when items is undefined or empty
      if (!items || items.length === 0) {
        return null;
      }

      // Find item with matching key
      const matchingItem = items.find((item) => item.key === targetKey);
      if (matchingItem) {
        return matchingItem.label;
      }

      // search in children of all items
      for (const item of items) {
        if (item.children && item.children.length > 0) {
          const foundLabel = searchLabel(item.children, targetKey);
          if (foundLabel) {
            return foundLabel;
          }
        }
      }

      return null; // No match
    };

    // Search for label and update header title
    const foundLabel = searchLabel(items, key);
    setHeaderTitle(foundLabel || defaultTitle);
  };

  return (
    <HeaderTitleContext.Provider value={{ headerTitle, findLabel }}>
      {children}
    </HeaderTitleContext.Provider>
  );
};

export const useHeaderTitleContext = () => useContext(HeaderTitleContext);
