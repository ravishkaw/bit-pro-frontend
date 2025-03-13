import { useEffect, useState } from "react";
import { Row, Col, Form, Select, Switch, Modal } from "antd";

import FormOnFinishButtons from "./FormOnFinishButtons";

import { mapToSelectOptions } from "../../utils/utils";

// Privilege Form
const PrivilegeForm = ({
  additionalData,
  open,
  module,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  updateItem,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState();
  const [modules, setModules] = useState([]);
  const [form] = Form.useForm();

  const { getModulesWithoutPrivileges, roles } = additionalData;

  // Fetch modules without privileges for the selected role
  const fetchModules = async (roleId) => {
    const fetchedModules = await getModulesWithoutPrivileges(roleId);
    setModules(fetchedModules);
  };

  // Fetch modules when the selected role changes
  useEffect(() => {
    if (selectedRole && open) {
      fetchModules(selectedRole);
      form.resetFields(["module", "privileges"]); // Reset module field when role changes
    } else if (open) {
      setModules([]);
      form.resetFields(["module"]);
    }
  }, [selectedRole, roles, open, form]);

  // Set initial values if editing
  useEffect(() => {
    if (isEditing && selectedObject) {
      // map the values to match with form
      const editValues = {
        role: mapToSelectOptions([selectedObject?.role]),
        module: mapToSelectOptions([selectedObject?.module]),
        privileges: {
          select: selectedObject?.selectOp,
          insert: selectedObject?.insertOp,
          update: selectedObject?.updateOp,
          delete: selectedObject?.deleteOp,
        },
      };
      // set form data
      form.setFieldsValue(editValues);
    } else if (open) {
      form.resetFields();
    }
  }, [open, isEditing, selectedObject, form]);

  // Handle form submission
  const onFinish = async (formData) => {
    const updatedData = {
      selectOp: formData.privileges.select,
      insertOp: formData.privileges.insert,
      deleteOp: formData.privileges.delete,
      updateOp: formData.privileges.update,
      role: { id: isEditing ? formData.role[0].value : formData.role }, // edit values sets the label to. so have to get id only
      module: { id: isEditing ? formData.module[0].value : formData.module },
    };

    // add and update
    setConfirmLoading(true);
    try {
      if (isEditing) {
        await updateItem(selectedObject.id, updatedData);
      } else {
        await addItem(updatedData);
        form.resetFields();
      }
    } finally {
      setConfirmLoading(false);
      setModules([]);
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
      destroyOnClose
    >
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
              <Form.Item
                name={["privileges", "select"]}
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Granted"
                  unCheckedChildren="Not Granted"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              Insert
              <Form.Item
                name={["privileges", "insert"]}
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Granted"
                  unCheckedChildren="Not Granted"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              Update
              <Form.Item
                name={["privileges", "update"]}
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Granted"
                  unCheckedChildren="Not Granted"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              Delete
              <Form.Item
                name={["privileges", "delete"]}
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Granted"
                  unCheckedChildren="Not Granted"
                />
              </Form.Item>
            </Col>
          </Row>
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

export default PrivilegeForm;
