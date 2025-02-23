import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addPrivilege,
  deletePrivilege,
  fetchAllPrivileges,
  fetchOnePrivilege,
  updatePrivilege,
} from "../services/privileges";
import { fetchAllRoles } from "../services/role";
import { fetchModuleWithoutPrivileges } from "../services/module";
import handleApiCall from "./useApiHandler";

// Custom hook to handle all privilege-related service calls
const usePrivileges = () => {
  const [privileges, setPrivileges] = useState([]); // State to store the list of privileges
  const [roles, setRoles] = useState([]); // Roles available in the system
  const [allModules, setAllModules] = useState([]); // All modules available in the system
  const [loading, setLoading] = useState(false); // Loading state for API calls

  // Pagination details for managing privilege data
  const [paginationDetails, setPaginationDetails] = useState({
    current: 1,
    pageSize: 10,
    sortBy: "id",
    sortOrder: "descend",
    total: 0,
    searchQuery: "",
  });

  // Load all privileges based on pagination and sorting criteria
  const loadPrivileges = async () => {
    try {
      setLoading(true);
      const resp = await fetchAllPrivileges(
        paginationDetails.current - 1, // Adjust for backend's 0-based index from antd 1
        paginationDetails.pageSize,
        paginationDetails.sortBy,
        paginationDetails.sortOrder,
        paginationDetails.searchQuery
      );
      setPrivileges(resp);
      setPaginationDetails((prev) => ({ ...prev, total: resp.totalElements })); // Update total count
    } catch (err) {
      setPrivileges([]);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load all roles and map them into a usable format
  const loadRoles = async () => {
    try {
      const response = await fetchAllRoles();
      //mapping the roles to use in select tag
      const mappedRoles = response.map((role) => ({
        value: role.id,
        label: role.name,
      }));
      setRoles(mappedRoles);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Load all modules and map them into a usable format
  const loadModules = async () => {
    try {
      const response = await fetchAllRoles();
      //mapping the modules to use in select tag
      const mappedModules = response.map((module) => ({
        value: module.id,
        label: module.name,
      }));
      setAllModules(mappedModules);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Load privileges when pagination or sorting changes
  useEffect(() => {
    loadPrivileges();
  }, [
    paginationDetails.current,
    paginationDetails.pageSize,
    paginationDetails.sortBy,
    paginationDetails.sortOrder,
    paginationDetails.searchQuery,
  ]);

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
      toast.error(err.message);
    }
  };

  // Fetch details of a single privilege by ID
  const loadOnePrivilege = async (userId) => {
    setLoading(true);
    try {
      const privilege = await fetchOnePrivilege(userId);
      return privilege;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new privilege
  const addNewPrivilege = async (values) => {
    handleApiCall(
      () => addPrivilege(values),
      "New privilege successfully added.",
      setLoading,
      loadPrivileges
    );
  };

  // Update an existing privilege
  const updateAPrivilege = async (privilegeId, values) => {
    handleApiCall(
      () => updatePrivilege(privilegeId, values),
      `Privilege with ${privilegeId} successfully updated.`,
      setLoading,
      loadPrivileges
    );
  };

  // Delete a privilege (soft delete)
  const deleteAPrivilege = async (privilegeId) => {
    handleApiCall(
      () => deletePrivilege(privilegeId),
      `Privilege with ${privilegeId} successfully deleted.`,
      setLoading,
      loadPrivileges
    );
  };

  // Return all states and functions for external use
  return {
    loading,
    privileges,
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
