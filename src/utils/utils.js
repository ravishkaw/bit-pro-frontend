// Helper function to map data for select dropdowns
export const mapToSelectOptions = (data) =>
  data.map((item) => ({
    value: item.id,
    label: item.name || item.fullName, // add fullName for user otherwise use name
  }));
