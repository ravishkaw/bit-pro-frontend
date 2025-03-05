import axiosInstance from "./axiosInstance";
import { createApiService } from "./apiService";

const USERS_BASE_URL = "/users";
const PRIVILEGE_BASE_URL = "/privileges";
const MODULE_BASE_URL = "/modules";
const ROLE_BASE_URL = "/roles";
const NATIONALITIES_BASE_URL = "/nationalities";
const ID_TYPE_BASE_URL = "/id-types";
const GENDER_BASE_URL = "/genders";
const CIVIL_STATUS_BASE_URL = "/civil-status";
const EMPLOYEE_BASE_URL = "/employees";
const EMPLOYEE_DESIGNATION_BASE_URL = "/designations";
const EMPLOYEE_STATUS_BASE_URL = "/employee-status";

// Generic API service for employees
export const employeeService = createApiService(EMPLOYEE_BASE_URL);

// Generic API service for designations
export const employeeDesginationService = createApiService(
  EMPLOYEE_DESIGNATION_BASE_URL
);

// Generic API service for nationalities
export const nationalitiesService = createApiService(NATIONALITIES_BASE_URL);

// Generic API service for idType
export const idTypeService = createApiService(ID_TYPE_BASE_URL);

// Generic API service for gender
export const genderService = createApiService(GENDER_BASE_URL);

// Generic API service for civilStatus
export const civilStatusService = createApiService(CIVIL_STATUS_BASE_URL);

// Generic API service for employee status
export const employeeStatusService = createApiService(EMPLOYEE_STATUS_BASE_URL);

// Generic API service for users
export const userService = createApiService(USERS_BASE_URL);

// Generic API service for privileges
export const privilegeService = createApiService(PRIVILEGE_BASE_URL);

// Generic API service for modules
export const moduleService = createApiService(MODULE_BASE_URL);

// Generic API service for system roles
export const roleService = createApiService(ROLE_BASE_URL);

// Fetch All employee Details without user accounts
export const fetchEmployeesWithoutUserAccounts = async () => {
  const response = await axiosInstance.get(
    `${EMPLOYEE_BASE_URL}/get-without-user-accounts`
  );
  return response.data;
};

// get modules without privileges for specific role
export const fetchModuleWithoutPrivileges = async (roleId) => {
  const response = await axiosInstance.get(
    `${MODULE_BASE_URL}/get-without-privileges`,
    {
      params: { roleId: roleId ? roleId : 1 },
    }
  );
  return response.data;
};
