import dayjs from "dayjs";
import { guestService } from "../services/reservationApiService";
import useCrudHandler from "./useCrudHandler";

// Custom hook to manage guest operations
const useGuests = () => {
  // Format guest data to match form requirements
  const formatGuestData = (guest) => ({
    ...guest,
    dob: dayjs(guest.dob),
  });

  const config = {
    service: guestService,
    entityName: "Guest",
    formatData: formatGuestData,
  };

  // Use base hook for guest operations
  const {
    data,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  } = useCrudHandler(config);

  // Return states and functions for external use
  return {
    data,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  };
};

export default useGuests;
