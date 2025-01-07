import { useEffect, useState } from "react";
import { message } from "antd";

import { toast } from "react-toastify";

import {
  fetchEmployees,
  fetchOneEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  restoreEmployee,
} from "../services/employee";

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Crud Operation Api
  const loadEmployees = async () => {
    try {
      const resp = await fetchEmployees();
      setEmployees(resp);
      toast.success("loaded successfully");
    } catch (err) {
      toast.error("loaded error");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadOneEmployee = async (employeeId) => {
    setLoading(true);
    try {
      const resp = await fetchOneEmployee(employeeId);
      return resp;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addAnEmployee = async (values) => {
    setLoading(true);
    try {
      await addEmployee(values);
      msgSuccess("added");
      loadEmployees();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateAnEmployee = async (employeeId, values) => {
    setLoading(true);
    try {
      await updateEmployee(employeeId, values);
      loadEmployees();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAnEmployee = async (employeeId) => {
    setLoading(true);
    try {
      await deleteEmployee(employeeId);
      msgSuccess("deleted");
    } catch (err) {
      setError(err.message);
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
    } finally {
      setLoading(false);
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
  };
};

export default useEmployees;
