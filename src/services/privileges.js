import axiosInstance from "./axiosInstance";

const PRIVILEGE_BASE_URL = "/privilege";

// Fetch All Privilege Details From The DB
export const fetchAllPrivileges = async (
  pageNumber,
  pageSize,
  sortBy,
  sortOrder,
  searchQuery
) => {
  const resp = await axiosInstance.get(`${PRIVILEGE_BASE_URL}/get-all`, {
    // params: {
    //   pageNumber,
    //   pageSize,
    //   sortBy: sortBy ? sortBy : "id",
    //   sortOrder: sortOrder ? (sortOrder == "descend" ? "desc" : "asc") : "desc",
    //   searchQuery,
    // },
  });
  return resp.data;
};

// Get single privilege
export const fetchOnePrivilege = async (privilegeId) => {
  const response = await axiosInstance.get(
    `${PRIVILEGE_BASE_URL}/privilege/${privilegeId}`
  );
  return response.data;
};

// Add Privilege Details
export const addPrivilege = async (values) => {
  await axiosInstance.post(`${PRIVILEGE_BASE_URL}/privilege`, values);
};

// Update Privilege
export const updatePrivilege = async (privilegeId, values) => {
  await axiosInstance.put(
    `${PRIVILEGE_BASE_URL}/privilege/${privilegeId}`,
    values
  );
};

// Delete Privilege
export const deletePrivilege = async (privilegeId) => {
  await axiosInstance.delete(`${PRIVILEGE_BASE_URL}/privilege/${privilegeId}`);
};
