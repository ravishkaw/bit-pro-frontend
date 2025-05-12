import { capitalize, formatText } from "./textUtils";
import dayjs from "dayjs";

// Get changed form values for confirmation modal
export const getChangedFieldValues = (
  initialData,
  updatedData,
  additionalData = {}
) => {
  return Object.keys(updatedData)
    .filter((key) =>
      areValuesDifferent(initialData[key], updatedData[key], key)
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
        formattedKey = "Gender";
        const gender = additionalData?.genders || [];
        initialValue = getLabel(gender, initialValue);
        updatedValue = getLabel(gender, updatedValue);
      }
      // format idType
      else if (key === "idTypeId") {
        formattedKey = "ID Type";
        const idType = additionalData?.idTypes || [];
        initialValue = getLabel(idType, initialValue);
        updatedValue = getLabel(idType, updatedValue);
      }
      // format nationalities
      else if (key === "nationalitiesName") {
        formattedKey = "Nationalities";
        const nationalities = additionalData?.nationalities || [];
        initialValue = getLabel(nationalities, initialValue);
        updatedValue = getLabel(nationalities, updatedValue);
      }
      // format civilStatus
      else if (key === "civilStatusId") {
        formattedKey = "Civil Status";
        const civilStatus = additionalData?.civilStatus || [];
        initialValue = getLabel(civilStatus, initialValue);
        updatedValue = getLabel(civilStatus, updatedValue);
      }
      // format id type
      else if (key === "titleId") {
        formattedKey = "Title";
        const titles = additionalData?.titles || [];
        initialValue = getLabel(titles, initialValue);
        updatedValue = getLabel(titles, updatedValue);
      }
      // format designation
      else if (key === "designationId") {
        formattedKey = "Designation";
        const designations = additionalData?.designations || [];
        initialValue = getLabel(designations, initialValue);
        updatedValue = getLabel(designations, updatedValue);
      }
      // format employeeStatus
      else if (key === "employeeStatusId") {
        formattedKey = "Employee Status";
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

        const initialRoleIds = Array.isArray(initialValue)
          ? initialValue
          : [initialValue].filter(Boolean);
        const updatedRoleIds = Array.isArray(updatedValue)
          ? updatedValue
          : [updatedValue].filter(Boolean);

        initialValue = initialRoleIds
          .map((id) => getLabel(roles, id))
          .sort()
          .join(", ");
        updatedValue = updatedRoleIds
          .map((id) => getLabel(roles, id))
          .sort()
          .join(", ");
      }
      // format date range
      else if (key === "dateRange") {
        // Handle null/undefined values
        initialValue = Array.isArray(initialValue)
          ? initialValue.map((value) => dateFormat(value)).join(" - ")
          : "";
        updatedValue = Array.isArray(updatedValue)
          ? updatedValue.map((value) => dateFormat(value)).join(" - ")
          : "";
      }
      // Format room type name
      else if (
        (key === "name" && additionalData.module === "Room Type") ||
        key === "roomTypeId"
      ) {
        formattedKey = "Room Type";
        const roomTypes =
          additionalData?.roomTypes || additionalData?.mappedRoomTypes || [];
        initialValue = getLabel(roomTypes, initialValue);
        updatedValue = getLabel(roomTypes, updatedValue);
      }
      // Format bed type name
      else if (key === "bedTypeId") {
        formattedKey = "Bed Type";
        const bedTypes = additionalData?.bedTypes || [];
        initialValue = getLabel(bedTypes, initialValue);
        updatedValue = getLabel(bedTypes, updatedValue);
      }
      // Format room facilities
      else if (key === "roomFacilityIds") {
        formattedKey = "Room Facilities";
        const facilities = additionalData?.mappedRoomFacilities || [];

        const initialFacilityIds = Array.isArray(initialValue)
          ? initialValue
          : [initialValue].filter(Boolean);
        const updatedFacilityIds = Array.isArray(updatedValue)
          ? updatedValue
          : [updatedValue].filter(Boolean);

        initialValue = initialFacilityIds
          .map((id) => getLabel(facilities, id))
          .sort()
          .join(", ");
        updatedValue = updatedFacilityIds
          .map((id) => getLabel(facilities, id))
          .sort()
          .join(", ");
      }
      // Format amenities
      else if (key === "amenities") {
        formattedKey = "Amenities";
        const mappedAmenities = additionalData?.amenities || [];
        initialValue = formatItemsWithQuantities(
          initialValue,
          mappedAmenities,
          "amenityId"
        );
        updatedValue = formatItemsWithQuantities(
          updatedValue,
          mappedAmenities,
          "amenityId"
        );
      }
      // Format event services
      else if (key === "eventServices") {
        formattedKey = "Event Services";
        const mappedServices = additionalData?.eventServices || [];
        initialValue = formatItemsWithQuantities(
          initialValue,
          mappedServices,
          "eventServiceId"
        );
        updatedValue = formatItemsWithQuantities(
          updatedValue,
          mappedServices,
          "eventServiceId"
        );
      }
      // Format adult no  key
      else if (key === "adultNo") {
        formattedKey = "Adults";
      }
      // Format child no key
      else if (key === "childNo") {
        formattedKey = "Children";
      }
      // Format infant no key
      else if (key === "infantNo") {
        formattedKey = "Infants";
      }
      // Format room status
      else if (key === "statusId") {
        formattedKey = "Room Status";
        const roomStatus = additionalData?.roomStatus || [];
        initialValue = getLabel(roomStatus, initialValue);
        updatedValue = getLabel(roomStatus, updatedValue);
      }
      // Format photo or image changes
      else if (key === "photo") {
        formattedKey = "Photo";
        // If it's a base64 string, show just the last 7 characters
        if (initialValue && initialValue.base64) {
          const base64String = initialValue.base64 || "";
          initialValue = base64String.slice(-7);
        } else if (typeof initialValue === "string") {
          initialValue = initialValue.slice(-7);
        }

        if (updatedValue && updatedValue.base64) {
          const base64String = updatedValue.base64 || "";
          updatedValue = base64String.slice(-7);
        } else if (typeof updatedValue === "string") {
          updatedValue = updatedValue.slice(-7);
        }
      }
      // task status
      else if (key === "taskStatusId") {
        formattedKey = "Task Status";
        const taskStatus = additionalData?.taskStatus || [];
        initialValue = getLabel(taskStatus, initialValue);
        updatedValue = getLabel(taskStatus, updatedValue);
      }
      // task type
      else if (key === "taskTypeId") {
        formattedKey = "Task Type";
        const taskType = additionalData?.taskTypes || [];
        initialValue = getLabel(taskType, initialValue);
        updatedValue = getLabel(taskType, updatedValue);
      }
      // task assigned to
      else if (key === "assignedToId") {
        formattedKey = "Assigned Employee";
        const assignedTo = additionalData?.employees || [];
        initialValue = getLabel(assignedTo, initialValue);
        updatedValue = getLabel(assignedTo, updatedValue);
      }
      // task room
      else if (key === "roomId") {
        formattedKey = "Room";
        const rooms = additionalData?.mappedRooms || [];
        initialValue = getLabel(rooms, initialValue);
        updatedValue = getLabel(rooms, updatedValue);
      }
      // preventive maintenance status
      else if (key === "maintenanceStatusId") {
        formattedKey = "Maintenance Status";
        const status = additionalData?.maintenanceStatus || [];
        initialValue = getLabel(status, initialValue);
        updatedValue = getLabel(status, updatedValue);
      }

      return `${capitalize(
        formattedKey
      )} changed from "${initialValue}" to "${updatedValue}"`;
    });
};

// Get label from data array that formatted to select tag options
const getLabel = (dataArray, value) =>
  dataArray.find((data) => data.value === value)?.label || value;

// Format the date
const dateFormat = (value) => dayjs(value).format("YYYY-MM-DD");

// Helper function to compare arrays with items that have quantities
const compareArraysWithQuantities = (arr1, arr2, idField) => {
  if (arr1.length !== arr2.length) return true;

  // Sort by ID field
  const sorted1 = [...arr1].sort((a, b) => a[idField] - b[idField]);
  const sorted2 = [...arr2].sort((a, b) => a[idField] - b[idField]);

  for (let i = 0; i < sorted1.length; i++) {
    if (
      sorted1[i][idField] !== sorted2[i][idField] ||
      sorted1[i].quantity !== sorted2[i].quantity
    ) {
      return true;
    }
  }
  return false;
};

// Helper function to check if values are different
const areValuesDifferent = (val1, val2, key) => {
  if (key === "amenities" && Array.isArray(val1) && Array.isArray(val2)) {
    return compareArraysWithQuantities(val1, val2, "amenityId");
  }

  if (key === "eventServices" && Array.isArray(val1) && Array.isArray(val2)) {
    return compareArraysWithQuantities(val1, val2, "eventServiceId");
  }

  // compare regular arrays
  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) return true;
    const sortedVal1 = [...val1].sort().toString();
    const sortedVal2 = [...val2].sort().toString();
    return sortedVal1 !== sortedVal2;
  }

  // Others, string comparison
  return JSON.stringify(val1) !== JSON.stringify(val2);
};

// Helper function to format arrays of items with quantities
const formatItemsWithQuantities = (items, mappedItems, idField) => {
  if (!Array.isArray(items)) return "None";

  return items
    .map((item) => {
      const mappedItem = mappedItems.find((m) => m.id === item[idField]);
      return mappedItem
        ? `${mappedItem.name} (${item.quantity})`
        : `ID: ${item[idField]} (${item.quantity})`;
    })
    .sort()
    .join(", ");
};

// Trigger form validation
export const triggerFormFieldsValidation = (form) => {
  setTimeout(() => form.validateFields(), 0);
};
