import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  privilegeService,
  roleService,
  moduleService,
  fetchModuleWithoutPrivileges,
} from "../services/systemApiService";
import useCrudHandler  from "./useCrudHandler";

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
  } = useCrudHandler ({
    service: privilegeService,
    entityName: "Privilege",
    isPaginated: false,
  });

  // Load all roles and map them into a usable format
  const loadRoles = async () => {
    try {
      const response = await roleService.getAll();
      //mapping the roles to use in select tag
      const mappedRoles = response
        .map((role) => ({
          value: role.id,
          label: role.name,
        }))
        // filter admin
        .filter((withoutAdmin) => withoutAdmin.value !== 1);
      setRoles(mappedRoles);
    } catch (err) {
      setRoles([]);
      toast.error(err.message || "Failed to load roles");
    }
  };

  // Load all modules and map them into a usable format
  const loadModules = async () => {
    try {
      const response = await moduleService.getAll();
      //mapping the modules to use in select tag
      const mappedModules = response.map((module) => ({
        value: module.id,
        label: module.name,
      }));
      setAllModules(mappedModules);
    } catch (err) {
      setAllModules([]);
      toast.error(err.message || "Failed to load modules");
    }
  };

  // Load roles and modules on component mount
  useEffect(() => {
    loadRoles();
    loadModules();
  }, []);

  // Fetch modules that do not have privileges for a specific role
  const getModulesWithoutPrivileges = async (roleId) => {
    try {
      const response = await fetchModuleWithoutPrivileges(roleId);
      //mapping the modules to use in select tag
      const mappedModules = response.map((module) => ({
        value: module.id,
        label: module.name,
      }));
      return mappedModules;
    } catch (err) {
      toast.error(err.message || "Failed to load modules without privileges");
      return [];
    }
  };

  // Return all states and functions for external use
  return {
    loading,
    allPrivileges,
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
