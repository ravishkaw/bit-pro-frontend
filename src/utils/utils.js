import { capitalize } from "./textUtils";

// Helper function to map data for select dropdowns
export const mapToSelectOptions = (data) =>
  data.map((item) => ({
    value: item.id,
    label:
      capitalize(item.name) ||
      item.fullName ||
      item.roomNumber ||
      item.itemName,
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

// Get greeting based on hour of the day
export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning!";
  if (hour < 15) return "Good Afternoon!";
  return "Good Evening!";
};
