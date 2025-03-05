import { Form, Radio, Select } from "antd";
import FormInputTooltip from "./FormInputTooltip";
import useEmployees from "../../hooks/useEmployees";

// Third Step of Profile info form - Get employee information. only available to employee form
const EmploymentInformation = ({ designations, employeeStatus }) => {
  return (
    <>
      <Form.Item
        name="designationId"
        label={
          <FormInputTooltip label="Designation" title="Select the job title" />
        }
        rules={[{ required: true, message: "Designation is required" }]}
        hasFeedback
      >
        <Select
          placeholder="Select designation"
          showSearch
          options={designations}
        />
      </Form.Item>

      <Form.Item
        name="employeeStatusId"
        label={
          <FormInputTooltip
            label="Employee Status"
            title="Select employeement status"
          />
        }
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
