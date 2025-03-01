import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  employeeService,
  employeeDesginationService,
  employeeStatusService,
} from "../services/systemApiService";
import useCrudHandler from "./useCrudHandler";
import { mapToSelectOptions } from "../utils/utils";

// Custom hook to manage employee-related operations
const useEmployees = () => {
  const [designations, setDesignations] = useState([]);
  const [employeeStatus, setEmployeeStatus] = useState([]);

  // Format employee data to match form requirements
  const formatEmployeeData = (employee) => ({
    ...employee,
    dob: dayjs(employee.dob),
    employeeStatus: employee.employeeStatus.name,
  });

  // Use base hook for employee operations
  const {
    data,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
  } = useCrudHandler({
    service: employeeService,
    entityName: "Employee",
    isPaginated: true,
    formatData: formatEmployeeData,
  });

  // Fetch and map employee designations and status
  const getEmployeeOtherData = async () => {
    try {
      const designationResp = await employeeDesginationService.getAll();
      //mapping the designations to use in select tag
      const mappedDesignations = mapToSelectOptions(designationResp);
      setDesignations(mappedDesignations);

      const statusResp = await employeeStatusService.getAll();
      //mapping the status to use in select tag
      const mappedStatus = statusResp.map((status) => ({
        value: status.name,
        label: status.name,
      }));
      setEmployeeStatus(mappedStatus);
    } catch (err) {
      setEmployeeStatus([]);
      setDesignations([]);
      toast.error(err.message || "Failed to load employee reference data");
    }
  };

  // Load designations and statuses on mount
  useEffect(() => {
    getEmployeeOtherData();
  }, []);

  // Return states and functions for external use
  return {
    data,
    loading,
    designations,
    employeeStatus,
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
