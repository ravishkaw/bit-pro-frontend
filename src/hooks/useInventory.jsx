import { inventoryService } from "../services/inventoryApiService";
import useCrudHandler from "./useCrudHandler";

const useInventory = () => {
  const config = {
    service: inventoryService,
    entityName: "Inventory",
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

export default useInventory;
