import { useEffect, useState } from "react";
import { fetchAllUsers } from "../services/users";
import { fetchEmployeesWithoutUserAccounts } from "../services/employee";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [employeesNoUser, setEmployeesNoUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Crud Operation Api
  // Load all users
  const loadUsers = async () => {
    try {
      setLoading(true);
      const resp = await fetchAllUsers();
      setUsers(resp);
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
      setLoading(true);
      const resp = await fetchEmployeesWithoutUserAccounts();
      setEmployeesNoUser(resp);
    } catch (err) {
      setEmployeesNoUser([]);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    loadEmployeesWithoutUserAccounts();
  }, []);

  return { loading, users, employeesNoUser };
};
export default useUsers;
