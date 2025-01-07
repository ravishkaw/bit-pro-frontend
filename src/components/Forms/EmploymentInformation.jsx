import { Form, Input, Radio, Select } from "antd";

const EmploymentInformation = () => {
  return (
    <>
      {/* This will be populate dynamically  */}
      <Form.Item
        name="designation"
        label="Designation"
        rules={[{ required: true, message: "Designation is required" }]}
        hasFeedback
      >
        <Select
          placeholder="Choose from available designations"
          showSearch
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
      <Form.Item
        name="status"
        label="Employee Status"
        rules={[{ required: true, message: "Employee Status is required" }]}
        hasFeedback
      >
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          options={[
            {
              value: "Active",
              label: "Active",
            },
            {
              value: "Resigned",
              label: "Resigned",
            },
            {
              value: "On Leave",
              label: "On Leave",
            },
            {
              value: "Deleted",
              label: "Deleted",
            },
          ]}
        />
      </Form.Item>
    </>
  );
};
export default EmploymentInformation;
