import { eventVenueService } from "../../services/reservationApiService";
import useCrudHandler from "../common/useCrudHandler";

const useEventVenues = () => {
  const config = {
    service: eventVenueService,
    entityName: "Event Venue",
  };

  // Use base hook for event reservation service operations
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

export default useEventVenues;
