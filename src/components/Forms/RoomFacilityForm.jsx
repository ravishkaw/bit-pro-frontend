import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal, Switch } from "antd";

import FormInputTooltip from "./FormInputTooltip";
import FormOnFinishButtons from "./FormOnFinishButtons";
import { formValidations } from "./validations";
import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";

// Form for room facility add/edit
const RoomFacilityForm = ({
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

  const { noteValidation } = formValidations;

  // Handle edit populate the wanted fields
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      const formattedRoomFacility = {
        ...selectedObject,
        statusName: selectedObject.statusName == "Active" ? true : false,
      };
      form.setFieldsValue(formattedRoomFacility);
      setInitialFormData(formattedRoomFacility);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
    }
  }, [isEditing, selectedObject, form]);

  const onFinish = async () => {
    const formdata = form.getFieldsValue();

    // Format and update formdata
    const updatedData = {
      ...formdata,
      statusName: formdata.statusName ? "Active" : "Deleted",
    };

    if (isEditing) {
      // get changed values
      const updatedValues = getChangedFieldValues(initialFormData, formdata, {
        module,
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
          label={<FormInputTooltip label="Name" title="Enter amenity name" />}
          rules={[{ required: true, message: "Please enter an amenity name" }]}
          hasFeedback
        >
          <Input placeholder="e.g., Wi-Fi, Mini Bar, Room Service" />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <FormInputTooltip
              label="Description"
              title="Brief description of amenity offers"
            />
          }
          rules={[
            ...noteValidation,
            { required: true, message: "Please enter a description" },
          ]}
          hasFeedback
        >
          <Input.TextArea placeholder="e.g., High-speed wifi" />
        </Form.Item>

        <Form.Item
          name="price"
          label={
            <FormInputTooltip label="Price" title="Cost per booking/stay" />
          }
          rules={[{ required: true, message: "Please enter price" }]}
          hasFeedback
        >
          <InputNumber
            addonBefore="$"
            placeholder="0.00"
            min={0}
            precision={2}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="statusName"
          label={
            <FormInputTooltip
              label="Status"
              title="Toggle to enable or disable amenity"
            />
          }
          valuePropName="checked"
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

export default RoomFacilityForm;
