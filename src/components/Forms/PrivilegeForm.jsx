import { useEffect, useState } from "react";
import { Button, Row, Col, Flex, Form, Select, Space, Switch } from "antd";
import usePrivileges from "../../hooks/usePrivileges";

// Privilege Form 
const PrivilegeForm = ({
  roles,
  closeFormModal,
  isEditing,
  selectedObject,
  addNewPrivilege,
  updateAPrivilege,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(); 
  const [modules, setModules] = useState([]);
  const [form] = Form.useForm();

  const { getModulesWithoutPrivileges } = usePrivileges();

  // Fetch modules without privileges for the selected role
  const fetchModules = async (roleId) => {
    const fetchedModules = await getModulesWithoutPrivileges(roleId);
    setModules(fetchedModules);
  };

  // Fetch modules when the selected role changes
  useEffect(() => {
    if (selectedRole) {
      fetchModules(selectedRole);
      form.resetFields(["module"]); // Reset module field when role changes
    } else {
      setModules([]);
      form.resetFields(["module"]);
    }
  }, [selectedRole, form]);

  // Set initial values if editing
  useEffect(() => {
    if (isEditing && selectedObject) {
      // map the values to match with form
      const editValues = {
        role: {
          value: selectedObject?.roleId?.id,
          label: selectedObject?.roleId?.name,
        },
        module: {
          value: selectedObject?.moduleId?.id,
          label: selectedObject?.moduleId?.name,
        },
        privileges: {
          select: selectedObject?.selectOp,
          insert: selectedObject?.insertOp,
          update: selectedObject?.updateOp,
          delete: selectedObject?.deleteOp,
        },
      };
      // set form data
      form.setFieldsValue(editValues);
    }
  }, [isEditing, selectedObject, form]);

  // Handle form submission
  const onFinish = async (formData) => {
    const updatedData = {
      selectOp: formData.privileges.select,
      insertOp: formData.privileges.insert,
      deleteOp: formData.privileges.delete,
      updateOp: formData.privileges.update,
      roleId: { id: isEditing ? formData.role.value : formData.role }, // edit values sets the label to. so have to get id only
      moduleId: { id: isEditing ? formData.module.value : formData.module },
    };

    // add and update
    setConfirmLoading(true);
    try {
      if (isEditing) {
        await updateAPrivilege(selectedObject.id, updatedData);
      } else {
        await addNewPrivilege(updatedData);
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
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      labelAlign="left"
      labelWrap
      onFinish={onFinish}
      initialValues={{
        privileges: {
          select: false,
          insert: false,
          update: false,
          delete: false,
        },
      }}
    >
      <Form.Item
        name="role"
        label="Select Role"
        rules={[{ required: true, message: "Please select a role" }]}
        hasFeedback
      >
        <Select
          placeholder="Choose from here"
          allowClear
          showSearch
          options={roles}
          onChange={(value) => setSelectedRole(value)}
          disabled={isEditing}
        />
      </Form.Item>

      <Form.Item
        name="module"
        label="Select Module"
        rules={[{ required: true, message: "Please select a module" }]}
        hasFeedback
      >
        <Select
          placeholder="Choose from here"
          notFoundContent="Select Role First"
          allowClear
          showSearch
          options={modules}
          disabled={isEditing}
        />
      </Form.Item>

      <Form.Item name="privileges" label="Privileges">
        <Row gutter={[6, 6]}>
          <Col span={6}>
            Select
            <Form.Item name={["privileges", "select"]} valuePropName="checked">
              <Switch
                checkedChildren="Granted"
                unCheckedChildren="Not Granted"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            Insert
            <Form.Item name={["privileges", "insert"]} valuePropName="checked">
              <Switch
                checkedChildren="Granted"
                unCheckedChildren="Not Granted"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            Update
            <Form.Item name={["privileges", "update"]} valuePropName="checked">
              <Switch
                checkedChildren="Granted"
                unCheckedChildren="Not Granted"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            Delete
            <Form.Item name={["privileges", "delete"]} valuePropName="checked">
              <Switch
                checkedChildren="Granted"
                unCheckedChildren="Not Granted"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Flex justify="end">
        <Space>
          <Button onClick={closeFormModal}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </Space>
      </Flex>
    </Form>
  );
};

export default PrivilegeForm;
