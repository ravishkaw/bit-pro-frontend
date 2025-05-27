import { createApiService } from "./apiService";

const PREVENTIVE_MAINTENANCE = "/preventive-maintenance";
const PREVENTIVE_MAINTENANCE_STATUS = "/preventive-maintenance-status";
const TASKS = "/tasks"; // housekpeeping and maintenance tasks
const TASK_STATUS = "/task-status";
const TASK_TYPE = "/task-types";
const TASK_TARGET_TYPE = "/task-target-types";

// Generic API service for preventive maintenance
export const preventiveMaintenanceService = createApiService(
  PREVENTIVE_MAINTENANCE
);

// Generic API service for preventive maintenance status
export const preventiveMaintenanceStatusService = createApiService(
  PREVENTIVE_MAINTENANCE_STATUS
);

// Generic API service for tasks (housekeeping and maintenance)
export const tasksService = createApiService(TASKS);

// Generic API service for task status
export const taskStatusService = createApiService(TASK_STATUS);

// Generic API service for task types
export const taskTypeService = createApiService(TASK_TYPE);

// Generic API service for task target types
export const taskTargetTypeService = createApiService(TASK_TARGET_TYPE);
