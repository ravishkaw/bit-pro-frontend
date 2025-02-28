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

  // Use base hook for privilege operations
  const {
    data: allPrivileges,
    loading,
    paginationDetails,
    setPaginationDetails,
    loadOneItem: loadOnePrivilege,
    addItem: addNewPrivilege,
    updateItem: updateAPrivilege,
    deleteItem: deleteAPrivilege,
  } = useCrudHandler({
    service: privilegeService,
    entityName: "Privilege",
    isPaginated: false,
  });

  // Load roles and modules simultaneously
  const loadInitialData = async () => {
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

  // Load roles and modules on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  // filter out admin privileges
  const filteredPrivileges = () =>
    allPrivileges.filter((privileges) => privileges.roleId.name != "Admin");

  // Return all states and functions for external use
  return {
    loading,
    filteredPrivileges,
    roles,
    allModules,
    getModulesWithoutPrivileges,
    paginationDetails,
    setPaginationDetails,
    loadOnePrivilege,
    addNewPrivilege,
    updateAPrivilege,
    deleteAPrivilege,
  };
};

export default usePrivileges;
