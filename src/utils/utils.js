import { capitalize } from "./textUtils";

// Helper function to map data for select dropdowns
export const mapToSelectOptions = (data) =>
  data.map((item) => ({
    value: item.id,
    label: capitalize(item.name) || item.fullName, // add fullName for user otherwise use name
  }));

// Helper function to map data where the value and label are both the name
export const mapNameToSelectOptions = (data) =>
  data.map((item) => ({
    value: item.name,
    label: item.name,
  }));

// Helper function to get the level of keys of sider items
export const getLevelKeys = (items) => {
  const key = {};
  const func = (items, level = 1) => {
    items.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items);
  return key;
};
