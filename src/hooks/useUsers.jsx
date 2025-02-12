import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  addUser,
  deleteUser,
  fetchAllUsers,
  fetchUser,
  updateUser,
} from "../services/users";
import { fetchEmployeesWithoutUserAccounts } from "../services/employee";
import { fetchAllRoles } from "../services/role";
import handleApiCall from "./useApiHandler";

// Handle all user based service calls
const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [employeesNoUser, setEmployeesNoUser] = useState([]);
  const [roles, setRoles] = useState([]);
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
  // Load all users
  const loadUsers = async () => {
    try {
      setLoading(true);
      // Fetch users page starts with 0 but in antd starts with 1
      const resp = await fetchAllUsers(
        paginationDetails.current - 1,
        paginationDetails.pageSize,
        paginationDetails.sortBy,
        paginationDetails.sortOrder,
        paginationDetails.searchQuery
      );
      setUsers(resp.data);
      setPaginationDetails((prev) => ({
        ...prev,
        total: resp.totalElements,
      }));
    } catch (err) {
      setUsers([]);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load employees without user accounts
  const loadEmployeesWithoutUserAccounts = async () => {
    try {
      const resp = await fetchEmployeesWithoutUserAccounts();
      setEmployeesNoUser(resp);
    } catch (err) {
      setEmployeesNoUser([]);
      setError(err.message);
      toast.error(err.message);
    }
  };

  // Load roles
  const loadRoles = async () => {
    try {
      const resp = await fetchAllRoles();
      const mappedRoles = resp.map((role) => ({
        value: role.id,
        label: role.name,
      }));
      setRoles(mappedRoles);
    } catch (err) {
      setRoles([]);
      setError(err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [
    paginationDetails.current,
    paginationDetails.pageSize,
    paginationDetails.sortBy,
    paginationDetails.sortOrder,
    paginationDetails.searchQuery,
  ]);

  useEffect(() => {
    loadEmployeesWithoutUserAccounts();
    loadRoles();
  }, []);

  // Get one user details
  const loadOneUser = async (userId) => {
    setLoading(true);
    try {
      const user = await fetchUser(userId);
      return user;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add new user
  const addAnUser = async (values) => {
    handleApiCall(
      () => addUser(values),
      `User ${values?.username} added successfully`,
      setLoading,
      loadUsers
    );
  };

  // update user
  const updateAnUser = async (userId, values) => {
    handleApiCall(
      () => updateUser(userId, values),
      `User with ${values?.username} updated successfully`,
      setLoading,
      loadUsers
    );
  };

  // Delete user
  const deleteAnUser = async (userId) => {
    handleApiCall(
      () => deleteUser(userId),
      `User with user id ${userId} deleted successfully`,
      setLoading,
      loadUsers
    );
  };

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
