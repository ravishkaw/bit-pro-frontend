import { useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import {
  tasksService,
  taskStatusService,
  taskTypeService,
  taskTargetTypeService,
} from "../../services/taskApiService";

import { mapToSelectOptions } from "../../utils/utils";
import { fetchAllEmployees } from "../../services/systemApiService";
import { fetchAllRooms } from "../../services/roomApiServices";
import { fetchAllEventVenues } from "../../services/eventReservationApiService";

import useCrudHandler from "../common/useCrudHandler";

// Custom hook to manage housekeeping and maintenance operations
const useTasks = () => {
  const [taskTypes, setTaskTypes] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [taskTargetTypes, setTaskTargetTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [eventVenues, setEventVenues] = useState([]);

  const loadReferenceData = async () => {
    try {
      const [types, status, employees, targetType, rooms, eventVenues] =
        await Promise.all([
          taskTypeService.getAll(),
          taskStatusService.getAll(),
          fetchAllEmployees(),
          taskTargetTypeService.getAll(),
          fetchAllRooms(),
          fetchAllEventVenues(),
        ]);
      setTaskTypes(mapToSelectOptions(types));
      setTaskStatus(mapToSelectOptions(status));
      setEmployees(mapToSelectOptions(employees));
      setTaskTargetTypes(mapToSelectOptions(targetType));
      setRooms(mapToSelectOptions(rooms));
      setEventVenues(mapToSelectOptions(eventVenues));
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
    service: tasksService,
    entityName: "Tasks",
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

export default useTasks;
