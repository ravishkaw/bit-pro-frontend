import useCrudHandler from "../common/useCrudHandler";
import { roomPackageService } from "../../services/packageApiService";

// Custom hook to manage room package-related operations
const useRoomPackages = () => {
  const config = {
    service: roomPackageService,
    entityName: "Room Package",
  };

  // Use base hook for room package operations
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

export default useRoomPackages;
