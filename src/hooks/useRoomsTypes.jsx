import { roomTypeService } from "../services/roomApiServices";
import useCrudHandler from "./useCrudHandler";

// Custom hook to manage room type operations
const useRoomTypes = () => {
  const {
    data: roomTypes,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem: loadOneRoomType,
    addItem: addAnRoomType,
    updateItem: updateAnRoomType,
    deleteItem: deleteAnRoomType,
  } = useCrudHandler({
    service: roomTypeService,
    entityName: "Room Type",
    isPaginated: false,
  });

  // Return states and functions for external use
  return {
    loading,
    roomTypes,
    paginationDetails,
    setPaginationDetails,
    loadOneRoomType,
    addAnRoomType,
    updateAnRoomType,
    deleteAnRoomType,
  };
};

export default useRoomTypes;
