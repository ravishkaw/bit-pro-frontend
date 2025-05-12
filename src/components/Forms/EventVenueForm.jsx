import { useEffect, useState } from "react";
import { Modal, Form, Input, Select, InputNumber, Switch } from "antd";

import { deleteImage } from "../../services/systemApiService";

import FormInputTooltip from "./FormInputTooltip";
import FormOnFinishButtons from "./FormOnFinishButtons";
import { formValidations } from "./validations";
import ImageUpload from "../common/ImageUpload";

import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";

const EventVenueForm = ({
  open,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
}) => {
  const [initialFormData, setInitialFormData] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
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
      setUploadedImage(null);
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

  const handleImageChange = (imageName) => {
    setUploadedImage(imageName);
    form.setFieldsValue({
      photo: imageName,
    });
    form.validateFields(["photo"]);
  };

  const handleCancel = () => {
    if (uploadedImage && !isEditing) {
      deleteImage("event venues", uploadedImage);
    }
    closeFormModal();
  };

  return (
    <Modal
      title={`${!isEditing ? "Add New" : "Update"} Event Venue`}
      open={open}
      width={600}
      onCancel={handleCancel}
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
              label="Event Venue Name"
              title="Name of the venue"
            />
          }
          rules={[
            ...alphanumericWithSpacesValidation,
            { required: true, message: "Please enter venue name" },
          ]}
          hasFeedback
        >
          <Input placeholder="E.g., Wedding Hall 1" />
        </Form.Item>

        <Form.Item
          name="capacity"
          label={
            <FormInputTooltip
              label="Capacity"
              title="Maximum capacity of the venue"
            />
          }
          rules={[
            { required: true, message: "Please enter capacity of the venue" },
          ]}
          hasFeedback
        >
          <InputNumber
            placeholder="0"
            min={0}
            style={{ width: "100%" }}
            keyboard
          />
        </Form.Item>
        <Form.Item
          name="description"
          label={
            <FormInputTooltip
              label="Description"
              title="Brief description of the venue"
            />
          }
          rules={[{ required: true, message: "Please enter description" }]}
          hasFeedback
        >
          <Input.TextArea placeholder="Brief description" />
        </Form.Item>

        <Form.Item
          name="photo"
          hasFeedback
          label={<FormInputTooltip label="Photo" title="Photo of a venue" />}
          rules={[{ required: true, message: "Please add a photo" }]}
        >
          <ImageUpload
            onImageChange={handleImageChange}
            initialImage={isEditing && selectedObject?.photo}
            category="event venues"
          />
        </Form.Item>

        <Form.Item
          name="statusName"
          label={
            <FormInputTooltip
              label="Venue Status"
              title="Status of the venue"
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

export default EventVenueForm;
