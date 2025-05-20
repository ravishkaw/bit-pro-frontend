import dayjs from "dayjs";
import { guestService } from "../../services/roomReservationApiService";
import useCrudHandler from "../common/useCrudHandler";
import useProfileData from "./useProfileData";

// Custom hook to manage guest operations
const useGuests = () => {
  // get profile data
  const {
    genders,
    idTypes,
    civilStatus,
    nationalities,
    titles,
    loadProfileData,
  } = useProfileData();

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
    additionalData: { genders, idTypes, civilStatus, nationalities, titles },
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
