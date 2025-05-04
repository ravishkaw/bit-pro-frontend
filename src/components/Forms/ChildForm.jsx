import { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, Modal } from "antd";
import dayjs from "dayjs";

import FormInputTooltip from "./FormInputTooltip";
import { formValidations } from "./validations";
import FormOnFinishButtons from "./FormOnFinishButtons";

import {
  getChangedFieldValues,
  triggerFormFieldsValidation,
} from "../../utils/form";

// Form for child add or edit
const ChildForm = ({
  additionalData,
  open,
  module,
  closeFormModal,
  isEditing,
  selectedObject,
  addItem,
  showUpdateConfirmModal,
  parentId = null,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [initialFormData, setInitialFormData] = useState({}); // formatted selected child object holder

  const [form] = Form.useForm();
  const { guests, genders, nationalities } = additionalData;

  // Filter out the parentId from the guests list for the select options
  const parentOptions = parentId
    ? guests.filter((guest) => guest.value == parentId)
    : guests;

  const { fullNameValidation, genderValidation, nationalityValidation } =
    formValidations;

  // Handle edit - populate the fields
  useEffect(() => {
    if (open && isEditing && selectedObject) {
      // Format the child data for the form
      const updatedChild = {
        ...selectedObject,
      };
      form.setFieldsValue(updatedChild);
      setInitialFormData(updatedChild);
      triggerFormFieldsValidation(form);
    } else if (open) {
      form.resetFields();
    }
  }, [open, isEditing, selectedObject, form]);

  // populate the parentId in the form if provided
  useEffect(() => {
    if (parentId && open) {
      form.setFieldsValue({
        guestId: parentId,
      });
    }
  }, [parentId, form, open, isEditing, guests]);

  const onFinish = async () => {
    const formData = form.getFieldsValue();

    // Format and update formdata as needed
    const updatedData = {
      ...formData,
      dob: formData.dob ? formData.dob.format("YYYY-MM-DD") : null,
    };

    if (isEditing) {
      // Get changed values
      const updatedValues = getChangedFieldValues(initialFormData, formData);
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
          name="fullName"
          label={
            <FormInputTooltip
              label="Full Name"
              title="Enter child's full name"
            />
          }
          hasFeedback
          rules={fullNameValidation}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          name="dob"
          label={
            <FormInputTooltip
              label="Date of Birth"
              title="Enter child's date of birth"
            />
          }
          hasFeedback
          rules={[{ required: true, message: "Please select date of birth" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Select date of birth"
            format="YYYY-MM-DD"
            showNow={false}
            maxDate={dayjs(new Date())}
          />
        </Form.Item>

        <Form.Item
          name="guestId"
          label={
            <FormInputTooltip
              label="Parent/Guardian"
              title="Select the parent or guardian guest"
            />
          }
          hasFeedback
          rules={[
            { required: true, message: "Please select a parent/guardian" },
          ]}
        >
          <Select
            showSearch
            placeholder="Search and select a parent/guardian"
            options={parentOptions}
            optionFilterProp="label"
            disabled={parentId !== null}
          />
        </Form.Item>

        <Form.Item
          name="nationalityId"
          label={
            <FormInputTooltip
              label="Nationality"
              title="Select child's nationality"
            />
          }
          hasFeedback
          rules={nationalityValidation}
        >
          <Select
            showSearch
            placeholder="Select nationality"
            options={nationalities}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          name="genderId"
          label={
            <FormInputTooltip label="Gender" title="Select child's gender" />
          }
          hasFeedback
          rules={genderValidation}
        >
          <Select placeholder="Select gender" options={genders} />
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

export default ChildForm;
