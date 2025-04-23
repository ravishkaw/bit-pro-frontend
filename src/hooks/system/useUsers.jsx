import { useState } from "react";
import { toast } from "react-toastify";

import {
  userService,
  roleService,
  fetchEmployeesWithoutUserAccounts,
} from "../../services/systemApiService";

import useCrudHandler from "../common/useCrudHandler";

import { mapToSelectOptions } from "../../utils/utils";

// Custom hook to manage user-related operations
const useUsers = () => {
  const [employeesNoUser, setEmployeesNoUser] = useState([]);
  const [roles, setRoles] = useState([]);

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

  const config = {
    service: userService,
    entityName: "User",
    additionalFunc: [loadRefernceData],
  };

  // Use base hook for user operations
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

  // Return states and functions for external use
  return {
    loading,
    data,
    additionalData: { employeesNoUser, roles },
    paginationDetails,
    setPaginationDetails,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    restoreItem,
  };
};

export default useUsers;
