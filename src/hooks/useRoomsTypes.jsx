import { roomTypeService } from "../services/roomApiServices";
import useCrudHandler from "./useCrudHandler";

// Custom hook to manage room type operations
const useRoomTypes = () => {
  const {
    data,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
  } = useCrudHandler({
    service: roomTypeService,
    entityName: "Room Type",
    isPaginated: true,
  });

  // Return states and functions for external use
  return {
    data,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
  };
};

export default useRoomTypes;
