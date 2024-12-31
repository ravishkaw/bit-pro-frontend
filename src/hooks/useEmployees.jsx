import { useEffect, useState } from "react";

import { message } from "antd";

const employeeData = [
  {
    employeeID: "EMP001",
    firstName: "John",
    lastName: "Doe",
    nicNumber: "123456789V",
    gender: "Male",
    nationality: "Sri Lankan",
    dateOfBirth: "1990-01-15",
    phone: "+94123456789",
    email: "john.doe@example.com",
    address: "123 Main Street, Colombo, Sri Lanka",
    emergencyContact: "+94198765432",
    jobRole: "Front Desk Officer",
    department: "Front Office",
    salary: 50000,
    addedDate: "2020-06-01",
    status: "Active",
  },
  {
    employeeID: "EMP002",
    firstName: "Jane",
    lastName: "Smith",
    nicNumber: "987654321X",
    gender: "Female",
    nationality: "Sri Lankan",
    dateOfBirth: "1988-07-22",
    phone: "+94111222333",
    email: "jane.smith@example.com",
    address: "456 Elm Street, Kandy, Sri Lanka",
    emergencyContact: "+94112345678",
    jobRole: "Housekeeping Supervisor",
    department: "Housekeeping",
    salary: 60000,
    addedDate: "2019-01-01",
    status: "Active",
  },
];

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();

  const msgSuccess = () =>
    messageApi.open({
      type: "success",
      content: "This is a prompt message with custom className and style",
      style: {
        fontSize: "1rem",
      },
    });

  const loadEmployees = () => {
    try {
      setEmployees(employeeData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return { employees, loading, error, contextHolder };
};

export default useEmployees;
