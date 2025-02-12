import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const USERS_BASE_URL = `${BASE_URL}/users`;

// Fetch All user Details From The DB
export const fetchAllUsers = async (
  pageNumber,
  pageSize,
  sortBy,
  sortOrder,
  searchQuery
) => {
  try {
    const resp = await axios.get(`${USERS_BASE_URL}/get-all`, {
      params: {
        pageNumber,
        pageSize,
        sortBy: sortBy ? sortBy : "id",
        sortOrder: sortOrder
          ? sortOrder == "descend"
            ? "desc"
            : "asc"
          : "desc",
        searchQuery,
      },
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch single user
export const fetchUser = async (userId) => {
  try {
    const resp = await axios.get(`${USERS_BASE_URL}/user/${userId}`);
    return resp.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Add user Details
export const addUser = async (values) => {
  try {
    await axios.post(`${USERS_BASE_URL}/user`, values);
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Update user
export const updateUser = async (userId, values) => {
  try {
    await axios.put(`${USERS_BASE_URL}/user/${userId}`, values);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${USERS_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
