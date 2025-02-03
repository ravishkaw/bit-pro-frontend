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
    total: 0,
  });

  // Crud Operation Api
  const loadEmployees = async () => {
    try {
      // Fetch employees page starts with 0 but in antd starts with 1
      const resp = await fetchEmployees(
        paginationDetails.current - 1,
        paginationDetails.pageSize
        // !Add these with table sorter
        // sortBy,
        // sortOrder
      );
      setPaginationDetails((prev) => ({
        ...prev,
        total: resp.totalElements,
      }));
      setEmployees(resp.data);
    } catch (err) {
      setEmployees([]);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

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
  }, [paginationDetails.current, paginationDetails.pageSize]);

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
    handleApiCall(() => addEmployee(values), "Employee added successfully");
  };

  // Update an employee
  const updateAnEmployee = async (employeeId, values) => {
    handleApiCall(
      () => updateEmployee(employeeId, values),
      "Employee updated successfully"
    );
  };

  // Delete an employee
  const deleteAnEmployee = async (employeeId) => {
    handleApiCall(
      () => deleteEmployee(employeeId),
      "Employee deleted successfully"
    );
  };

  // Restore an employee
  const restoreAnEmployee = async (employeeId) => {
    handleApiCall(
      () => restoreEmployee(employeeId),
      "Employee restored successfully"
    );
  };

  // Handle the pagination details and page size
  const handlePageChange = (pagination) => {
    const isPageSizeChanged =
      pagination.pageSize !== paginationDetails.pageSize;

    setPaginationDetails({
      current: isPageSizeChanged ? 1 : pagination.current,
      pageSize: pagination.pageSize,
    });
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
    handlePageChange,
  };
};

export default useEmployees;
