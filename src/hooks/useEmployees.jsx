import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import {
  employeeService,
  employeeDesginationService,
  employeeStatusService,
  nationalitiesService,
  idTypeService,
  civilStatusService,
  genderService,
} from "../services/systemApiService";

import useCrudHandler from "./useCrudHandler";

import { mapNameToSelectOptions, mapToSelectOptions } from "../utils/utils";

// Custom hook to manage employee-related operations
const useEmployees = () => {
  const [genders, setGenders] = useState([]);
  const [idTypes, setIdTypes] = useState([]);
  const [civilStatus, setCivilStatus] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employeeStatus, setEmployeeStatus] = useState([]);

  // Format employee data to match form requirements
  const formatEmployeeData = (employee) => ({
    ...employee,
    dob: dayjs(employee.dob),
  });

  const config = {
    service: employeeService,
    entityName: "Employee",
    formatData: formatEmployeeData,
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

  // Fetch and map nationalities, employee designations and status
  const getEmployeeOtherData = async () => {
    try {
      const [
        idTypesResp,
        civilStatus,
        gendersResp,
        nationalitiesResp,
        designationResp,
        statusResp,
      ] = await Promise.all([
        idTypeService.getAll(),
        civilStatusService.getAll(),
        genderService.getAll(),
        nationalitiesService.getAll(),
        employeeDesginationService.getAll(),
        employeeStatusService.getAll(),
      ]);

      //mapping resposes to use in select and radio buttons
      setIdTypes(mapToSelectOptions(idTypesResp));
      setCivilStatus(mapToSelectOptions(civilStatus));
      setGenders(mapToSelectOptions(gendersResp));
      setDesignations(mapToSelectOptions(designationResp));
      setEmployeeStatus(mapToSelectOptions(statusResp));
      setNationalities(mapNameToSelectOptions(nationalitiesResp));
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
    idTypes,
    genders,
    civilStatus,
    nationalities,
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
