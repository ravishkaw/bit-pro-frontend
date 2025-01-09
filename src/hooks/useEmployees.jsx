import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationDetails, setPaginationDetails] = useState({
    current: 1,
    pageSize: 10,
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
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [paginationDetails.current, paginationDetails.pageSize]);

  const loadOneEmployee = async (employeeId) => {
    setLoading(true);
    try {
      const resp = await fetchOneEmployee(employeeId);
      return resp;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addAnEmployee = async (values) => {
    setLoading(true);
    try {
      await addEmployee(values);
      toast.success("Employee added successfully");
      loadEmployees();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateAnEmployee = async (employeeId, values) => {
    setLoading(true);
    try {
      await updateEmployee(employeeId, values);
      toast.success("Employee updated successfully");
      loadEmployees();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAnEmployee = async (employeeId) => {
    setLoading(true);
    try {
      await deleteEmployee(employeeId);
      toast.success("Employee deleted successfully");
      loadEmployees();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const restoreAnEmployee = async (employeeId) => {
    setLoading(true);
    try {
      await restoreEmployee(employeeId);
      loadEmployees();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getEmployeeDesignation = async () => {
    try {
      const resp = await fetchAllDesignations();
      return resp;
    } catch (err) {
      setError(err.message);
      return [];
    }
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
    getEmployeeDesignation,
    paginationDetails,
    setPaginationDetails,
  };
};

export default useEmployees;
