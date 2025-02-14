import axiosInstance from "./axiosInstance";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const MODULE_BASE_URL = `${BASE_URL}/module`;

// Fetch All modules Details From The DB
export const fetchAllModules = async () => {
  const resp = await axiosInstance.get(`${MODULE_BASE_URL}/get-all`);
  return resp.data;
};

// get modules without privileges for specific role
export const fetchModuleWithoutPrivileges = async (roleId) => {
  const response = await axiosInstance.get(
    `${MODULE_BASE_URL}/get-without-privileges`,
    {
      params: { roleId: roleId ? roleId : 1 },
    }
  );
  return response.data;
};
