import { Checkbox, Form, Input, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import FormInputTooltip from "./FormInputTooltip";
import { formValidations } from "./validations";
import useUsers from "../../hooks/useUsers";

const UserForm = () => {
  const { employeesNoUser } = useUsers();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [form] = Form.useForm();

  const {
    usernameValidation,
    passwordValidation,
    passwordConfirmValidation,
    emailValidation,
  } = formValidations;

  // Mapping the employee into select options
  const mappedEmployees =
    employeesNoUser?.map((employee) => ({
      value: employee.fullName,
      label: employee.fullName,
    })) || "";

  useEffect(() => {
    if (selectedEmployee) {
      // Get the employee object and set the email
      const employee = employeesNoUser.find(
        (employee) => employee.fullName === selectedEmployee
      );
      if (employee) {
        form.setFieldsValue({
          email: employee.email,
        });
      }
    }
  }, [selectedEmployee, employeesNoUser, form]);

  return (
    <Form
      form={form}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      labelAlign="left"
      labelWrap
    >
      <Form.Item
        name="employee"
        label={<FormInputTooltip label="Employee" title="Select an employee" />}
        hasFeedback
        required
      >
        <Select
          showSearch
          placeholder="Select Employee"
          options={mappedEmployees}
          onChange={(value) => setSelectedEmployee(value)}
        />
      </Form.Item>

      <Form.Item
        name="username"
        label={<FormInputTooltip label="Username" title="Enter an username" />}
        hasFeedback
        rules={usernameValidation}
      >
        <Input placeholder="E.g., john" />
      </Form.Item>

      <Form.Item
        name="password"
        label={<FormInputTooltip label="Password" title="Enter a password" />}
        hasFeedback
        rules={passwordValidation}
      >
        <Input.Password placeholder="**********" />
      </Form.Item>

      <Form.Item
        name="retypePassword"
        label={
          <FormInputTooltip
            label="Confirm Password"
            title="Re-Type the Password"
          />
        }
        dependencies={["password"]}
        hasFeedback
        rules={passwordConfirmValidation}
      >
        <Input.Password placeholder="**********" />
      </Form.Item>

      <Form.Item
        name="email"
        label={
          <FormInputTooltip label="Email" title="Change email if necessary" />
        }
        hasFeedback
        rules={emailValidation}
      >
        <Input placeholder="E.g., john.doe@example.com" type="email" />
      </Form.Item>

      <Form.Item
        name="accountStatus"
        label={
          <FormInputTooltip
            label="Account Status"
            title="Set account status as active or inactive"
          />
        }
        hasFeedback
        required
        valuePropName="checked"
      >
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          defaultChecked={false}
        />
      </Form.Item>

      <Form.Item name="role" label="Roles" hasFeedback required>
        <Checkbox.Group
          options={[
            {
              label: "Apple",
              value: "Apple",
            },
            {
              label: "Pear",
              value: "Pear",
            },
          ]}
        />
      </Form.Item>
    </Form>
  );
};

export default UserForm;
