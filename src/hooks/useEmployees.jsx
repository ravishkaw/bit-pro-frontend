import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  employeeService,
  employeeDesginationService,
  employeeStatusService,
} from "../services/systemApiService";
import useCrudHandler  from "./useCrudHandler";

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

  const {
    data: employees,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem: loadOneEmployee,
    addItem: addAnEmployee,
    updateItem: updateAnEmployee,
    deleteItem: deleteAnEmployee,
    restoreItem: restoreAnEmployee,
  } = useCrudHandler ({
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
      const mappedDesignations = designationResp.map((designation) => ({
        value: designation.id,
        label: designation.name,
      }));
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
    employees,
    loadOneEmployee,
    addAnEmployee,
    updateAnEmployee,
    deleteAnEmployee,
    restoreAnEmployee,
    loading,
    designations,
    employeeStatus,
    paginationDetails,
    setPaginationDetails,
  };
};

export default useEmployees;
