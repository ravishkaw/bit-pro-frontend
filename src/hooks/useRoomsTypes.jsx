import { roomTypeService } from "../services/roomApiServices";
import useCrudHandler from "./useCrudHandler";

// Custom hook to manage room type operations
const useRoomTypes = () => {
  // Format room type data to match form requirements
  const formatRoomTypeData = (roomType) => ({
    ...roomType,
    statusName: roomType.statusName == "Active" ? true : false,
  });

  const config = {
    service: roomTypeService,
    entityName: "Room Type",
    formatData: formatRoomTypeData,
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
