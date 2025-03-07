import { useEffect, useMemo, useState } from "react";
import { Checkbox, Form, Input, Select, Switch, Row, Col, Modal } from "antd";

import useUsers from "../../hooks/useUsers";
import { useAuth } from "../../contexts/AuthContext";
import { useThemeContext } from "../../contexts/ThemeContext";

import FormInputTooltip from "./FormInputTooltip";
import { formValidations } from "./validations";
import FormOnFinishButtons from "./FormOnFinishButtons";
import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";
import { mapToSelectOptions } from "../../utils/utils";

// Form of user add or edit
const UserForm = ({
  open,
  module,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateModal,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [initialFormData, setInitialFormData] = useState({}); // formatted selected user object holder

  const [form] = Form.useForm();
  const { employeesNoUser, roles } = useUsers();
  const { isDarkMode } = useThemeContext();

  // Check if the user has "Admin" role
  const { user } = useAuth();
  const hasAdminRole = useMemo(() => {
    return user?.role?.some((roles) => roles.name === "Admin");
  }, [user]);

  const {
    usernameValidation,
    passwordValidation,
    passwordConfirmValidation,
    passwordConfirmValidationInUpdateMode,
    emailValidation,
    noteValidation,
  } = formValidations;

  // Mapping the employee into select options
  //In edit only the selected employee
  const mappedEmployees = useMemo(() => {
    return !isEditing
      ? mapToSelectOptions(employeesNoUser)
      : mapToSelectOptions([selectedObject?.employeeId]);
  }, [employeesNoUser, selectedObject, isEditing]);

  // Handle edit populate the wanted fields
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      // format the user into form structure
      const updatedUser = {
        ...selectedObject,
        employeeId: mappedEmployees,
      };
      form.setFieldsValue(updatedUser);
      setInitialFormData(updatedUser);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
    }
  }, [open, isEditing, selectedObject, form]);

  const onFinish = async () => {
    const formData = form.getFieldsValue();

    // Map the employee id
    let employeeId;
    if (isEditing && selectedObject?.employeeId) {
      employeeId = { id: selectedObject.employeeId.id }; // when updating
    } else {
      employeeId = { id: formData.employeeId }; // when adding
    }

    // Format and update formdata
    const updatedData = {
      ...formData,
      employeeId: employeeId,
      statusName: formData.statusName ? "Active" : "Deleted",
    };

    if (isEditing) {
      // get changed values
      const updatedValues = getChangedFieldValues(initialFormData, formData, {
        roles,
      });
      showUpdateModal(updatedValues, selectedObject.id, updatedData);
    } else {
      setConfirmLoading(true);
      await addItem(updatedData);
      form.resetFields();
      setConfirmLoading(false);
      closeFormModal();
    }
  };

  return (
    <Modal
      title={`${!isEditing ? "Add New" : "Update"} ${module}`}
      open={open}
      width={600}
      onCancel={closeFormModal}
      footer={null}
      centered
      destroyOnClose
      afterClose={() => form.resetFields()}
    >
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
          label={
            <FormInputTooltip
              label="Employee"
              title="Select the employee to associate"
            />
          }
          hasFeedback
          rules={[{ required: true, message: "Please select your employee" }]}
        >
          <Select
            showSearch
            placeholder="Search and select an employee"
            options={mappedEmployees}
            notFoundContent="No employees without user accounts"
            onChange={(value) => {
              const selectedEmp = employeesNoUser.find(
                (employee) => employee.id === value
              );
              if (selectedEmp) {
                form.setFieldsValue({
                  email: selectedEmp.email,
                });
              }
            }}
            disabled={isEditing}
          />
        </Form.Item>

        <Form.Item
          name="username"
          label={
            <FormInputTooltip
              label="Username"
              title="Enter a unique username"
            />
          }
          hasFeedback
          rules={usernameValidation}
        >
          <Input placeholder="Enter username (e.g., john.smith)" />
        </Form.Item>

        <Form.Item
          name="password"
          label={
            <FormInputTooltip
              label="Password"
              title="Create a password with at least 8 characters"
            />
          }
          hasFeedback
          rules={
            isEditing
              ? passwordValidation
              : [
                  ...passwordValidation,
                  { required: true, message: "Please input your password" },
                ]
          }
        >
          <Input.Password placeholder="Enter secure password" />
        </Form.Item>

        <Form.Item
          name="retypePassword"
          label={
            <FormInputTooltip
              label="Confirm Password"
              title="Re-enter password to confirm it matches"
            />
          }
          dependencies={["password"]}
          hasFeedback
          rules={
            isEditing
              ? passwordConfirmValidationInUpdateMode
              : passwordConfirmValidation
          }
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item
          name="email"
          label={
            <FormInputTooltip
              label="Email"
              title="Enter user's email address"
            />
          }
          hasFeedback
          rules={emailValidation}
        >
          <Input
            placeholder="Enter email address (e.g., name@gmail.com)"
            type="email"
          />
        </Form.Item>

        <Form.Item
          name="roleId"
          label={<FormInputTooltip label="Roles" title="Select system roles" />}
          hasFeedback
        >
          <Checkbox.Group>
            <div
              style={{
                border: `1px solid ${isDarkMode ? "#464963" : "#e5e6e8"}`,
                padding: 16,
                borderRadius: 8,
              }}
            >
              <Row gutter={[8, 8]}>
                {roles.map((role) => (
                  <Col span={12} key={role.value}>
                    <Checkbox
                      disabled={
                        (role.label === "Admin" && !hasAdminRole) || // Non-admin can't select Admin role
                        (role.label === "Admin" &&
                          isEditing &&
                          selectedObject?.username === user.username) // Admin can't remove own Admin role
                      }
                      value={role.value}
                    >
                      {role.label}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </div>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name="statusName"
          label={
            <FormInputTooltip
              label="Account Status"
              title="Control whether this user can access the system"
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
          label={
            <FormInputTooltip
              label="Note"
              title="Add any additional information"
            />
          }
          rules={noteValidation}
          hasFeedback
        >
          <Input.TextArea placeholder="Add any relevant notes or special instructions" />
        </Form.Item>

        <FormOnFinishButtons
          closeFormModal={closeFormModal}
          isEditing={isEditing}
          confirmLoading={confirmLoading}
        />
      </Form>
    </Modal>
  );
};

export default UserForm;
