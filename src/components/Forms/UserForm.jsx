import {
  Checkbox,
  Form,
  Input,
  Select,
  Switch,
  Row,
  Col,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import FormInputTooltip from "./FormInputTooltip";
import { formValidations } from "./validations";
import FormOnFinishButtons from "./FormOnFinishButtons";
import useUsers from "../../hooks/useUsers";
import { triggerFormFieldsValidation } from "../../utils/form";

// Form of user add or edit
const UserForm = ({
  closeFormModal,
  isEditing,
  selectedObject,
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
          value: selectedObject?.employeeId?.fullName,
          label: selectedObject?.employeeId?.fullName,
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
    if (open && isEditing && selectedObject) {
      form.setFieldsValue({
        ...selectedObject,
        employeeId: selectedObject?.employeeId?.fullName,
        accountStatus: selectedObject?.accountStatus,
        role: selectedObject.role?.map((role) => role.id),
      });
      setSelectedEmployeeId(selectedObject?.employeeId?.id);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
    }
  }, [open, isEditing, selectedObject, form]);

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
        await updateAnUser(selectedObject.id, updatedData);
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
        label={<FormInputTooltip label="Roles" title="Select user roles" />}
        hasFeedback
      >
        <Checkbox.Group>
          <div
            style={{
              border: "1px solid #cbb8a0",
              padding: 16,
              borderRadius: 8,
            }}
          >
            <Row gutter={[8, 8]}>
              {roles.map((role) => (
                <Col span={12} key={role.value}>
                  <Checkbox value={role.value}>{role.label}</Checkbox>
                </Col>
              ))}
            </Row>
          </div>
        </Checkbox.Group>
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

      <FormOnFinishButtons
        closeFormModal={closeFormModal}
        isEditing={isEditing}
        confirmLoading={confirmLoading}
      />
    </Form>
  );
};

export default UserForm;
