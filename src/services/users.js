import axiosInstance from "./axiosInstance";

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
  const resp = await axiosInstance.get(`${USERS_BASE_URL}/get-all`, {
    params: {
      pageNumber,
      pageSize,
      sortBy: sortBy ? sortBy : "id",
      sortOrder: sortOrder ? (sortOrder == "descend" ? "desc" : "asc") : "desc",
      searchQuery,
    },
  });
  return resp.data;
};

// Fetch single user
export const fetchUser = async (userId) => {
  const resp = await axiosInstance.get(`${USERS_BASE_URL}/user/${userId}`);
  return resp.data;
};

// Add user Details
export const addUser = async (values) => {
  await axiosInstance.post(`${USERS_BASE_URL}/user`, values);
};

// Update user
export const updateUser = async (userId, values) => {
  await axiosInstance.put(`${USERS_BASE_URL}/user/${userId}`, values);
};

// Delete user
export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(
    `${USERS_BASE_URL}/user/${userId}`
  );
  return response.data;
};
