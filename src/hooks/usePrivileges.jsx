import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  privilegeService,
  roleService,
  moduleService,
  fetchModuleWithoutPrivileges,
} from "../services/systemApiService";

import useCrudHandler from "./useCrudHandler";

import { mapToSelectOptions } from "../utils/utils";

// Custom hook to handle privilege-related operations
const usePrivileges = () => {
  const [roles, setRoles] = useState([]);
  const [allModules, setAllModules] = useState([]);

  const config = {
    service: privilegeService,
    entityName: "Privileges",
  };

  // Use base hook for privilege operations
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

  // Load roles and modules simultaneously
  const loadRefernceData = async () => {
    try {
      const [rolesResponse, modulesResponse] = await Promise.all([
        roleService.getAll(),
        moduleService.getAll(),
      ]);

      //filter admin and map into select options
      const mappedRoles = mapToSelectOptions(rolesResponse).filter(
        (role) => role.value !== 1
      );
      setRoles(mappedRoles);
      setAllModules(mapToSelectOptions(modulesResponse));
    } catch (err) {
      toast.error(err.message || "Failed to load initial data");
      setRoles([]);
      setAllModules([]);
    }
  };

  // Load reference data on mount
  useEffect(() => {
    loadRefernceData();
  }, []);

  // Fetch modules that do not have privileges for a specific role
  const getModulesWithoutPrivileges = async (roleId) => {
    try {
      const response = await fetchModuleWithoutPrivileges(roleId);
      return mapToSelectOptions(response);
    } catch (err) {
      toast.error(err.message || "Failed to load modules without privileges");
      return [];
    }
  };

  // filter out admin privileges
  const filteredPrivileges = () =>
    data.filter((privileges) => privileges.roleId.name != "Admin");

  // Return all states and functions for external use
  return {
    data: filteredPrivileges(),
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem,
    addItem,
    updateItem,
    deleteItem,
    roles,
    allModules,
    getModulesWithoutPrivileges,
  };
};

export default usePrivileges;
