// Format key text to normal text - firstName -> first name
export const formatText = (text) => {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .toLowerCase();
};

// Capitalize the first letter
export const capitalize = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);
