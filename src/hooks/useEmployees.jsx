import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import handleApiCall from "./useApiHandler";
import {
  fetchEmployees,
  fetchOneEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  restoreEmployee,
} from "../services/employee";
import { fetchAllDesignations } from "../services/designation";
import { fetchAllEmployeeStatus } from "../services/employeeStatus";

// Custom hook to manage employee-related operations
const useEmployees = () => {
  const [employees, setEmployees] = useState([]); // List of employees
  const [designations, setDesignations] = useState([]); // Employee designations
  const [employeeStatus, setEmployeeStatus] = useState([]); // Employee statuses
  const [loading, setLoading] = useState(false); // Loading state

  // Pagination and sorting details
  const [paginationDetails, setPaginationDetails] = useState({
    current: 1,
    pageSize: 10,
    sortBy: "empNo",
    sortOrder: "descend",
    total: 0,
    searchQuery: "",
  });

  // Fetch employees based on pagination and sorting
  const loadEmployees = async () => {
    try {
      setLoading(true);
      const resp = await fetchEmployees(
        paginationDetails.current - 1, // Adjust for backend's 0-based index from antd 1
        paginationDetails.pageSize,
        paginationDetails.sortBy,
        paginationDetails.sortOrder,
        paginationDetails.searchQuery
      );
      setEmployees(resp.data);
      setPaginationDetails((prev) => ({ ...prev, total: resp.totalElements })); // Update total count
    } catch (err) {
      setEmployees([]);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch and map employee designations
  const getEmployeeDesignation = async () => {
    try {
      const response = await fetchAllDesignations();
      //mapping the designations to use in select tag
      const mappedDesignations = response.map((designation) => ({
        value: designation.id,
        label: designation.name,
      }));
      setDesignations(mappedDesignations);
    } catch (err) {
      setDesignations([]);
      toast.error(err.message);
    }
  };

  // Fetch and map employee statuses
  const getEmployeeStatus = async () => {
    try {
      const response = await fetchAllEmployeeStatus();
      //mapping the status to use in select tag
      const mappedStatus = response.map((status) => ({
        value: status.name,
        label: status.name,
      }));
      setEmployeeStatus(mappedStatus);
    } catch (err) {
      setEmployeeStatus([]);
      toast.error(err.message);
    }
  };

  // Load employees when pagination or sorting changes
  useEffect(() => {
    loadEmployees();
  }, [
    paginationDetails.current,
    paginationDetails.pageSize,
    paginationDetails.sortBy,
    paginationDetails.sortOrder,
    paginationDetails.searchQuery,
  ]);

  // Load designations and statuses on mount
  useEffect(() => {
    getEmployeeDesignation();
    getEmployeeStatus();
  }, []);

  // Fetch details of a single employee
  const loadOneEmployee = async (employeeId) => {
    setLoading(true);
    try {
      const employee = await fetchOneEmployee(employeeId);
      // format data into match with the form shape
      const updatedEmployee = {
        ...employee,
        dob: dayjs(employee.dob), // Format date
        employeeStatus: employee.employeeStatus.name,
      };
      return updatedEmployee;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new employee
  const addAnEmployee = async (values) => {
    handleApiCall(
      () => addEmployee(values),
      `Employee ${values?.fullName} added successfully`,
      setLoading,
      loadEmployees
    );
  };

  // Update an existing employee
  const updateAnEmployee = async (employeeId, values) => {
    handleApiCall(
      () => updateEmployee(employeeId, values),
      `Employee ${values?.fullName} updated successfully`,
      setLoading,
      loadEmployees
    );
  };

  // Delete an employee
  const deleteAnEmployee = async (employeeId) => {
    handleApiCall(
      () => deleteEmployee(employeeId),
      `Employee with ID ${employeeId} deleted successfully`,
      setLoading,
      loadEmployees
    );
  };

  // Restore a deleted employee
  const restoreAnEmployee = async (employeeId) => {
    handleApiCall(
      () => restoreEmployee(employeeId),
      `Employee with ID ${employeeId} restored successfully`,
      setLoading,
      loadEmployees
    );
  };

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
