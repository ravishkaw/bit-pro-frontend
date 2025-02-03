import { capitalize, formatText } from "./textUtils";
import dayjs from "dayjs";

// in form modal edit mode, get the changed values of the form and return it to confirmation modal
export const getChangedFieldValues = (
  initialData,
  updatedData,
  personType,
  designations
) => {
  const changes = [];

  Object.keys(updatedData).forEach((key) => {
    const initialValue = initialData[key];
    const updatedValue = updatedData[key];

    if (initialValue !== updatedValue) {
      let formattedKey = formatText(key);

      let initialDisplayValue = initialValue;
      let updatedDisplayValue = updatedValue;

      if (key === "dob") {
        formattedKey = "Date of Birth";
        initialDisplayValue = dayjs(initialValue).format("YYYY-MM-DD");
        updatedDisplayValue = dayjs(updatedValue).format("YYYY-MM-DD");
      }

      if (key === "gender" || key === "civilStatus") {
        initialDisplayValue = capitalize(formatText(initialValue));
        updatedDisplayValue = capitalize(formatText(updatedValue));
      }

      if (personType === "employee" && key === "designation") {
        designations.forEach((designation) => {
          if (updatedValue === designation.value) {
            updatedDisplayValue = designation.label;
          }
          if (initialValue === designation.value) {
            initialDisplayValue = designation.label;
          }
        });
      }

      const changeMessage = `${capitalize(
        formattedKey
      )} changed from "${initialDisplayValue}" to "${updatedDisplayValue}"`;

      changes.push(changeMessage);
    }
  });

  return changes;
};

export const triggerFormFieldsValidation = (form) => {
  setTimeout(() => {
    form.validateFields();
  }, 0);
};
