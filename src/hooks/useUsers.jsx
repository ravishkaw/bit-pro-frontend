import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  userService,
  roleService,
  fetchEmployeesWithoutUserAccounts,
} from "../services/systemApiService";
import useCrudHandler  from "./useCrudHandler";

// Custom hook to manage user-related operations
const useUsers = () => {
  const [employeesNoUser, setEmployeesNoUser] = useState([]);
  const [roles, setRoles] = useState([]);

  // Use the base hook for common CRUD operations
  const {
    data: users,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem: loadOneUser,
    addItem: addAnUser,
    updateItem: updateAnUser,
    deleteItem: deleteAnUser,
  } = useCrudHandler ({
    service: userService,
    entityName: "User",
    isPaginated: true,
  });

  // Fetch employees without user accounts
  const loadEmployeesWithoutUserAccounts = async () => {
    try {
      const resp = await fetchEmployeesWithoutUserAccounts();
      setEmployeesNoUser(resp);
    } catch (err) {
      setEmployeesNoUser([]);
      toast.error(err.message || "Failed to load employees without accounts");
    }
  };

  // Fetch and map roles
  const loadRoles = async () => {
    try {
      const resp = await roleService.getAll();
      const mappedRoles = resp.map((role) => ({
        value: role.id,
        label: role.name,
      }));
      setRoles(mappedRoles);
    } catch (err) {
      setRoles([]);
      toast.error(err.message || "Failed to load roles");
    }
  };

  // Load employees without accounts and roles on mount
  useEffect(() => {
    loadEmployeesWithoutUserAccounts();
    loadRoles();
  }, []);

  // Return states and functions for external use
  return {
    loading,
    users,
    paginationDetails,
    setPaginationDetails,
    employeesNoUser,
    roles,
    loadOneUser,
    addAnUser,
    updateAnUser,
    deleteAnUser,
  };
};

export default useUsers;
