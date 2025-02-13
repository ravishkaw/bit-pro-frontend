import axiosInstance from "./axiosInstance";

const EMPLOYEE_DESIGNATION_BASE_URL = "/designation";

// Fetch all employee designations
export const fetchAllDesignations = async () => {
  const response = await axiosInstance.get(
    `${EMPLOYEE_DESIGNATION_BASE_URL}/get-all`
  );
  return response.data;
};
