import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const EMPLOYEE_BASE_URL = `${BASE_URL}/employee`;

// Fetch All employee Details From The DB with pagination
export const fetchEmployees = async (
  pageNumber,
  pageSize,
  sortBy,
  sortOrder
) => {
  try {
    const response = await axios.get(`${EMPLOYEE_BASE_URL}/get-all`, {
      params: {
        pageNumber,
        pageSize,
        sortBy: sortBy ? sortBy : "empNo",
        sortOrder: sortOrder
          ? sortOrder == "descend"
            ? "desc"
            : "asc"
          : "desc",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// Fetch All employee Details without user accounts
export const fetchEmployeesWithoutUserAccounts = async () => {
  try {
    const response = await axios.get(
      `${EMPLOYEE_BASE_URL}/get-without-user-accounts`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// Fetch All employee Details From The DB
export const fetchOneEmployee = async (employeeId) => {
  try {
    const response = await axios.get(
      `${EMPLOYEE_BASE_URL}/employee/${employeeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// Add employee Details
export const addEmployee = async (values) => {
  try {
    await axios.post(`${EMPLOYEE_BASE_URL}/employee`, values);
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

// Update employee Details
export const updateEmployee = async (employeeId, values) => {
  try {
    await axios.put(`${EMPLOYEE_BASE_URL}/employee/${employeeId}`, values);
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

// Delete employee Details
export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axios.delete(
      `${EMPLOYEE_BASE_URL}/employee/${employeeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

// Restore employee Details
export const restoreEmployee = async (employeeId) => {
  try {
    const response = await axios.put(
      `${EMPLOYEE_BASE_URL}/employee/restore/${employeeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error restoring employee:", error);
    throw error;
  }
};
