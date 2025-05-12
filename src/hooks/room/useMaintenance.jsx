import { useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import {
  preventiveMaintenanceService,
  preventiveMaintenanceStatusService,
} from "../../services/roomApiServices";
import useCrudHandler from "../common/useCrudHandler";

import { mapToSelectOptions } from "../../utils/utils";

// Custom hook to manage room maintenance operations
const useMaintenance = () => {
  const [maintenanceStatus, setMaintenanceStatus] = useState([]);

  // Load reference data
  const loadReferenceData = async () => {
    try {
      const [status] = await Promise.all([
        preventiveMaintenanceStatusService.getAll(),
      ]);
      setMaintenanceStatus(mapToSelectOptions(status));
    } catch (error) {
      setMaintenanceStatus([]);
      toast.error("Failed to load maintenance status");
    }
  };

  // Format maintenance data
  const formatMaintenance = (maintenance) => ({
    ...maintenance,
    scheduledDate:
      maintenance.scheduledDate && dayjs(maintenance.scheduledDate),
    completedDate:
      maintenance.completedDate && dayjs(maintenance.completedDate),
  });

  const config = {
    service: preventiveMaintenanceService,
    entityName: "Room Preventive Maintenance",
    formatData: formatMaintenance,
    additionalFunc: [loadReferenceData],
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
    additionalData: {
      maintenanceStatus,
    },
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
