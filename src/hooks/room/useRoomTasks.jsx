import { useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import {
  roomTasksService,
  roomTaskStatusService,
  roomTaskTypeService,
} from "../../services/roomApiServices";
import useCrudHandler from "../common/useCrudHandler";

import { mapToSelectOptions } from "../../utils/utils";
import { fetchAllEmployees } from "../../services/systemApiService";

// Custom hook to manage room housekeeping and maintenance operations
const useRoomTasks = () => {
  const [taskTypes, setTaskTypes] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);
  const [employees, setEmployees] = useState([]);

  const loadReferenceData = async () => {
    try {
      const [types, status, employees] = await Promise.all([
        roomTaskTypeService.getAll(),
        roomTaskStatusService.getAll(),
        fetchAllEmployees(),
      ]);
      setTaskTypes(mapToSelectOptions(types));
      setTaskStatus(mapToSelectOptions(status));
      setEmployees(mapToSelectOptions(employees));
    } catch (error) {
      toast.error("Error loading reference data:", error);
    }
  };

  // Format task dates
  const formatTask = (task) => ({
    ...task,
    scheduledStartTime: dayjs(task.scheduledStartTime),
    scheduledEndTime: dayjs(task.scheduledEndTime),
    actualStartTime: task.actualStartTime && dayjs(task.actualStartTime),
    actualEndTime: task.actualEndTime && dayjs(task.actualEndTime),
  });

  const config = {
    service: roomTasksService,
    entityName: "Room Tasks",
    formatData: formatTask,
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
      taskTypes,
      taskStatus,
      employees,
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

export default useRoomTasks;
