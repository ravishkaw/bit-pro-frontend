import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal } from "antd";

import FormOnFinishButtons from "./FormOnFinishButtons";
import FormInputTooltip from "./FormInputTooltip";

import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";

// Form of room type add or edit
const RoomTypeForm = ({
  open,
  module,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateModal,
}) => {
  const [initialFormData, setInitialFormData] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  // Set initial values when editing
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      triggerFormFieldsValidation(form);
      form.setFieldsValue(selectedObject);
      setInitialFormData(selectedObject);
    } else if (open) {
      form.resetFields();
    }
  }, [open, isEditing, selectedObject, form]);

  const onFinish = async () => {
    const formdata = form.getFieldsValue();

    if (isEditing) {
      // get changed values
      const updatedValues = getChangedFieldValues(initialFormData, formdata);
      showUpdateModal(updatedValues, selectedObject.id, formdata);
    } else {
      setConfirmLoading(true);
      await addItem(formdata);
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
        initialValues={{ basePrice: 0 }}
      >
        <Form.Item
          name="name"
          label={
            <FormInputTooltip
              label="Room Type"
              title="Enter the name of the room type"
            />
          }
          rules={[{ required: true, message: "Please enter room type name" }]}
          hasFeedback
        >
          <Input placeholder="E.g., Single, Double, Deluxe Suite" />
        </Form.Item>

        <Form.Item
          name="basePrice"
          label={
            <FormInputTooltip
              label="Base Price"
              title="Enter the standard nightly rate for this room type"
            />
          }
          rules={[
            { required: true, message: "Please enter room type base price" },
          ]}
          hasFeedback
        >
          <InputNumber
            addonBefore="$"
            placeholder="E.g., 200.00"
            style={{ width: "100%" }}
            min="0"
            max="100000"
            step="0.01"
            keyboard
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <FormInputTooltip
              label="Description"
              title="Provide details about the room's features or amenities"
            />
          }
          rules={[
            { required: true, message: "Please enter short description" },
          ]}
          hasFeedback
        >
          <Input.TextArea placeholder="E.g., Spacious room with king-sized bed, and private balcony" />
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

export default RoomTypeForm;
