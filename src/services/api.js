import axiosInstance from "./axiosInstance";

const AUTH_BASE_URL = "/auth";

// Login
export const login = async (values) => {
  const response = await axiosInstance.post(`${AUTH_BASE_URL}/signin`, values);

  return response.data;
};

// check session
export const session = async () => {
  const response = await axiosInstance.get(`${AUTH_BASE_URL}/session`);
  return response.data;
};

// logout
export const logout = async () => {
  await axiosInstance.post(`${AUTH_BASE_URL}/logout`, {});
};
