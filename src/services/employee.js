import axiosInstance from "./axiosInstance";

const EMPLOYEE_BASE_URL = "/employee";

// Fetch All employee Details From The DB with pagination
export const fetchEmployees = async (
  pageNumber,
  pageSize,
  sortBy,
  sortOrder,
  searchQuery
) => {
  const response = await axiosInstance.get(`${EMPLOYEE_BASE_URL}/get-all`, {
    params: {
      pageNumber,
      pageSize,
      sortBy: sortBy ? sortBy : "empNo",
      sortOrder: sortOrder ? (sortOrder == "descend" ? "desc" : "asc") : "desc",
      searchQuery,
    },
  });

  return response.data;
};

// Fetch All employee Details without user accounts
export const fetchEmployeesWithoutUserAccounts = async () => {
  const response = await axiosInstance.get(
    `${EMPLOYEE_BASE_URL}/get-without-user-accounts`
  );
  return response.data;
};

// Fetch All employee Details From The DB
export const fetchOneEmployee = async (employeeId) => {
  const response = await axiosInstance.get(
    `${EMPLOYEE_BASE_URL}/employee/${employeeId}`
  );
  return response.data;
};

// Add employee Details
export const addEmployee = async (values) => {
  await axiosInstance.post(`${EMPLOYEE_BASE_URL}/employee`, values);
};

// Update employee Details
export const updateEmployee = async (employeeId, values) => {
  await axiosInstance.put(
    `${EMPLOYEE_BASE_URL}/employee/${employeeId}`,
    values
  );
};

// Delete employee Details
export const deleteEmployee = async (employeeId) => {
  const response = await axiosInstance.delete(
    `${EMPLOYEE_BASE_URL}/employee/${employeeId}`
  );
  return response.data;
};

// Restore employee Details
export const restoreEmployee = async (employeeId) => {
  const response = await axiosInstance.put(
    `${EMPLOYEE_BASE_URL}/employee/restore/${employeeId}`
  );
  return response.data;
};
