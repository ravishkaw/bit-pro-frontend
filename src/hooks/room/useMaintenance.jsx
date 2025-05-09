import { preventiveMaintenanceService } from "../../services/roomApiServices";
import useCrudHandler from "../common/useCrudHandler";

// Custom hook to manage room maintenance operations
const useMaintenance = () => {
  const config = {
    service: preventiveMaintenanceService,
    entityName: "Room Preventive Maintenance",
  };

  // Use base hook for operations
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

export default useMaintenance;
