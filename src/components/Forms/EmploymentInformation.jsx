import { Form, Input, Radio, Select } from "antd";
import { useEffect, useState } from "react";

const EmploymentInformation = ({ getEmployeeDesignation }) => {
  const [designations, setDesignations] = useState([
    { value: 1, label: "Staff" },
  ]);

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await getEmployeeDesignation();
        setDesignations(
          response.map((designation) => ({
            value: designation.id,
            label: designation.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };
    fetchDesignations();
  }, [getEmployeeDesignation]);

  return (
    <>
      <Form.Item
        name="designation"
        label="Designation"
        rules={[{ required: true, message: "Designation is required" }]}
        hasFeedback
      >
        <Select
          placeholder="Choose from available designations"
          showSearch
          options={designations}
        />
      </Form.Item>
      <Form.Item
        name="employeeStatus"
        label="Employee Status"
        rules={[{ required: true, message: "Employee Status is required" }]}
        hasFeedback
      >
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          options={[
            { value: "Active", label: "Active" },
            { value: "Resigned", label: "Resigned" },
            { value: "On Leave", label: "On Leave" },
            { value: "Deleted", label: "Deleted" },
          ]}
        />
      </Form.Item>
    </>
  );
};

export default EmploymentInformation;
