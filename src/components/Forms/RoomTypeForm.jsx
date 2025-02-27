import { useEffect, useState } from "react";
import { Form, Input, InputNumber } from "antd";
import FormOnFinishButtons from "./FormOnFinishButtons";

// Form of room type add or edit
const RoomTypeForm = ({
  closeFormModal,
  isEditing,
  selectedObject,
  addAnRoomType,
  updateAnRoomType,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  // Set initial values when editing
  useEffect(() => {
    if (isEditing && selectedObject) {
      form.setFieldsValue(selectedObject);
    }
  }, [isEditing, selectedObject, form]);

  const onFinish = async (values) => {
    setConfirmLoading(true);

    try {
      if (isEditing) {
        await updateAnRoomType(selectedObject.id, {
          ...selectedObject,
          ...values,
        });
      } else {
        await addAnRoomType(values);
        form.resetFields();
      }
    } finally {
      form.resetFields();
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
        name="name"
        label="Room Type"
        rules={[{ required: true, message: "Please enter room type name" }]}
      >
        <Input placeholder="E.g., Single" />
      </Form.Item>

      <Form.Item
        name="basePrice"
        label="Base Price"
        rules={[
          { required: true, message: "Please enter room type base price" },
        ]}
      >
        <InputNumber
          addonAfter="$"
          placeholder="E.g., 200"
          style={{ width: "100%" }}
          defaultValue="1.00"
          min="0"
          max="100000"
          step="0.01"
          keyboard
        />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <Input.TextArea placeholder="Room description" />
      </Form.Item>

      <FormOnFinishButtons
        closeFormModal={closeFormModal}
        isEditing={isEditing}
        confirmLoading={confirmLoading}
      />
    </Form>
  );
};

export default RoomTypeForm;
