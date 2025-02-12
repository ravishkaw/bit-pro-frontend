import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const EMPLOYEE_DESIGNATION_BASE_URL = `${BASE_URL}/designation`;

// Fetch all employee designations
export const fetchAllDesignations = async () => {
  try {
    const response = await axios.get(
      `${EMPLOYEE_DESIGNATION_BASE_URL}/get-all`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
