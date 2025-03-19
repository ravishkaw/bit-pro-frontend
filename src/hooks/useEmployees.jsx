import { useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import {
  employeeService,
  employeeDesginationService,
  employeeStatusService,
} from "../services/systemApiService";

import useCrudHandler from "./useCrudHandler";
import useProfileData from "./useProfileData";

import { mapToSelectOptions } from "../utils/utils";

// Custom hook to manage employee-related operations
const useEmployees = () => {
  const [designations, setDesignations] = useState([]);
  const [employeeStatus, setEmployeeStatus] = useState([]);

  // get profile data
  const {
    genders,
    idTypes,
    civilStatus,
    nationalities,
    titles,
    loadProfileData,
  } = useProfileData();

  // Fetch and map employee designations and status
  const getEmployeeSpecificData = async () => {
    try {
      const [designationResp, statusResp] = await Promise.all([
        employeeDesginationService.getAll(),
        employeeStatusService.getAll(),
      ]);

      setDesignations(mapToSelectOptions(designationResp));
      setEmployeeStatus(mapToSelectOptions(statusResp));
    } catch (err) {
      setEmployeeStatus([]);
      setDesignations([]);
      toast.error(
        err.message || "Failed to load employee designation/status data"
      );
    }
  };

  // Format employee data to match form requirements
  const formatEmployeeData = (employee) => ({
    ...employee,
    dob: dayjs(employee.dob),
  });

  const config = {
    service: employeeService,
    entityName: "Employee",
    formatData: formatEmployeeData,
    additionalFunc: [getEmployeeSpecificData, loadProfileData],
  };

  // Use base hook for employee operations
  const {
    data,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  } = useCrudHandler(config);

  // Return states and functions for external use
  return {
    data,
    loading,
    additionalData: {
      designations,
      employeeStatus,
      idTypes,
      genders,
      civilStatus,
      nationalities,
      titles,
    },
    paginationDetails,
    setPaginationDetails,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
  };
};

export default useEmployees;
