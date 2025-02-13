import axiosInstance from "./axiosInstance";

const EMPLOYEE_STATUS_BASE_URL = "/employee-status";

// Fetch all employee status
export const fetchAllEmployeeStatus = async () => {
  const response = await axiosInstance.get(
    `${EMPLOYEE_STATUS_BASE_URL}/get-all`
  );
  return response.data;
};
