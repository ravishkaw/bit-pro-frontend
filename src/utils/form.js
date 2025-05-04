import { capitalize, formatText } from "./textUtils";
import dayjs from "dayjs";

// Get label from data array that formatted to select tag options
const getLabel = (dataArray, value) =>
  dataArray.find((data) => data.value === value)?.label || value;

// Format the date
const dateFormat = (value) => dayjs(value).format("YYYY-MM-DD");

// Helper function to check if values are different
const areValuesDifferent = (val1, val2, key) => {
  // Special handling for amenities array
  if (key === "amenities" && Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) return true;
    // Sort by amenityId for stable comparison
    const sorted1 = [...val1].sort((a, b) => a.amenityId - b.amenityId);
    const sorted2 = [...val2].sort((a, b) => a.amenityId - b.amenityId);
    for (let i = 0; i < sorted1.length; i++) {
      if (
        sorted1[i].amenityId !== sorted2[i].amenityId ||
        sorted1[i].quantity !== sorted2[i].quantity
      ) {
        return true;
      }
    }
    return false;
  }

  // compare arrays 
  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) return true;
    const sortedVal1 = [...val1].sort().toString();
    const sortedVal2 = [...val2].sort().toString();
    return sortedVal1 !== sortedVal2;
  }

  // For other types, use string comparison
  return JSON.stringify(val1) !== JSON.stringify(val2);
};

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

        // Format initial amenities
        if (Array.isArray(initialValue)) {
          initialValue = initialValue
            .map((item) => {
              const amenity = mappedAmenities.find(
                (a) => a.id === item.amenityId
              );
              return amenity
                ? `${amenity.name} (${item.quantity})`
                : `ID: ${item.amenityId} (${item.quantity})`;
            })
            .sort()
            .join(", ");
        } else {
          initialValue = "None";
        }

        // Format updated amenities
        if (Array.isArray(updatedValue)) {
          updatedValue = updatedValue
            .map((item) => {
              const amenity = mappedAmenities.find(
                (a) => a.id === item.amenityId
              );
              return amenity
                ? `${amenity.name} (${item.quantity})`
                : `ID: ${item.amenityId} (${item.quantity})`;
            })
            .sort()
            .join(", ");
        } else {
          updatedValue = "None";
        }
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

      return `${capitalize(
        formattedKey
      )} changed from "${initialValue}" to "${updatedValue}"`;
    });
};

// Trigger form validation
export const triggerFormFieldsValidation = (form) => {
  setTimeout(() => form.validateFields(), 0);
};
