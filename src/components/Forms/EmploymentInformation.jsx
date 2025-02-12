import { Form, Radio, Select } from "antd";

// Third Step of Profile info form - Get employee information. only available to employee form
const EmploymentInformation = ({ designations, employeeStatus }) => {
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
          options={employeeStatus}
        />
      </Form.Item>
    </>
  );
};

export default EmploymentInformation;
