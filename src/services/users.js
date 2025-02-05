import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const USERS_BASE_URL = `${BASE_URL}/users`;

// Fetch All user Details From The DB
export const fetchAllUsers = async () => {
  try {
    const resp = await axios.get(`${USERS_BASE_URL}/get-all`);
    return resp.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
