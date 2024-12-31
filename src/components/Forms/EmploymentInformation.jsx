import { Form, Input, Select } from "antd";

const EmploymentInformation = () => {
  return (
    <>
      {/* This will be populate dynamically  */}
      <Form.Item name="jobRole" label="Job Role" hasFeedback>
        <Select
          placeholder="Choose from available roles"
          options={[
            {
              value: "manager",
              label: "Manager",
            },
            {
              value: "receptionist",
              label: "Receptionist",
            },
            {
              value: "staff",
              label: "Staff",
            },
          ]}
        />
      </Form.Item>
      <Form.Item name="department" label="Department" hasFeedback>
        <Select
          placeholder="Choose from available departments"
          options={[
            {
              value: "cleaning",
              label: "Cleaning",
            },
          ]}
        />
      </Form.Item>
      <Form.Item name="salary" label="Salary" hasFeedback>
        <Input placeholder="E.g., 50,000" />
      </Form.Item>
    </>
  );
};
export default EmploymentInformation;
