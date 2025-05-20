import { eventReservationServiceService } from "../../services/eventReservationApiService";
import useCrudHandler from "../common/useCrudHandler";

const useEventReservationServices = () => {
  const config = {
    service: eventReservationServiceService,
    entityName: "Event Reservation Service",
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

export default useEventReservationServices;
