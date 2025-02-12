import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ROLE_BASE_URL = `${BASE_URL}/role`;

// Fetch All Roles From The DB
export const fetchAllRoles = async () => {
  try {
    const resp = await axios.get(`${ROLE_BASE_URL}/get-all`);
    return resp.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};
