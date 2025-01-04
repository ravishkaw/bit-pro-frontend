import { useEffect, useState } from "react";
import { message } from "antd";

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

  // Messages
  const [messageApi, contextHolder] = message.useMessage();

  const msgSuccess = (message) =>
    messageApi.open({
      type: "success",
      content: `Employee ${message} successfully`,
      style: {
        fontSize: "1rem",
      },
    });

  const msgWarn = (message) =>
    messageApi.open({
      type: "warn",
      content: `Employee ${message} Failed`,
      style: {
        fontSize: "1rem",
      },
    });

  const msgError = (message) =>
    messageApi.open({
      type: "error",
      content: `Employee ${message} Failed`,
      style: {
        fontSize: "1rem",
      },
    });

  // Crud Operation Api
  const loadEmployees = async () => {
    try {
      const resp = await fetchEmployees();
      setEmployees(resp);
      // msgSuccess("loaded");
    } catch (err) {
      msgError("loading");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadOneEmployee = async (employeeId) => {
    try {
      const resp = await fetchOneEmployee(employeeId);
      return resp;
    } catch (err) {
      setError(err.message);
    }
  };

  const addAnEmployee = async (values) => {
    try {
      await addEmployee(values);
      msgSuccess("added");
      loadEmployees();
    } catch (err) {
      msgError("adding");
      setError(err.message);
    }
  };

  const updateAnEmployee = async (employeeId, values) => {
    try {
      await updateEmployee(employeeId, values);
      msgSuccess("updated");
      loadEmployees();
    } catch (err) {
      msgError("updating");
      setError(err.message);
    }
  };

  const deleteAnEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      msgSuccess("deleted");
      loadEmployees();
    } catch (err) {
      msgError("deleting");
      setError(err.message);
    }
  };
  const restoreAnEmployee = async (employeeId) => {
    try {
      await restoreEmployee(employeeId);
      msgSuccess("restored");
      loadEmployees();
    } catch (err) {
      msgError("restoring");
      setError(err.message);
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
    contextHolder,
  };
};

export default useEmployees;
