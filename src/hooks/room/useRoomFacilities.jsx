import { roomFacilitiesService } from "../../services/roomApiServices";
import useCrudHandler from "../common/useCrudHandler";

// Custom hook to manage room facility operations
const RoomFacilities = () => {
  const config = {
    service: roomFacilitiesService,
    entityName: "Room Facility",
  };

  // Use base hook for room type operations
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

export default RoomFacilities;
