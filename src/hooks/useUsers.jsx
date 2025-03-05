import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  userService,
  roleService,
  fetchEmployeesWithoutUserAccounts,
} from "../services/systemApiService";

import useCrudHandler from "./useCrudHandler";

import { mapToSelectOptions } from "../utils/utils";

// Custom hook to manage user-related operations
const useUsers = () => {
  const [employeesNoUser, setEmployeesNoUser] = useState([]);
  const [roles, setRoles] = useState([]);

  // Format user data to match form requirements
  const formatUserData = (user) => ({
    ...user,
    statusName: user.statusName == "Active" ? true : false,
  });

  const config = {
    service: userService,
    entityName: "User",
    formatData: formatUserData,
  };

  // Use base hook for user operations
  const {
    data,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    loading,
    paginationDetails,
    setPaginationDetails,
  } = useCrudHandler(config);

  // Fetch employees without user accounts
  const loadRefernceData = async () => {
    try {
      const [nonUserEmployeeResp, rolesResp] = await Promise.all([
        fetchEmployeesWithoutUserAccounts(),
        roleService.getAll(),
      ]);
      setEmployeesNoUser(nonUserEmployeeResp);
      setRoles(mapToSelectOptions(rolesResp));
    } catch (err) {
      setRoles([]);
      setEmployeesNoUser([]);
      toast.error(err.message || "Failed to load user reference data");
    }
  };

  // Load reference data on mount
  useEffect(() => {
    loadRefernceData();
  }, []);

  // Return states and functions for external use
  return {
    loading,
    data,
    paginationDetails,
    setPaginationDetails,
    employeesNoUser,
    roles,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
  };
};

export default useUsers;
