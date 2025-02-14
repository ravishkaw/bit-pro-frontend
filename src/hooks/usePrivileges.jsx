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

// Handle all user based service calls
const usePrivileges = () => {
  const [privileges, setPrivileges] = useState([]);
  const [roles, setRoles] = useState([]);
  const [allModules, setAllModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [paginationDetails, setPaginationDetails] = useState({
    current: 1,
    pageSize: 10,
    sortBy: "id",
    sortOrder: "descend",
    total: 0,
    searchQuery: "",
  });

  // Crud Operation Api
  // Load all privileges
  const loadPrivileges = async () => {
    try {
      setLoading(true);
      // Fetch privileges page starts with 0 but in antd starts with 1
      const resp = await fetchAllPrivileges(
        paginationDetails.current - 1,
        paginationDetails.pageSize,
        paginationDetails.sortBy,
        paginationDetails.sortOrder,
        paginationDetails.searchQuery
      );
      setPrivileges(resp);
      setPaginationDetails((prev) => ({
        ...prev,
        total: resp.totalElements,
      }));
    } catch (err) {
      setPrivileges([]);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // load all system roles
  const loadRoles = async () => {
    try {
      const response = await fetchAllRoles();
      const mappedRoles = response.map((role) => ({
        value: role.id,
        label: role.name,
      }));
      setRoles(mappedRoles);
    } catch (error) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  // load all modules
  const loadModules = async () => {
    try {
      const response = await fetchAllRoles();
      const mappedModules = response.map((module) => ({
        value: module.id,
        label: module.name,
      }));
      setAllModules(mappedModules);
    } catch (error) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    loadPrivileges();
  }, [
    paginationDetails.current,
    paginationDetails.pageSize,
    paginationDetails.sortBy,
    paginationDetails.sortOrder,
    paginationDetails.searchQuery,
  ]);

  useEffect(() => {
    loadRoles();
    loadModules();
  }, []);

  const getModulesWithoutPrivileges = async (roleId) => {
    try {
      const response = await fetchModuleWithoutPrivileges(roleId);
      const mappedModules = response.map((module) => ({
        value: module.id,
        label: module.name,
      }));
      return mappedModules;
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  // Get one privilege details
  const loadOnePrivilege = async (userId) => {
    setLoading(true);
    try {
      const privilege = await fetchOnePrivilege(userId);
      return privilege;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  // add new privilege
  const addNewPrivilege = async (values) => {
    handleApiCall(
      () => addPrivilege(values),
      "New privilege successfully added.",
      setLoading,
      loadPrivileges
    );
  };

  // update privilege
  const updateAPrivilege = async (privilegeId, values) => {
    handleApiCall(
      () => updatePrivilege(privilegeId, values),
      `Privilege with ${privilegeId} successfully updated.`,
      setLoading,
      loadPrivileges
    );
  };

  // delete a privilege - soft delete
  const deleteAPrivilege = async (privilegeId) => {
    handleApiCall(
      () => deletePrivilege(privilegeId),
      `Privilege with ${privilegeId} successfully deleted.`,
      setLoading,
      loadPrivileges
    );
  };

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
