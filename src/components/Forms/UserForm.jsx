import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Select,
  Space,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import FormInputTooltip from "./FormInputTooltip";
import { formValidations } from "./validations";
import useUsers from "../../hooks/useUsers";
import { triggerFormFieldsValidation } from "../../utils/form";

// Form of user add or edit
const UserForm = ({
  closeFormModal,
  isEditing,
  selectedPerson,
  addAnUser,
  updateAnUser,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const [form] = Form.useForm();
  const { employeesNoUser, roles } = useUsers();

  const {
    usernameValidation,
    passwordValidation,
    passwordConfirmValidation,
    emailValidation,
    noteValidation,
  } = formValidations;

  // Mapping the employee into select options
  //In edit only the selected employee
  const mappedEmployees = !isEditing
    ? employeesNoUser?.map((employee) => ({
        value: employee.fullName,
        label: employee.fullName,
      }))
    : [
        {
          value: selectedPerson?.employeeId?.fullName,
          label: selectedPerson?.employeeId?.fullName,
        },
      ];

  //set employee email
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
        setSelectedEmployeeId(employee.id); //Set the selected employee id to pass
      }
    }
  }, [selectedEmployee, employeesNoUser, form]);

  // Handle edit populate the wanted fields
  useEffect(() => {
    if (open && isEditing && selectedPerson) {
      form.setFieldsValue({
        ...selectedPerson,
        employeeId: selectedPerson?.employeeId?.fullName,
        accountStatus: selectedPerson?.accountStatus,
        role: selectedPerson.role?.map((role) => role.id),
      });
      setSelectedEmployeeId(selectedPerson?.employeeId?.id);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
    }
  }, [open, isEditing, selectedPerson, form]);

  const onFinish = async () => {
    const data = form.getFieldsValue();

    // Map the selected roles into object - can be empty
    const roleObjs = data?.role?.map((id) => ({ id: id })) || [];

    // Format and update data
    const updatedData = {
      ...data,
      employeeId: { id: selectedEmployeeId },
      role: roleObjs,
    };

    setConfirmLoading(true);
    try {
      if (isEditing) {
        await updateAnUser(selectedPerson.id, updatedData);
      } else {
        await addAnUser(updatedData);
        form.resetFields();
      }
    } finally {
      setConfirmLoading(false);
      closeFormModal();
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      labelAlign="left"
      labelWrap
      onFinish={onFinish}
    >
      <Form.Item
        name="employeeId"
        label={<FormInputTooltip label="Employee" title="Select an employee" />}
        hasFeedback
        rules={[{ required: true, message: "Please select your employee" }]}
      >
        <Select
          showSearch
          placeholder="Select Employee"
          options={mappedEmployees}
          onChange={(value) => setSelectedEmployee(value)}
          disabled={isEditing}
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
        rules={
          isEditing
            ? passwordValidation
            : [
                ...passwordValidation,
                { required: true, message: "Please input your password!" },
              ]
        }
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
        rules={
          isEditing
            ? passwordConfirmValidation
            : [
                ...passwordConfirmValidation,
                { required: true, message: "Please confirm your password!" },
              ]
        }
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
        name="role"
        label="Roles"
        hasFeedback
        // rules={[{ required: true }]}
      >
        <Checkbox.Group options={roles} />
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
      >
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          defaultChecked={false}
        />
      </Form.Item>

      <Form.Item
        name="note"
        label={<FormInputTooltip label="Note" title="Any special Notes" />}
        rules={noteValidation}
        hasFeedback
      >
        <Input.TextArea placeholder="Addtional Notes (Optional)" />
      </Form.Item>

      <Flex justify="end">
        <Space>
          <Button onClick={closeFormModal}>Cancel</Button>
          <Button
            color={isEditing ? "primary" : "green"}
            variant="solid"
            htmlType="submit"
            loading={confirmLoading}
          >
            {isEditing ? "Update" : "Submit"}
          </Button>
        </Space>
      </Flex>
    </Form>
  );
};

export default UserForm;
