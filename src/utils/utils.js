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
