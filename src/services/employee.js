import axios from "axios";

const API_URL = "https://bit-backend.jumpingcrab.com/api/employee";

// Fetch All employee Details From The DB
export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// Fetch All employee Details From The DB
export const fetchOneEmployee = async (employeeId) => {
  try {
    const response = await axios.get(`${API_URL}/employee/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// Add employee Details
export const addEmployee = async (values) => {
  try {
    await axios.post(`${API_URL}/employee`, values);
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

// Update employee Details
export const updateEmployee = async (employeeId, values) => {
  try {
    await axios.put(`${API_URL}/employee/${employeeId}`, values);
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

// Delete employee Details
export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axios.delete(`${API_URL}/employee/${employeeId}`);
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
      `${API_URL}/employee/restore/${employeeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error restoring employee:", error);
    throw error;
  }
};
