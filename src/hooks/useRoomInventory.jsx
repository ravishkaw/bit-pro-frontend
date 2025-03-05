import { roomInventoryService } from "../services/roomApiServices";
import useCrudHandler from "./useCrudHandler";

// Custom hook to manage room inventory operations
const RoomInventory = () => {
  const config = {
    service: roomInventoryService,
    entityName: "Room Inventory",
  };

  // Use base hook for room inventory operations
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

export default RoomInventory;
