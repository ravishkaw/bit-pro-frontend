import { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Switch } from "antd";

import FormInputTooltip from "./FormInputTooltip";
import FormOnFinishButtons from "./FormOnFinishButtons";
import { formValidations } from "./validations";

import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";

// Room reservation amenity form component
const EventReservationServicesForm = ({
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

  const { alphanumericWithSpacesValidation, noteValidation } = formValidations;

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
      title={`${!isEditing ? "Add New" : "Update"} Event Reservation Service`}
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
      >
        <Form.Item
          name="name"
          label={
            <FormInputTooltip
              label="Service Name"
              title="Enter the name of the reservation service"
            />
          }
          rules={[
            ...alphanumericWithSpacesValidation,
            {
              required: true,
              message: "Please enter reservation service name",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="E.g., Decoration" />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <FormInputTooltip
              label="Description"
              title="Brief description of the service"
            />
          }
          rules={[
            ...noteValidation,
            { required: true, message: "Please enter description" },
          ]}
          hasFeedback
        >
          <Input.TextArea placeholder="Brief description" />
        </Form.Item>

        <Form.Item
          name="pricePerUnit"
          label={
            <FormInputTooltip
              label="Price Per Unit"
              title="Enter the price per unit of the service"
            />
          }
          rules={[{ required: true, message: "Please enter amenity price" }]}
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
          name="statusName"
          label={
            <FormInputTooltip
              label="Service Status"
              title="Set service is available or not"
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

export default EventReservationServicesForm;
