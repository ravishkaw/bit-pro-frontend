import axiosInstance from "./axiosInstance";

const ROLE_BASE_URL = "/role";

// Fetch All Roles From The DB
export const fetchAllRoles = async () => {
  const resp = await axiosInstance.get(`${ROLE_BASE_URL}/get-all`);
  return resp.data;
};
