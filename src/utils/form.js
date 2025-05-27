import { capitalize, formatText } from "./textUtils";
import dayjs from "dayjs";

// Define formatters for different field types
const fieldFormatters = {
  // Date formatters
  dob: {
    label: "Date of Birth",
    format: (value) => dateFormat(value),
  },
  checkInDate: {
    label: "Actual Check-in Date",
    format: (value) => (value ? dateFormat(value) : "Not checked in"),
  },
  checkOutDate: {
    label: "Actual Check-out Date",
    format: (value) => (value ? dateFormat(value) : "Not checked out"),
  },
  reservedCheckInDate: {
    label: "Reserved Check-in Date",
    format: (value) => dateFormat(value),
  },
  reservedCheckOutDate: {
    label: "Reserved Check-out Date",
    format: (value) => dateFormat(value),
  },
  dateRange: {
    format: (value) =>
      Array.isArray(value) ? value.map((v) => dateFormat(v)).join(" - ") : "",
  },

  // Status formatters
  accountStatus: {
    label: "Status",
    format: (value) => (value ? "Active" : "Inactive"),
  },
  status: {
    label: "Status",
    format: (value) => (value ? "Active" : "Inactive"),
  },
  statusName: {
    label: "Status",
    format: (value) => (value ? "Active" : "Inactive"),
  },

  // ID/lookup based formatters
  genderId: {
    label: "Gender",
    format: (value, data) => getLabel(data?.genders || [], value),
  },
  idTypeId: {
    label: "ID Type",
    format: (value, data) => getLabel(data?.idTypes || [], value),
  },
  nationalitiesName: {
    label: "Nationalities",
    format: (value, data) => getLabel(data?.nationalities || [], value),
  },
  civilStatusId: {
    label: "Civil Status",
    format: (value, data) => getLabel(data?.civilStatus || [], value),
  },
  titleId: {
    label: "Title",
    format: (value, data) => getLabel(data?.titles || [], value),
  },
  designationId: {
    label: "Designation",
    format: (value, data) => getLabel(data?.designations || [], value),
  },
  employeeStatusId: {
    label: "Employee Status",
    format: (value, data) => getLabel(data?.employeeStatus || [], value),
  },
  taskStatusId: {
    label: "Task Status",
    format: (value, data) => getLabel(data?.taskStatus || [], value),
  },
  taskTypeId: {
    label: "Task Type",
    format: (value, data) => getLabel(data?.taskTypes || [], value),
  },
  assignedToId: {
    label: "Assigned Employee",
    format: (value, data) => getLabel(data?.employees || [], value),
  },
  roomId: {
    label: "Room",
    format: (value, data) => getLabel(data?.mappedRooms || [], value),
  },
  maintenanceStatusId: {
    label: "Maintenance Status",
    format: (value, data) => getLabel(data?.maintenanceStatus || [], value),
  },
  primaryGuestId: {
    label: "Primary Guest",
    format: (value, data) => getLabel(data?.mappedGuests || [], value),
  },
  roomPackageId: {
    label: "Room Package",
    format: (value, data) => getLabel(data?.mappedRoomPackages || [], value),
  },
  reservationTypeId: {
    label: "Reservation Type",
    format: (value, data) => getLabel(data?.reservationTypes || [], value),
  },
  paymentMethodId: {
    label: "Payment Method",
    format: (value, data) => getLabel(data?.paymentMethods || [], value),
  },
  bedTypeId: {
    label: "Bed Type",
    format: (value, data) => getLabel(data?.bedTypes || [], value),
  },
  statusId: {
    label: "Room Status",
    format: (value, data) => getLabel(data?.roomStatus || [], value),
  },

  // Password fields
  password: {
    format: () => "*********",
  },
  retypePassword: {
    format: () => "*********",
  },

  // Special fields
  photo: {
    label: "Photo",
    format: (value) => {
      if (value && value.base64) {
        return value.base64.slice(-7);
      } else if (typeof value === "string") {
        return value.slice(-7);
      }
      return value;
    },
  },

  // Field count labels
  adultNo: { label: "Adults" },
  childNo: { label: "Children" },
  infantNo: { label: "Infants" },

  // Complex array fields
  roleId: {
    label: "Roles",
    format: (value, data) => {
      const roles = data?.roles || [];
      const roleIds = Array.isArray(value) ? value : [value].filter(Boolean);
      return roleIds
        .map((id) => getLabel(roles, id))
        .sort()
        .join(", ");
    },
  },
  roomFacilityIds: {
    label: "Room Facilities",
    format: (value, data) => {
      const facilities = data?.mappedRoomFacilities || [];
      const facilityIds = Array.isArray(value)
        ? value
        : [value].filter(Boolean);
      return facilityIds
        .map((id) => getLabel(facilities, id))
        .sort()
        .join(", ");
    },
  },
  guestIds: {
    label: "Additional Guests",
    format: (value, data) => {
      const guests = data?.mappedGuests || [];
      if (!Array.isArray(value) || value.length === 0) return "None";
      return value
        .map((id) => getLabel(guests, id))
        .filter(Boolean)
        .sort()
        .join(", ");
    },
  },
  childIds: {
    label: "Child Guests",
    format: (value, data) => {
      const children = data?.mappedChildren || [];
      if (!Array.isArray(value) || value.length === 0) return "None";
      return value
        .map((id) => getLabel(children, id))
        .filter(Boolean)
        .sort()
        .join(", ");
    },
  },

  // Items with quantities
  amenities: {
    label: "Amenities",
    format: (value, data) =>
      formatItemsWithQuantities(value, data?.amenities || [], "amenityId"),
  },
  eventServices: {
    label: "Event Services",
    format: (value, data) =>
      formatItemsWithQuantities(
        value,
        data?.eventServices || [],
        "eventServiceId"
      ),
  },

  // Task specific fields
  targetTypeId: {
    label: "Task Target Type",
    format: (value, data) => getLabel(data?.taskTargetTypes || [], value),
  },
  targetId: {
    label: "Target",
    format: (value, data) => {
      // Try both rooms and event venues for flexibility
      const roomLabel = getLabel(data?.rooms || [], value);
      if (roomLabel !== value) return roomLabel;
      return getLabel(data?.eventVenues || [], value);
    },
  },
  scheduledStartTime: {
    label: "Scheduled Start Time",
    format: (value) => (value ? dateTimeFormat(value) : "Not set"),
  },
  scheduledEndTime: {
    label: "Scheduled End Time",
    format: (value) => (value ? dateTimeFormat(value) : "Not set"),
  },
  actualStartTime: {
    label: "Actual Start Time",
    format: (value) => (value ? dateTimeFormat(value) : "Not set"),
  },
  actualEndTime: {
    label: "Actual End Time",
    format: (value) => (value ? dateTimeFormat(value) : "Not set"),
  },
  description: {
    label: "Description",
  },
  maintenanceType: {
    label: "Maintenance Type",
  },
  scheduledDate: {
    label: "Scheduled Date",
    format: (value) => (value ? dateTimeFormat(value) : "Not set"),
  },
  completedDate: {
    label: "Completed Date",
    format: (value) => (value ? dateTimeFormat(value) : "Not set"),
  },
  maintenanceStatusId: {
    label: "Maintenance Status",
    format: (value, data) => getLabel(data?.maintenanceStatus || [], value),
  },
  roomTypeId: {
    label: "Room Type",
    format: (value, data) =>
      getLabel(data?.roomTypes || data?.mappedRoomTypes || [], value),
  },
};

// Special case for room type name
const specialCases = {
  name: (additionalData) => {
    if (additionalData.module === "Room Type") {
      return {
        label: "Room Type",
        format: (value, data) =>
          getLabel(data?.roomTypes || data?.mappedRoomTypes || [], value),
      };
    }
    return null;
  },
};

// Get changed form values for confirmation modal
export const getChangedFieldValues = (
  initialData,
  updatedData,
  additionalData = {}
) => {
  const changes = Object.keys(updatedData)
    .filter((key) =>
      areValuesDifferent(initialData[key], updatedData[key], key)
    )
    .filter((key) => key !== "billingPayloadDTO")
    .map((key) => {
      // Get formatter for this field
      let formatter = fieldFormatters[key];

      // Check special cases
      if (!formatter && specialCases[key]) {
        formatter = specialCases[key](additionalData);
      }

      let formattedKey = formatter?.label || formatText(key);
      let initialValue = initialData[key];
      let updatedValue = updatedData[key];

      // Apply formatting if we have a formatter
      if (formatter?.format) {
        initialValue = formatter.format(initialValue, additionalData);
        updatedValue = formatter.format(updatedValue, additionalData);
      }

      // Determine type of data for better display
      const isQuantityArray =
        (key === "amenities" || key === "eventServices") &&
        (initialValue !== "None" || updatedValue !== "None");

      const isListArray =
        (typeof initialValue === "string" && initialValue.includes(", ")) ||
        (typeof updatedValue === "string" && updatedValue.includes(", "));

      return {
        field: capitalize(formattedKey),
        oldValue: initialValue,
        newValue: updatedValue,
        type: isQuantityArray ? "quantity" : isListArray ? "list" : "simple",
        key,
      };
    });

  // For backward compatibility, also return the old string format
  const formattedStrings = changes.map(
    (change) =>
      `${change.field} changed from "${change.oldValue}" to "${change.newValue}"`
  );

  return {
    changes,
    formatted: formattedStrings,
  };
};

// Get label from data array that formatted to select tag options
const getLabel = (dataArray, value) =>
  dataArray.find((data) => data.value === value)?.label || value;

// Format the date
const dateFormat = (value) => dayjs(value).format("YYYY-MM-DD");
const dateTimeFormat = (value) => dayjs(value).format("YYYY-MM-DD HH:mm:ss");

// Helper function to compare arrays with items that have quantities
const compareArraysWithQuantities = (arr1, arr2, idField) => {
  if (!arr1 || !arr2) return arr1 !== arr2;
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
  if (!Array.isArray(items) || items.length === 0) return "None";

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
