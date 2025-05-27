import { useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import {
  preventiveMaintenanceService,
  preventiveMaintenanceStatusService,
  taskTargetTypeService,
} from "../../services/taskApiService";
import { fetchAllRooms } from "../../services/roomApiServices";
import { fetchAllEventVenues } from "../../services/eventReservationApiService";
import useCrudHandler from "../common/useCrudHandler";

import { mapToSelectOptions } from "../../utils/utils";

// Custom hook to manage maintenance operations
const useMaintenance = () => {
  const [maintenanceStatus, setMaintenanceStatus] = useState([]);
  const [taskTargetTypes, setTaskTargetTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [eventVenues, setEventVenues] = useState([]);

  // Load reference data
  const loadReferenceData = async () => {
    try {
      const [status, targetType, rooms, eventVenues] = await Promise.all([
        preventiveMaintenanceStatusService.getAll(),
        taskTargetTypeService.getAll(),
        fetchAllRooms(),
        fetchAllEventVenues(),
      ]);
      setMaintenanceStatus(mapToSelectOptions(status));
      setTaskTargetTypes(mapToSelectOptions(targetType));
      setRooms(mapToSelectOptions(rooms));
      setEventVenues(mapToSelectOptions(eventVenues));
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
    entityName: "Preventive Maintenance",
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
      taskTargetTypes,
      rooms,
      eventVenues,
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
