import useCrudHandler from "../common/useCrudHandler";
import { eventPackageService } from "../../services/packageApiService";

// Custom hook to manage event package-related operations
const useEventPackages = () => {
  const config = {
    service: eventPackageService,
    entityName: "Event Package",
  };

  // Use base hook for event package operations
  const {
    data,
    loadData,
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
    loadData,
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

export default useEventPackages;
