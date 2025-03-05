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
      // format status name of room type
      else if (
        key === "statusName" &&
        (additionalData?.module == "Room Type" ||
          additionalData?.module == "Room Facility")
      ) {
        formattedKey = "Status";
        initialValue = initialValue ? "Available" : "Unavailable";
        updatedValue = updatedValue ? "Available" : "Unavailable";
      }
      // format status (false to inactive, true to active)
      else if (
        key === "accountStatus" ||
        key === "status" ||
        key === "statusName"
      ) {
        formattedKey = "Status";
        initialValue = initialValue ? "Active" : "Inactive";
        updatedValue = updatedValue ? "Active" : "Inactive";
      }
      // format gender
      else if (key === "genderId") {
        const gender = additionalData?.genders || [];
        initialValue = getLabel(gender, initialValue);
        updatedValue = getLabel(gender, updatedValue);
      }
      // format idType
      else if (key === "idTypeId") {
        const idType = additionalData?.idTypes || [];
        initialValue = getLabel(idType, initialValue);
        updatedValue = getLabel(idType, updatedValue);
      }
      // format nationalities
      else if (key === "nationalitiesName") {
        const nationalities = additionalData?.nationalities || [];
        initialValue = getLabel(nationalities, initialValue);
        updatedValue = getLabel(nationalities, updatedValue);
      }
      // format civilStatus
      else if (key === "civilStatusId") {
        const civilStatus = additionalData?.civilStatus || [];
        initialValue = getLabel(civilStatus, initialValue);
        updatedValue = getLabel(civilStatus, updatedValue);
      }
      // format designation
      else if (key === "designationId") {
        const designations = additionalData?.designations || [];
        initialValue = getLabel(designations, initialValue);
        updatedValue = getLabel(designations, updatedValue);
      }
      // format employeeStatus
      else if (key === "employeeStatusId") {
        const employeeStatus = additionalData?.employeeStatus || [];
        initialValue = getLabel(employeeStatus, initialValue);
        updatedValue = getLabel(employeeStatus, updatedValue);
      }
      // remove passwords
      else if (key === "password" || key === "retypePassword") {
        initialValue = "*********";
        updatedValue = "*********";
      }
      // format roles
      else if (key === "roleId") {
        formattedKey = "Roles";
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
