import { capitalize } from "./textUtils";

// Helper function to map data for select dropdowns
export const mapToSelectOptions = (data) =>
  data.map((item) => ({
    value: item.id,
    label:
      capitalize(item.name) ||
      item.fullName ||
      item.number ||
      item.itemName,
  }));

// Get greeting based on hour of the day
export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning!";
  if (hour < 15) return "Good Afternoon!";
  return "Good Evening!";
};
