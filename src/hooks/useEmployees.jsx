import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import {
  fetchEmployees,
  fetchOneEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  restoreEmployee,
} from "../services/employee";
import { fetchAllDesignations } from "../services/designation";

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [paginationDetails, setPaginationDetails] = useState({
    current: 1,
    pageSize: 10,
    sortBy: "empNo",
    sortOrder: "descend",
    total: 0,
  });

  // Crud Operation Api
  // Load all employees and employees with pagination details
  const loadEmployees = async () => {
    try {
      // Fetch employees page starts with 0 but in antd starts with 1
      const resp = await fetchEmployees(
        paginationDetails.current - 1,
        paginationDetails.pageSize,
        paginationDetails.sortBy,
        paginationDetails.sortOrder
      );

      setEmployees(resp.data);
      setPaginationDetails((prev) => ({
        ...prev,
        total: resp.totalElements,
      }));
    } catch (err) {
      setEmployees([]);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch employee designations
  const getEmployeeDesignation = async () => {
    try {
      const response = await fetchAllDesignations();
      const mappedDesignations = response.map((designation) => ({
        value: designation.id,
        label: designation.name,
      }));
      setDesignations(mappedDesignations);
    } catch (err) {
      setDesignations([]);
      setError(err.message);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [
    paginationDetails.current,
    paginationDetails.pageSize,
    paginationDetails.sortBy,
    paginationDetails.sortOrder,
  ]);

  useEffect(() => {
    getEmployeeDesignation();
  }, []);

  // Get one employee details
  const loadOneEmployee = async (employeeId) => {
    setLoading(true);
    try {
      const employee = await fetchOneEmployee(employeeId);
      // format data into form shape
      const updatedEmployee = {
        ...employee,
        dob: dayjs(employee.dob),
        employeeStatus: employee.employeeStatus.name,
      };
      return updatedEmployee;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  //Add handle api call function to handle edit add delete and restore
  const handleApiCall = async (apiCallFn, successMessage) => {
    setLoading(true);
    try {
      await apiCallFn();
      toast.success(successMessage);
      loadEmployees();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add new employee
  const addAnEmployee = async (values) => {
    handleApiCall(
      () => addEmployee(values),
      `Employee ${values?.fullName} added successfully`
    );
  };

  // Update an employee
  const updateAnEmployee = async (employeeId, values) => {
    handleApiCall(
      () => updateEmployee(employeeId, values),
      `Employee ${values?.fullName} updated successfully`
    );
  };

  // Delete an employee
  const deleteAnEmployee = async (employeeId) => {
    handleApiCall(
      () => deleteEmployee(employeeId),
      `Employee with employee id ${employeeId} deleted successfully`
    );
  };

  // Restore an employee
  const restoreAnEmployee = async (employeeId) => {
    handleApiCall(
      () => restoreEmployee(employeeId),
      `Employee with employee id ${employeeId} restored successfully`
    );
  };

  return {
    employees,
    loadOneEmployee,
    addAnEmployee,
    updateAnEmployee,
    deleteAnEmployee,
    restoreAnEmployee,
    loading,
    error,
    designations,
    paginationDetails,
    setPaginationDetails,
  };
};

export default useEmployees;
