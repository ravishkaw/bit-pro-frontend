import { capitalize, formatText } from "./textUtils";
import dayjs from "dayjs";

// Get label from data array that formatted to select tag options
const getLabel = (dataArray, value) =>
  dataArray.find((data) => data.value === value)?.label || value;

// Format the date
const dateFormat = (value) => dayjs(value).format("YYYY-MM-DD");

// Get changed form values for confirmation modal
export const getChangedFieldValues = (
  initialData,
  updatedData,
  additionalData = {}
) => {
  return Object.keys(updatedData)
    .filter(
      (key) =>
        JSON.stringify(initialData[key]) !== JSON.stringify(updatedData[key])
    )
    .map((key) => {
      let formattedKey = formatText(key);
      let initialValue = initialData[key];
      let updatedValue = updatedData[key];

      // Format dob
      if (key === "dob") {
        formattedKey = "Date of Birth";
        initialValue = dateFormat(initialValue);
        updatedValue = dateFormat(updatedValue);
      }
      // format gender , civil status
      else if (key === "gender" || key === "civilStatus") {
        initialValue = capitalize(formatText(initialValue));
        updatedValue = capitalize(formatText(updatedValue));
      }
      // format status (false to inactive, true to active)
      else if (key === "accountStatus" || key === "status") {
        initialValue = initialValue ? "Active" : "Inactive";
        updatedValue = updatedValue ? "Active" : "Inactive";
      }
      // format designation
      else if (key === "designation") {
        const designations = additionalData?.designations || [];
        initialValue = getLabel(designations, initialValue);
        updatedValue = getLabel(designations, updatedValue);
      }
      // remove passwords
      else if (key === "password" || key === "retypePassword") {
        initialValue = "*********";
        updatedValue = "*********";
      }
      // format roles
      else if (key === "role") {
        const roles = additionalData?.roles || [];
        const initialRoleIds = [...initialValue].sort();
        const updatedRoleIds = [...updatedValue].sort();

        // Map IDs to role labels
        initialValue = initialRoleIds
          .map((id) => getLabel(roles, id))
          .join(", ");
        updatedValue = updatedRoleIds
          .map((id) => getLabel(roles, id))
          .join(", ");
      }
      // format date range
      else if (key === "dateRange") {
        initialValue = initialValue.map((value) => dateFormat(value));
        updatedValue = updatedValue.map((value) => dateFormat(value));
      }

      return `${capitalize(
        formattedKey
      )} changed from "${initialValue}" to "${updatedValue}"`;
    });
};

// Trigger form validation
export const triggerFormFieldsValidation = (form) => {
  setTimeout(() => form.validateFields(), 0);
};
