import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal, Select, Switch } from "antd";

import FormOnFinishButtons from "./FormOnFinishButtons";
import FormInputTooltip from "./FormInputTooltip";

import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";
import { formValidations } from "./validations";

// Form of room type add or edit
const RoomTypeForm = ({
  additionalData,
  open,
  module,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
}) => {
  const [initialFormData, setInitialFormData] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const { bedTypes } = additionalData;
  const { alphanumericWithSpacesValidation, noteValidation } = formValidations;

  // Set initial values when editing
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      const updatedData = {
        ...selectedObject,
        statusName: selectedObject?.statusName == "Active" ? true : false,
      };
      form.setFieldsValue(updatedData);
      setInitialFormData(updatedData);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
    }
  }, [open, isEditing, selectedObject, form]);

  const onFinish = async () => {
    const formdata = form.getFieldsValue();

    // Format and update formdata
    const updatedData = {
      ...formdata,
      statusName: formdata.statusName ? "Active" : "Inactive",
    };

    if (isEditing) {
      // get changed values
      const updatedValues = getChangedFieldValues(initialFormData, formdata, {
        module,
        bedTypes,
      });
      showUpdateConfirmModal(updatedValues, selectedObject.id, updatedData);
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
          name="name"
          label={
            <FormInputTooltip
              label="Room Type"
              title="Enter the name of the room type"
            />
          }
          rules={[
            ...alphanumericWithSpacesValidation,
            { required: true, message: "Please enter room type name" },
          ]}
          hasFeedback
        >
          <Input placeholder="E.g., Single, Double, Deluxe Suite" />
        </Form.Item>

        <Form.Item
          name="bedTypeId"
          label={
            <FormInputTooltip
              label="Bed Type"
              title="Select bed type that in the room type"
            />
          }
          rules={[{ required: true, message: "Please enter room type name" }]}
          hasFeedback
        >
          <Select
            placeholder="Select bed type"
            options={bedTypes}
            showSearch
            optionFilterProp="label"
          />
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
            placeholder="0.00"
            min={0}
            precision={2}
            style={{ width: "100%" }}
            prefix="Rs."
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
            ...noteValidation,
            { required: true, message: "Please enter short description" },
          ]}
          hasFeedback
        >
          <Input.TextArea placeholder="E.g., Spacious room with king-sized bed, and private balcony" />
        </Form.Item>

        <Form.Item
          name="statusName"
          label={
            <FormInputTooltip
              label="Room Status"
              title="Set Room Type is available or not"
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
