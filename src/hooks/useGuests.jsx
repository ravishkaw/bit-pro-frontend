import dayjs from "dayjs";
import { guestService } from "../services/reservationApiService";
import useCrudHandler from "./useCrudHandler";
import useProfileData from "./useProfileData";

// Custom hook to manage guest operations
const useGuests = () => {
  // get profile data
  const { genders, idTypes, civilStatus, nationalities, loadProfileData } =
    useProfileData();

  // Format guest data to match form requirements
  const formatGuestData = (guest) => ({
    ...guest,
    dob: dayjs(guest.dob),
  });

  const config = {
    service: guestService,
    entityName: "Guest",
    formatData: formatGuestData,
    additionalFunc: [loadProfileData],
  };

  // Use base hook for guest operations
  const {
    data,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  } = useCrudHandler(config);

  // Return states and functions for external use
  return {
    data,
    additionalData: { genders, idTypes, civilStatus, nationalities },
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  };
};

export default useGuests;
