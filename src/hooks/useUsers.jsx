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
import usePagination from "./usePagination";

// Custom hook to manage user-related operations
const useUsers = () => {
  const [users, setUsers] = useState([]); // List of users
  const [employeesNoUser, setEmployeesNoUser] = useState([]); // Employees without user accounts
  const [roles, setRoles] = useState([]); // Available roles
  const [loading, setLoading] = useState(false); // Loading state

  // Pagination and sorting details
  const { paginationDetails, setPaginationDetails } = usePagination();

  // Fetch users based on pagination and sorting
  const loadUsers = async () => {
    try {
      setLoading(true);
      const resp = await fetchAllUsers(
        paginationDetails.current - 1, // Adjust for backend's 0-based index from antd 1
        paginationDetails.pageSize,
        paginationDetails.sortBy,
        paginationDetails.sortOrder,
        paginationDetails.searchQuery
      );
      setUsers(resp.data);
      setPaginationDetails((prev) => ({ ...prev, total: resp.totalElements })); // Update total count
    } catch (err) {
      setUsers([]);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch employees without user accounts
  const loadEmployeesWithoutUserAccounts = async () => {
    try {
      const resp = await fetchEmployeesWithoutUserAccounts();
      setEmployeesNoUser(resp);
    } catch (err) {
      setEmployeesNoUser([]);
      toast.error(err.message);
    }
  };

  // Fetch and map roles
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
      toast.error(err.message);
    }
  };

  // Load users when pagination or sorting changes
  useEffect(() => {
    loadUsers();
  }, [
    paginationDetails.current,
    paginationDetails.pageSize,
    paginationDetails.sortBy,
    paginationDetails.sortOrder,
    paginationDetails.searchQuery,
  ]);

  // Load employees without accounts and roles on mount
  useEffect(() => {
    loadEmployeesWithoutUserAccounts();
    loadRoles();
  }, []);

  // Fetch details of a single user
  const loadOneUser = async (userId) => {
    setLoading(true);
    try {
      const user = await fetchUser(userId);
      return user;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new user
  const addAnUser = async (values) => {
    handleApiCall(
      () => addUser(values),
      `User ${values?.username} added successfully`,
      setLoading,
      loadUsers
    );
  };

  // Update an existing user
  const updateAnUser = async (userId, values) => {
    handleApiCall(
      () => updateUser(userId, values),
      `User ${values?.username} updated successfully`,
      setLoading,
      loadUsers
    );
  };

  // Delete a user
  const deleteAnUser = async (userId) => {
    handleApiCall(
      () => deleteUser(userId),
      `User with ID ${userId} deleted successfully`,
      setLoading,
      loadUsers
    );
  };

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
