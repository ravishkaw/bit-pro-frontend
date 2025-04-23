import { useEffect, useState } from "react";
import { Modal, Form, Input, Select, InputNumber, Switch } from "antd";

import FormInputTooltip from "./FormInputTooltip";
import FormOnFinishButtons from "./FormOnFinishButtons";
import { formValidations } from "./validations";

import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";

const RoomReservationAmenityForm = ({
  additionalData,
  open,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
}) => {
  const [initialFormData, setInitialFormData] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const { amenityCategory } = additionalData;

  const { noteValidation } = formValidations;

  // Set initial values when editing
  useEffect(() => {
    if (open && selectedObject && isEditing) {
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
  }, [open, selectedObject, isEditing, form]);

  const onFinish = async () => {
    const formdata = form.getFieldsValue();

    // Format and update formdata
    const updatedData = {
      ...formdata,
      statusName: formdata.statusName ? "Active" : "Inactive",
    };

    if (isEditing) {
      // get changed values
      const updatedValues = getChangedFieldValues(initialFormData, formdata);
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
      title={`${!isEditing ? "Add New" : "Update"} Amenity`}
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
        onFinish={onFinish}
        initialValues={{ price: 0 }}
      >
        <Form.Item
          name="categoryId"
          label={
            <FormInputTooltip
              label="Category"
              title="Category of the amenity item"
            />
          }
          rules={[{ required: true, message: "Please select a category" }]}
          hasFeedback
        >
          <Select
            options={amenityCategory}
            placeholder="Select amenity category"
            showSearch
            optionFilterProp="label"
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="name"
          label={
            <FormInputTooltip
              label="Amenity Name"
              title="Room Reservation Amenity name"
            />
          }
          rules={[{ required: true, message: "Please enter amenity name" }]}
          hasFeedback
        >
          <Input placeholder="E.g., Sandwiches Breakfast" />
        </Form.Item>

        <Form.Item
          name="price"
          label={
            <FormInputTooltip
              label="Amenity Price"
              title="Price of the reservation amenity"
            />
          }
          rules={[{ required: true, message: "Please enter amenity price" }]}
          hasFeedback
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            max={10000}
            step={0.01}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <FormInputTooltip
              label="Description"
              title="Brief description of the amenity"
            />
          }
          rules={noteValidation}
          hasFeedback
        >
          <Input.TextArea placeholder="Brief description" />
        </Form.Item>

        <Form.Item
          name="statusName"
          label={
            <FormInputTooltip
              label="Amenity Status"
              title="Set amenity is available or not"
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

export default RoomReservationAmenityForm;
