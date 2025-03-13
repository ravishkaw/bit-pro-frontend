import { roomTypeService } from "../services/roomApiServices";
import useCrudHandler from "./useCrudHandler";

// Custom hook to manage room type operations
const useRoomTypes = () => {
  const config = {
    service: roomTypeService,
    entityName: "Room Type",
  };

  // Use base hook for room type operations
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

export default useRoomTypes;
