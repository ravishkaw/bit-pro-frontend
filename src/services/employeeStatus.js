import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const EMPLOYEE_STATUS_BASE_URL = `${BASE_URL}/employee-status`;

// Fetch all employee status
export const fetchAllEmployeeStatus = async () => {
  try {
    const response = await axios.get(`${EMPLOYEE_STATUS_BASE_URL}/get-all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employee status:", error);
    throw error;
  }
};
